import Classes from "@/components/ClassList/ClassList";
import EventList from "@/components/EventList/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dashboard = ({}) => {
  return (
    <div className="bg-white border">
      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="border mx-12 mt-5 grid w-1/6 grid-cols-2 bg-gray-100 font-medium">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="classes">
          <Classes />
        </TabsContent>
        <TabsContent value="events">
          <EventList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default dashboard;
