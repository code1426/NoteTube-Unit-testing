import { CgNotes } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { PiCardsBold } from "react-icons/pi";

import Header from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat">
      <Header />
      <Hero />
      <Section
        title="What is NoteTube?"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum."
        reverse
      />
      <Section
        title="Upload Notes"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem delectus quasi modi tempore voluptatem ipsam aspernatur laudantium. Cum similique iusto nobis itaque officiis delectus odit molestiae temporibus. Accusantium, earum.f"
        reverse={false}
        Icon={<CgNotes />}
      />
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
