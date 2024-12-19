import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useFetchNote from "@/hooks/Notes/useFetchNote";
import { BookOpen, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoteContent from "@/components/Notes/NoteContent";
import VideoList from "@/components/Notes/VIdeoList";
import LoadingScreen from "@/components/LoadingScreen";

const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { note, noteLoading, noteError } = useFetchNote(noteId!);

  React.useEffect(() => {
    if (noteError) {
      console.error(noteError);
      toast.error("Error fetching note. Please try again.");
    }
  }, [noteError]);

  if (noteLoading || !note) {
    return <LoadingScreen message="Loading notes..." />;
  }

  return (
    <div className="container mx-auto px-4 mt-14 py-8 max-w-7xl dark:bg-dark-background">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{note.title}</h1>
        <p className="text-muted-foreground mt-2">
          Created on {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </header>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger
            value="content"
            className="flex items-center hover:dark:bg-dark-foreground"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Note Content
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="flex items-center hover:dark:bg-dark-foreground"
          >
            <Video className="w-4 h-4 mr-2" />
            Related Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <ScrollArea className="h-[calc(100vh-22rem)] md:h-[calc(100vh-19rem)] lg:h-[calc(100vh-19rem)] xl:h-[calc(100vh-19rem)] pr-4">
            <NoteContent content={note.content} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="videos">
          <ScrollArea className="h-[calc(100vh-22rem)] md:h-[calc(100vh-19rem)] lg:h-[calc(100vh-19rem)] xl:h-[calc(100vh-19rem)] pr-4">
            <VideoList videos={note.videos} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotePage;
