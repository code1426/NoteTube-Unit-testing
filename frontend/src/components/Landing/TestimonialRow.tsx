import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimonialRowProps {
  testimonials: Testimonial[];
  direction: "left" | "right";
}

const TestimonialRow: React.FC<TestimonialRowProps> = ({
  testimonials,
  direction,
}) => {
  const containerVariants = {
    animate: {
      x: direction === "left" ? [0, -1035] : [-1035, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative h-72">
      <motion.div
        variants={containerVariants}
        animate="animate"
        className="flex gap-8 absolute"
        style={{ width: "200%" }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialRow;
