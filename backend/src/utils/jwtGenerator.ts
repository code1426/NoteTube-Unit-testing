import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtGenerator = (userId: string) => {
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, process.env.DATABASE_URL!, {
    expiresIn: "2 days",
  });
};

export default jwtGenerator;
