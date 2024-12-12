import { PASTEL_COLORS } from "./constants";

const generateRandomColor = () => {
  return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
};

export default generateRandomColor;
