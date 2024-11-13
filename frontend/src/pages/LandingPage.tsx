import { CgNotes } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { PiCardsBold } from "react-icons/pi";
import { useRef } from "react";

import Header from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";

const LandingPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div ref={aboutRef}>
        <Section
          title="What is NoteTube?"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
          reverse
        />
      </div>
      <div ref={featuresRef}>
        <Section
          title="Upload Notes"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum.f"
          reverse={false}
          Icon={<CgNotes />}
        />
      </div>
      <Section
        title="Get Related Videos"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
        reverse
        Icon={<BiSolidVideos />}
      />
      <Section
        title="Use Generated Flashcards"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
        reverse={false}
        Icon={<PiCardsBold />}
      />
    </div>
  );
};

export default LandingPage;
