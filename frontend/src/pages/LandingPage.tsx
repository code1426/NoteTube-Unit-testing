// import { CgNotes } from "react-icons/cg";
// import { BiSolidVideos } from "react-icons/bi";
// import { PiCardsBold } from "react-icons/pi";
import { useRef, useEffect } from "react";

import LandingHeader from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";
import FAQs from "@/components/Landing/FAQs";
import Footer from "@/components/Landing/Footer";
import UserManualSection from "@/components/Landing/UserManualSection";
import JoinUsSection from "@/components/Landing/JoinUsSection";
import InformationCardsSection from "@/components/Landing/InformationCardsSection";
import SectionCarousel from "@/components/Landing/SectionCarousel";

const LandingPage = () => {
  const introductionRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const refs = {
    introductionRef,
    discoverRef,
    aboutRef,
    featureRef,
    faqsRef,
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
      ".section, .left-icon, .right-icon, .infosection, .card",
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-auto flex flex-col items-center justify-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat scrollbar-custom">
      <LandingHeader refs={refs} />
      <Hero />
      <section
        className="section w-screen mx-8 shadow-2xl border-8"
        ref={featureRef}
      >
        <SectionCarousel duration={3000}>
          <div className="section">
            <Section
              title="Upload Notes"
              description="Break free from traditional note-taking limitations. Simply upload your handwritten, typed, or digital notes in any format - PDFs, images, text documents - and watch as NoteTube intelligently processes and transforms them into a comprehensive learning experience tailored just for you."
              reverse
              image="/notes.png"
            />
          </div>
          <div className="section">
            <Section
              title="Get Related Videos"
              description="Dive deeper into your learning with curated, intelligent video recommendations. Our AI analyzes your notes and finds the most relevant, high-quality educational content from across the web, ensuring you get targeted explanations that complement and enhance your existing study materials."
              reverse
              image="src/assets/images/videos.png"
            />
          </div>
          <div className="section">
            <Section
              title="Use Generated Flashcards"
              description="  Supercharge your memory retention with AI-powered flashcards. NoteTube automatically generates smart, context-aware flashcards from your notes, presenting key concepts, definitions, and critical information in an interactive format that makes studying more engaging and efficient."
              reverse
              image="./cards.png"
            />
          </div>
        </SectionCarousel>
      </section>
      {/*  */}
      <div
        ref={discoverRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <InformationCardsSection />
      </div>
      {/*  */}
      <div className="section opacity-0 transform translate-y-24 transition-all duration-500 w-screen">
        <UserManualSection />
      </div>
      {/*  */}
      <div
        ref={aboutRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500 w-screen"
      >
        <Section
          title="About Us"
          description="At NoteTube, we believe in revolutionizing the way students learn by integrating advanced AI technology. We transform scattered notes into structured, engaging study materials that are easy to comprehend and retain. Our mission is to enhance educational experiences by making studying more effective and enjoyable. With NoteTube, students can maximize their learning potential and achieve academic success."
          reverse={false}
          image="./about.png"
        />
      </div>
      {/*  */}
      <div className="section opacity-0 transform translate-y-24 transition-all duration-500">
        <JoinUsSection />
      </div>
      {/*  */}
      <div
        ref={faqsRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500 w-auto"
      >
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
