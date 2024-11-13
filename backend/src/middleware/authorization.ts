import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorization = (request: any, response: any, next: any) => {
  try {
    const jwtToken = request.header("token");

    if (!jwtToken) {
      console.log("no token");
      response.status(401).json({ error: "Not Authorized" });
      return;
    }
    jwt.verify(
      jwtToken,
      process.env.DATABASE_URL!,
      (err: any, decoded: any) => {
        if (err) {
          response.status(403).json({ error: "Not Authorized" });
        }
        request.user = decoded.user;
      },
    );

    next();
  } catch (error) {
    response.status(403).json({ error: "Not Authorized" });
  }
};

export default authorization;
