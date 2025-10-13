import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  //console.log(auth);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  req.userId = auth.userId;

  return next();
};

/* Nice — that snippet is a TypeScript declaration merge! 👇

    = It extends the built-in Express.Request type to include your own custom property (userId), which is super useful for authentication middleware.

        declare global {
        namespace Express {
            interface Request {
            userId?: string;
            }
        }
        }

    Explanation:
    = declare global → tells TypeScript you’re adding to the global type definitions.

    = namespace Express → targets Express’s built-in namespace.

    = interface Request → merges with the existing Request interface.

    = userId?: string → adds an optional userId property that you can safely access like:

            req.userId
*/
