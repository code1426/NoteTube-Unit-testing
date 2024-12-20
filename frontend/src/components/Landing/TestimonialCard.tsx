interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-80 flex-shrink-0 flex flex-col">
      <div className="flex-grow mb-4">
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
          <p className="text-gray-600 bg-green-100 p-4 rounded-lg rounded-tl-none">
            "{testimonial.content}"
          </p>
        </div>
      </div>
      <div>
        <div className="font-bold">{testimonial.name}</div>
        <div className="text-sm text-gray-500">{testimonial.role}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
