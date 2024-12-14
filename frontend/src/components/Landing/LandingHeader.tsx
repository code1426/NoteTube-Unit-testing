import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import ListItem from "./ListItem";

interface LandingHeaderProps {
  refs?: {
    introductionRef: React.RefObject<HTMLDivElement>;
    discoverRef: React.RefObject<HTMLDivElement>;
    aboutRef: React.RefObject<HTMLDivElement>;
    featureRef: React.RefObject<HTMLDivElement>;
    faqsRef: React.RefObject<HTMLDivElement>;
  };
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ refs }) => {
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-row w-screen top-0 px-10 h-20 bg-white bg-opacity-70 items-center justify-between sticky backdrop-blur-xl z-50 select-none">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-row text-green text-xl font-secondaryRegular hover:text-green_hover transition-all duration-300 gap-5">
            <img src="./logo.svg" alt="Logo" className="w-6 h-6 mb-2" />
            NoteTube
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetDescription className="mt-4">
            Learn how NoteTube revolutionizes the way you study by transforming
            your notes into engaging and interactive learning materials.
          </SheetDescription>
          <SheetHeader className="text-3xl font-bold">
            <img src="../src/assets/images/asking.png" alt="asking.png" />
          </SheetHeader>
          <SheetTitle>
            NoteTube is your ultimate study companion, transforming notes into
            interactive learning resources.
          </SheetTitle>
          <SheetFooter className="mt-28 mx-auto justify-self-center w-full flex">
            © 2024 NoteTube. All rights reserved.
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="hidden flex-row gap-8 sm:flex">
        <NavigationMenu>
          <NavigationMenuList className="hidden sm:flex flex-row gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        <img
                          src="./logo.svg"
                          alt="Logo"
                          className="w-6 h-6 mb-2"
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          NoteTube
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          NoteTube transforms your notes into a study resource
                          by generating summaries, video recommendations, and
                          flashcards, helping you learn effectively.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>

                  <Sheet>
                    <SheetTrigger asChild>
                      <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <h1 className="text-sm font-medium leading-none">
                          Introduction
                        </h1>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          What is NoteTube? Learn how NoteTube revolutionizes
                          the way you study by transforming your notes into
                          engaging and interactive learning materials.
                        </p>
                      </a>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetDescription className="mt-4">
                        Learn how NoteTube revolutionizes the way you study by
                        transforming your notes into engaging and interactive
                        learning materials.
                      </SheetDescription>
                      <SheetHeader className="text-3xl font-bold">
                        <img
                          src="../src/assets/images/asking.png"
                          alt="asking.png"
                        />
                      </SheetHeader>
                      <SheetTitle>
                        NoteTube is your ultimate study companion, transforming
                        notes into interactive learning resources.
                      </SheetTitle>
                      <SheetFooter className="mt-28 mx-autojustify-self-center w-full flex">
                        © 2024 NoteTube. All rights reserved.
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <ListItem
                    title="Discover"
                    onClick={() =>
                      refs?.aboutRef && scrollToSection(refs.discoverRef)
                    }
                  >
                    Explore the unique features of NoteTube that make it your
                    ultimate study companion, from video suggestions to
                    flashcard generation.
                  </ListItem>
                  <ListItem
                    title="About"
                    onClick={() =>
                      refs?.aboutRef && scrollToSection(refs.aboutRef)
                    }
                  >
                    Get an overview of NoteTube's mission to enhance your
                    learning experience by integrating technology and education.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300">
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent
                onClick={() =>
                  refs?.featureRef && scrollToSection(refs.featureRef)
                }
              >
                <ul className="grid w-[400px] gap-3 p-4">
                  <ListItem title="Upload Notes">
                    Easily upload your notes in multiple formats and let
                    NoteTube do the work of enhancing them for study.
                  </ListItem>
                  <ListItem title="Get Related Videos">
                    Access video recommendations tailored to the content of your
                    uploaded notes to expand your understanding.
                  </ListItem>
                  <ListItem title="Use Generated Flashcards">
                    Explore AI-generated flashcards that make revising key
                    concepts simple and effective.
                  </ListItem>
                </ul>
                <div className="flex justify-center items-center text-gray-600 mb-4">
                  *Click for details.*
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button
                onClick={() => refs?.faqsRef && scrollToSection(refs.faqsRef)}
                className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300"
              >
                FAQs
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row gap-8">
        <Link to="/register">
          <button className="px-8 py-2 text-xl font-secondaryRegular text-white bg-green rounded-3xl hover:bg-green_hover transition-all duration-300 text-nowrap">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="px-8 py-2 text-xl font-secondaryRegular text-green border-2 border-green rounded-3xl hover:text-green_hover hover:border-green_hover transition-all duration-300 text-nowrap">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingHeader;
