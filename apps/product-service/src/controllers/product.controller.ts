import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  //console.log("Headers:", req.headers);
  //console.log("Incoming Body:", req.body);

  const data: Prisma.ProductCreateInput = req.body;

  const { colors, images } = data as {
    colors?: string[];
    images?: Record<string, string>;
  };

  // Validate colors array (String[])
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "Colors array is required!" });
  }

  // Validate images object (Json)
  // if (
  //   !images ||
  //   typeof images !== "object" ||
  //   Array.isArray(images) ||
  //   Object.keys(images).length === 0
  // ) {
  //   return res.status(400).json({
  //     message: "Images object is required and must contain valid entries!",
  //   });
  // }

  // when no add field => "images" or "images": null or 0,
  if (!images) {
    return res.status(400).json({ message: "Images object is required!" });
  }

  // when check => "images": 123 or "" or boolean,
  if (typeof images !== "object") {
    return res.status(400).json({ message: "Images must be an object!" });
  }

  // when check => "images": [],
  if (Array.isArray(images)) {
    return res.status(400).json({ message: "Images cannot be an array!" });
  }

  // when check => "images": {},
  if (Object.keys(images).length === 0) {
    return res.status(400).json({ message: "Images object cannot be empty!" });
  }

  //The in operator checks if the object images has a property (key) named color.
  // Validate missing or empty image URLs
  const missingColors = colors.filter(
    (color) =>
      !(color in images) || !images[color] || images[color].trim() === ""
  );

  if (missingColors.length > 0) {
    return res.status(400).json({
      message: "Missing or empty image URLs for some colors!",
      missingColors,
    });
  }

  // Create new products in database
  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updateProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return res.status(200).json(updateProduct);
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = Number(id);

  // Check if product exists
  const existingDeleteProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingDeleteProduct) {
    return res.status(400).json({
      message: "Product not found or already deleted!",
    });
  }

  // Delete product permanently
  const deleteProduct = await prisma.product.delete({
    where: { id: productId },
  });

  return res
    .status(200)
    .json({ message: "Product deleted successfully!", deleteProduct });
};

// Get All Products
export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  // Inline orderBy logic....immediately invoked function expression (IIFE).
  const orderBy = (() => {
    switch (sort) {
      case "ace":
        return { price: Prisma.SortOrder.asc };
        break;

      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;

      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;

      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  // Query Prisma
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  res.status(201).json(products);
};

// Get Single Product
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  return res.status(200).json(product);
};

/* export const getProducts = async (req: Request, res: Response) => {
  try {
    const { sort, category, search, limit } = req.query as {
      sort?: string;
      category?: string;
      search?: string;
      limit?: string;
    };

    // Build filters dynamically
    const where: Prisma.ProductWhereInput = {
      ...(category && {
        category: { slug: category },
      }),
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
    };

    // Inline orderBy logic (IIFE)
    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return { price: "asc" as const };
        case "desc":
          return { price: "desc" as const };
        case "oldest":
          return { createdAt: "asc" as const };
        default:
          return { createdAt: "desc" as const }; // newest first by default
      }
    })();

    // Query Prisma
    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit ? parseInt(limit) : 20, // optional limit
      include: {
        category: true, // fetch related category info if needed
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
*/

/* What (() => {...})() means

  = (() => {...}) → defines an anonymous arrow function.
  = The trailing () → immediately calls it.
  = So the function runs instantly, and whatever it returns becomes the value of orderBy.

  = Essentially, this line:
        const orderBy = (() => { ... })();

is the same as writing:

let orderBy;
switch (sort) {
  case "asc":
    orderBy = { price: Prisma.SortOrder.asc };
    break;
  case "desc":
    orderBy = { price: Prisma.SortOrder.desc };
    break;
  case "oldest":
    orderBy = { createdAt: Prisma.SortOrder.asc };
    break;
  default:
    orderBy = { createdAt: Prisma.SortOrder.desc };
    break;
}

🧩 3️⃣ Why use this style (IIFE)
There are a few advantages:
✅ Encapsulation
      All logic stays inline and self-contained — no need for temporary variables outside.

✅ Expression context
      You can use it inside another expression, for example:

const products = await prisma.product.findMany({
  where,
  orderBy: (() => {
    switch (sort) {
      case "asc":
        return { price: "asc" };
      case "desc":
        return { price: "desc" };
      default:
        return { createdAt: "desc" };
    }
  })(),
});
Without IIFE, you’d need to define orderBy before calling findMany, which is less clean.

✅ Type safety
    TypeScript infers the return type of the IIFE directly, which often improves autocomplete and reduces explicit type casting.

🧩 4️⃣ Visual summary
    Concept	Code
    Define + Call immediately	(() => { ... })()
    Returns a value instantly	✅
    Keeps variables scoped inside	✅
    Cleaner inline Prisma queries	✅
*/

/* It’s destructuring the req.query object — that is, extracting specific query parameters from the incoming request URL.

In Express, req.query contains all the query string parameters that come after the ? in a URL.

💡 Example 1 — incoming request:
GET /api/products?sort=asc&category=sofa&search=luxury&limit=10


Express parses that URL like this:

    req.query = {
      sort: "asc",
      category: "sofa",
      search: "luxury",
      limit: "10"
    };


    Then your line:

    const { sort, category, search, limit } = req.query;


    means the same as:

    const sort = req.query.sort;
    const category = req.query.category;
    const search = req.query.search;
    const limit = req.query.limit;
*/

/* category: {
      slug: category as string,
  },
  => In the model Product = category is linked by model Category slug

This line tells Prisma:
  Filter products by related category where slug equals the category value from the query string (front-end or client).

  So if you hit:
    /api/products?category=sofa

then effectively Prisma runs:
      SELECT * FROM Product
      WHERE category.slug = 'sofa';

      await prisma.product.findMany({...})
      = prisma.product refers to your Product model in the Prisma schema.

      = .findMany() tells Prisma:
      → “Get all products that match the filter conditions I specify inside where.”

    So this returns an array of products (could be empty if no matches).
*/

/* !images[color]
        = This checks if the value for that color is falsy.
        = In JavaScript, values like undefined, null, "" (empty string), or 0 are falsy.
        = So, this catches cases where the image key exists but has no valid value.
*/

/* if (
    !images ||
    typeof images !== "object" ||
    Array.isArray(images) ||
    Object.keys(images).length === 0 ||
    Object.values(images).every((value) => !value || value.trim() === "")
  ) {
    return res.status(400).json({
      message: "Images object is required and must contain valid URLs!",
    });
  }

    Check	                                    Meaning
    !images	                             Ensures images exists
    typeof images !== "object"	         Must be an object (not string/number)
    Array.isArray(images)	               Must not be an array
    Object.keys(images).length === 0	   Object must have at least one key
    Object.values(images).every(...)	   Makes sure not all values are empty

    => Object.values() returns an array thats why  used every() array method
    => The every() method in JavaScript is an array method that tests whether all elements in an array pass a specific condition provided by a callback function.
*/
