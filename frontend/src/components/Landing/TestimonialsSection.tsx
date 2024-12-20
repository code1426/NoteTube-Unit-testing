import { motion } from "framer-motion";
import TestimonialRow from "./TestimonialRow";

const testimonialsRow1 = [
  {
    name: "Rojee Cacar",
    role: "College Student",
    content:
      "This app is a valuable resource for students who struggle with learning.",
  },
  {
    name: "Kaizen Somosera",
    role: "Software Engineering Student",
    content: "g g",
  },
  {
    name: "Paul Ardiente",
    role: "Software Engineering Student",
    content: "Very good!",
  },
  {
    name: "EJ Cortez",
    role: "Software Engineering Student",
    content: "Good Stuff",
  },
  {
    name: "Julius Somosera",
    role: "Overseas Filipino Worker",
    content: "I think it is useful most specially to the students.",
  },
];

const testimonialsRow2 = [
  {
    name: "Nelissa Tuden",
    role: "Software Engineering Student",
    content: "Slayy!",
  },
  {
    name: "Cassandra Gallo",
    role: "Software Engineering Student",
    content: "Good, I like the UI and the overall concept.",
  },
  {
    name: "Mamamo",
    role: "Software Engineering Student",
    content: "Sheeshable",
  },
  {
    name: "Thresha Agregado",
    role: "College Student",
    content: "Very helpful and useful in our study.",
  },
  {
    name: "Kenneth Joel",
    role: "Software Engineering Student",
    content: "Goods!",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-green-800 py-24 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          What Our Users Say
        </motion.h2>
        <div className="space-y-6">
          <TestimonialRow testimonials={testimonialsRow1} direction="left" />
          <TestimonialRow testimonials={testimonialsRow2} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
