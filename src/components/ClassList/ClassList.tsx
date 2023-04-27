import { api } from "@/utils/api";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import AddClass from "./AddClass";



const ClassList = () => {
  
  const { data: cookingClasses } =
    api.cookingClass.getClasses.useQuery();
  const deleteCookingClass  =
    api.admin.deleteCookingClass.useMutation();


  return (
    <div className="mt-8 bg-white">
      <AddClass/>
      <div className="mx-auto mt-8 px-5">
        {/* add table here */}
        <div className="grid grid-cols-4 gap-4">
          {cookingClasses?.map((cookingClass) => (
            <div
              key={cookingClass.id}
              className="relative rounded-md border shadow-md"
            >
              <Button 
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  deleteCookingClass.mutate({ id: cookingClass.id });
                }}
                className="absolute right-0 top-0 m-2 rounded-full bg-red-500 transition-colors duration-300 hover:bg-red-600"
              >
                <Trash size={20} className="p-1 text-white" />
              </Button>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-medium">
                  {cookingClass.title}
                </h3>
                <p className="text-gray-600">{cookingClass.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassList;
