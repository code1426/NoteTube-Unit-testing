import { VIBRANT_COLORS } from "./constants";

const generateRandomColor = () => {
  return VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];
};

export default generateRandomColor;
