import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rojee C.",
    role: "College Student",
    content: "SHEESH",
  },
  {
    name: "Toneejay",
    role: "Singer/Artist",
    content: "Anong gagawin kung wala ka:(",
  },
  {
    name: "Kaizen S.",
    role: "College Student",
    content: "g g",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-green-800 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="font-bold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
