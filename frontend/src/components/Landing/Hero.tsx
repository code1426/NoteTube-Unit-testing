import { Link } from "react-router-dom";
import { Tilt } from "@jdion/tilt-react";
// import { ReactNode } from "react";

// Define props type for GlassContainer
// interface GlassContainerProps {
//   name?: string;
//   comment?: string;
//   width: string;
//   height: string;
//   className: string;
// }

// Reusable GlassContainer Component
// const GlassContainer: React.FC<GlassContainerProps> = ({
//   name,
//   comment,
//   width,
//   height,
//   className,
// }) => {
//   return (
//     <Tilt
//       options={{
//         max: 10,
//         scale: 1.05,
//         speed: 400,
//         reverse: false,
//         perspective: 1000,
//         transition: true,
//         axis: null,
//         reset: true,
//         easing: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
//       }}
//       className={`bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-4 flex flex-col justify-between ${className}`}
//       style={{ width, height }}
//     >
//       <div className="text-lg font-bold text-green">{name}</div>
//       <div className="text-sm text-gray-700">{comment}</div>
//     </Tilt>
//   );
// };

const Hero = () => {
  // const glassContainers = [
  //   {
  //     name: "Jane Doe",
  //     comment: "This platform is amazing! Highly recommend it.",
  //     width: "200px",
  //     height: "100px",
  //     className: "absolute top-20 left-10 border-2 border-gray-200",
  //   },
  //   {
  //     name: "John Smith",
  //     comment: "Helped me study effectively in no time!",
  //     width: "150px",
  //     height: "110px",
  //     className: "absolute top-10 right-10 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Chris Lee",
  //     comment: "The perfect study companion. Love it!",
  //     width: "300px",
  //     height: "100px",
  //     className: "absolute bottom-10 left-37 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Alex Taylor",
  //     comment: "I can't imagine studying without it anymore.",
  //     width: "250px",
  //     height: "120px",
  //     className: "absolute bottom-40 right-16 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Jordan Kim",
  //     comment: "Super intuitive and user-friendly.",
  //     width: "180px",
  //     height: "100px",
  //     className: "absolute top-10 right-45 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Pat Morgan",
  //     comment: "Made learning a lot more fun and engaging.",
  //     width: "220px",
  //     height: "100px",
  //     className: "absolute top-32 left-60 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Taylor Brooks",
  //     comment: "Game-changer for my studies!",
  //     width: "160px",
  //     height: "110px",
  //     className: "absolute bottom-10 left-10 border-2 border-gray-200",
  //   },
  //   {
  //     name: "Sam Rivera",
  //     comment: "A must-have tool for students.",
  //     width: "170px",
  //     height: "100px",
  //     className: "absolute bottom-12 right-40 border-2 border-gray-200",
  //   },
  // ];

  return (
    <div className="relative flex flex-grow flex-col min-h-screen p-8 items-center justify-center gap-4 bg-[url('/path-to-your-background.jpg')] bg-cover bg-center select-none">
      {/* Scattered Glass Containers */}
      {/* {glassContainers.map((container, index) => (
        <GlassContainer
          key={index}
          name={container.name}
          comment={container.comment}
          width={container.width}
          height={container.height}
          className={container.className}
        />
      ))} */}

      {/* Main Content */}
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 400,
          reverse: true,
          perspective: 1000,
          transition: true,
          axis: null,
          reset: true,
          easing: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        }}
        className="  p-8 rounded-2xl backdrop-blur-xs shadow-xs"
      >
        <div className="text-green font-secondaryRegular bg-none text-center">
          <div className="text-8xl">Your AI-Powered Study Companion</div>
        </div>
      </Tilt>

      <Link to="/register">
        <button className="px-12 py-4 text-xl font-secondaryRegular text-white bg-green rounded-3xl hover:bg-green_hover transition-all duration-300 text-nowrap">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Hero;
