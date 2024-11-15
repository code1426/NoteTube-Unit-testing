import { CgNotes } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { PiCardsBold } from "react-icons/pi";
import { useRef, useEffect } from "react";

import Header from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";

const LandingPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
          // else {
          //   entry.target.classList.remove("visible"); // REMOVE "ELSE LINE" IF GUSTO MAG REMAIN AFTER PASSING THE SECTION
          // }
        });
      },
      {
        threshold: 0.4,
      },
    );

    const elements = document.querySelectorAll(
      ".section, .left-icon, .right-icon",
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat">
      <Header>
        <button
          className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300"
          onClick={() => scrollToSection(aboutRef)}
        >
          About
        </button>
        <button
          className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300"
          onClick={() => scrollToSection(featuresRef)}
        >
          Features
        </button>
      </Header>
      <Hero />
      <div
        ref={aboutRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="What is NoteTube?"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
          reverse
        />
      </div>
      <div
        ref={featuresRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="Upload Notes"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum.f"
          reverse={false}
          Icon={
            <CgNotes className="right-icon opacity-0 transform translate-x-24 transition-all duration-500" />
          }
        />
      </div>
      <div className="section opacity-0 transform translate-y-24 transition-all duration-500">
        <Section
          title="Get Related Videos"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
          reverse
          Icon={
            <BiSolidVideos className="left-icon opacity-0 transform -translate-x-24 transition-all duration-500" />
          }
        />
      </div>
      <div className="section opacity-0 transform translate-y-24 transition-all duration-500">
        <Section
          title="Use Generated Flashcards"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
          reverse={false}
          Icon={
            <PiCardsBold className="right-icon opacity-0 transform translate-x-24 transition-all duration-500" />
          }
        />
      </div>
    </div>
  );
};

export default LandingPage;
