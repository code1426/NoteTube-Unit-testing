import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <section className="px-8 py-24 md:px-8 lg:py-16 bg-white select-none w-full">
      <h2 className="text-5xl font-bold text-center my-10 text-green-800">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="max-w-3xl mx-auto space-y-4 font-primaryMedium"
      >
        <AccordionItem
          value="question-1"
          className="border-gray-100 py-1 px-4 rounded-xl border shadow-md bg-white"
        >
          <AccordionTrigger className="text-xl">
            What is NoteTube?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            NoteTube is a web app that allows users to upload their notes and
            generates summarized content, relevant YouTube videos, and
            flashcards to help with study and review.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="question-2"
          className="border-gray-100 text-base py-1 px-4 rounded-xl border shadow-md bg-white"
        >
          <AccordionTrigger className="text-xl">
            How does it work?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Users can upload their notes to the platform. NoteTube processes the
            uploaded content, summarizes it, and then suggests related YouTube
            videos for better understanding. Additionally, it creates flashcards
            for effective review sessions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="question-3"
          className="border-gray-100 text-base py-1 px-4 rounded-xl border shadow-md bg-white"
        >
          <AccordionTrigger className="text-xl">
            How do you use NoteTube?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Simply create an account, upload your notes in supported formats,
            and let NoteTube do the rest. You can access the generated content
            and flashcards from your dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="question-4"
          className="border-gray-100 text-base py-1 px-4 rounded-xl border shadow-md bg-white"
        >
          <AccordionTrigger className="text-xl">Is it free?</AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Yes, NoteTube offers a free tier with essential features. For
            advanced functionalities, such as premium video suggestions and
            unlimited flashcard generation, users can subscribe to a paid plan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="question-5"
          className="border-gray-100 text-base py-1 px-4 rounded-xl border shadow-md bg-white"
        >
          <AccordionTrigger className="text-xl">
            Is there a limit to the notes you upload?
          </AccordionTrigger>
          <AccordionContent className="text-base text-gray-600">
            Yes, there is a limit. Since this app is free, we are using free
            storage systems to deploy our app. That's why there is a limit to
            the number of times you can upload your notes, as our database can
            only hold up to 50 rows.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQs;
