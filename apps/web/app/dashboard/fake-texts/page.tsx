import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Audio from "./audio";

export default function FakeTextsPage() {
  return (
    <div className="flex gap-2 flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 p-4">
        <Tabs defaultValue="script" className="w-full">
          <TabsList className="w-full p-2 h-max">
            <TabsTrigger value="script">Script</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          <TabsContent value="script">script</TabsContent>
          <TabsContent value="theme">theme</TabsContent>
          <TabsContent value="video">video</TabsContent>
          <TabsContent value="audio">
            <Audio />
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden lg:block lg:w-2/5">tesf</div>
    </div>
  );
}
