"use client"
import { api } from "@/utils/api";
import { type ChangeEvent, type FC, useState, type MouseEvent } from "react";
import { type DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { AvailabilityPicker } from "../AvailabilityPicker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CookingClass {
  title: string;
  description: string;
  url: string;
  timestamp: string;
  date: DateValueType[];
}

const initialData = {
  title: "",
  description: "",
  url: "",
  price: "",
  timestamp: "",
  date: [],
};

const AddEvent: FC = ({}) => {
  const [formInput, setFormInput] = useState<CookingClass>(initialData);
  const ctx = api.useContext()
  const addCookingClass = api.admin.addEvent.useMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleAvailabilityChange = (newValue: DateValueType[]) => {
    setFormInput((prev) => ({
      ...prev,
      date: [...newValue],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            <form className="">
              <div className="pb-6">
                <Label htmlFor="title" className="mb-4">Title</Label>
                <Input
                  id="title"
                  name="title"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="pb-6">
                <Label htmlFor="description"className="mb-4">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleTextAreaChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="pb-6">
                <Label htmlFor="timestamp" className="mb-4">Time</Label>
                <Input
                  id="timestamp"
                  name="timestamp"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="pb-6">
                <Label htmlFor="url" className="mb-4">Url</Label>
                <Input
                  id="url"
                  name="url"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="pb-6">
                <Label
                  htmlFor="date"
                  className="mb-4 text-sm font-medium"
                >
                  Date
                </Label>
                <AvailabilityPicker
                  value={formInput.date}
                  onChange={handleAvailabilityChange}
                />
                
              </div>
              <Button
                type="button"
                variant="default"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  setLoading(true)
                  const availDate = formInput.date.map(
                    (avail) => avail?.startDate
                  );
                  try {
                    addCookingClass
                      .mutateAsync({
                        title: formInput.title,
                        description: formInput.description,
                        url: formInput.url,
                        timestamp: formInput.timestamp,
                        date: availDate
                          ? new Date(availDate.toString())
                          : new Date(),
                      })
                      .then(() => {
                        setLoading(true)
                        setFormInput(initialData);
                        void ctx.cookingClass.getClasses.invalidate()
                        setTimeout(()=>{
                          setOpen(false)
                        }, 2000)
                        
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="bg-atlantis-600 hover:bg-atlantis-500"
                disabled={loading}
              >
                {
                  loading ? "adding..." : "Submit"
                }
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
