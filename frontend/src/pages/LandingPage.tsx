import { CgNotes } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { PiCardsBold } from "react-icons/pi";
import { useRef, useEffect } from "react";

import LandingHeader from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";
import FAQs from "@/components/Landing/FAQs";
import Footer from "@/components/Landing/Footer";

const LandingPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const refs = {
    aboutRef,
    feature1Ref,
    feature2Ref,
    feature3Ref,
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
      ".section, .left-icon, .right-icon",
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat">
      <LandingHeader refs={refs} />
      <Hero />
      <div
        ref={aboutRef}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="What is NoteTube?"
          description="NoteTube is a smart tool designed to transform your notes into effective learning resources by summarizing content, suggesting relevant videos, and creating interactive flashcards."
          reverse
        />
      </div>
      <div
        ref={feature1Ref}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="Upload Notes"
          description="Easily upload your notes in various formats and let NoteTube process and enhance your content for better learning."
          reverse={false}
          Icon={
            <CgNotes className="right-icon opacity-0 transform translate-x-24 transition-all duration-500" />
          }
        />
      </div>
      <div
        ref={feature2Ref}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="Get Related Videos"
          description="Receive curated video recommendations that align with your uploaded notes, helping you dive deeper into your topics."
          reverse
          Icon={
            <BiSolidVideos className="left-icon opacity-0 transform -translate-x-24 transition-all duration-500" />
          }
        />
      </div>
      <div
        ref={feature3Ref}
        className="section opacity-0 transform translate-y-24 transition-all duration-500"
      >
        <Section
          title="Use Generated Flashcards"
          description="Access auto-generated flashcards based on your notes, designed to help you retain key concepts more effectively."
          reverse={false}
          Icon={
            <PiCardsBold className="right-icon opacity-0 transform translate-x-24 transition-all duration-500" />
          }
        />
      </div>
      <div ref={faqsRef}>
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
