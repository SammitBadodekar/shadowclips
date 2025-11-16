import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Audio from "./audio";
import Generate from "./generate";

export default function FakeTextsPage() {
  return (
    <div className="w-full grid gap-2 grid-cols-1 lg:grid-cols-5  lg:max-w-[calc(100vw-17rem)] min-h-[calc(100svh-4rem)]">
      <div className="w-full col-start-1 col-end-2 lg:col-span-3 lg:col-start-1 lg:col-end-4 p-4 relative">
        <Tabs defaultValue="script" className="w-full h-full">
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
        <Generate />
      </div>
      <div className="hidden lg:block w-full lg:col-span-2 lg:col-start-4 lg:col-end-6">
        tesf
      </div>
    </div>
  );
}
