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
  product: string;
  availability: DateValueType[];
}

const initialData = {
  title: "",
  description: "",
  product: "",
  price: "",
  availability: [],
};

const AddClass: FC = ({}) => {
  const [formInput, setFormInput] = useState<CookingClass>(initialData);
  const { data: prices } = api.checkout.getPrices.useQuery();
  const ctx = api.useContext()
  const addCookingClass = api.admin.addCookingClass.useMutation();
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.options[e.target.selectedIndex]?.value,
    }));
  };

  const handleAvailabilityChange = (newValue: DateValueType[]) => {
    setFormInput((prev) => ({
      ...prev,
      availability: [...newValue],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Class</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            <div className="">
              <div className="pb-6">
                <Label htmlFor="title" className="mb-4">Title</Label>
                <Input
                  id="title"
                  name="title"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="pb-6">
                <Label htmlFor="description"className="mb-4">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleTextAreaChange}
                  autoComplete="off"
                />
              </div>
              <div className="pb-6">
              <Label htmlFor="product" className="mb-4">Associated Product</Label>
              <select
                name="product"
                id=""
                onChange={handleSelectChange}
                className="rounded-md border-gray-200 w-full"
              >
                <option selected disabled>
                  Select Product
                </option>

                {prices?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              </div>

              <div className="pb-6">
                <Label
                  htmlFor="availability"
                  className="mb-4 text-sm font-medium"
                >
                  Availability
                </Label>
                <AvailabilityPicker
                  value={formInput.availability}
                  onChange={handleAvailabilityChange}
                />
                {addCookingClass.error?.data?.zodError?.fieldErrors.availability && (<span className="mb-8 text-red-500">{addCookingClass.error.data.zodError.fieldErrors.title}</span>)}
              </div>
              <Button
                type="button"
                variant="default"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  setLoading(true)
                  const availDate = formInput.availability.map(
                    (avail) => avail?.startDate
                  );
                  try {
                    addCookingClass
                      .mutateAsync({
                        title: formInput.title,
                        description: formInput.description,
                        product: formInput.product,
                        availability: availDate
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
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddClass;
