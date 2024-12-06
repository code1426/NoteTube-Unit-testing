import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <section className="px-4 min-h-screen md:px-8 lg:py-16 bg-green bg-opacity-85 text-white">
      <h2 className="text-6xl font-bold text-center mb-6 font-secondaryRegular">
        FAQs
      </h2>
      <Accordion
        type="single"
        collapsible
        className="max-w-3xl mx-auto space-y-4 font-primaryMedium"
      >
        <AccordionItem value="question-1">
          <AccordionTrigger className="text-xl font-bold">
            What is NoteTube?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            NoteTube is a web app that allows users to upload their notes and
            generates summarized content, relevant YouTube videos, and
            flashcards to help with study and review.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question-2">
          <AccordionTrigger className="text-xl font-bold">
            How does it work?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Users can upload their notes to the platform. NoteTube processes the
            uploaded content, summarizes it, and then suggests related YouTube
            videos for better understanding. Additionally, it creates flashcards
            for effective review sessions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question-3">
          <AccordionTrigger className="text-xl font-bold">
            How do you use NoteTube?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Simply create an account, upload your notes in supported formats,
            and let NoteTube do the rest. You can access the generated content
            and flashcards from your dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question-4">
          <AccordionTrigger className="text-xl font-bold">
            Is it free?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes, NoteTube offers a free tier with essential features. For
            advanced functionalities, such as premium video suggestions and
            unlimited flashcard generation, users can subscribe to a paid plan.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQs;
