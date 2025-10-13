import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  // Destructure from Clerk
  const { getToken } = await auth();

  const token = await getToken();
  //console.log("clerk token = ", token);

  // Product service Authenticated
  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataProduct = await resProduct.json();
  console.log(dataProduct);

  // Order service Authenticated
  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataOrder = await resOrder.json();
  console.log(dataOrder);

  // Payment service Authenticated
  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataPayment = await resPayment.json();
  console.log(dataPayment);

  return <div>TestPage</div>;
};

export default TestPage;

//Scattered selections → Alt + Click

// All at once → Ctrl + Shift + L
