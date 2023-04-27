import { api } from "@/utils/api";
import { type ChangeEvent, type FC, useState, type MouseEvent } from "react";
import { type DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { AvailabilityPicker } from "../AvailabilityPicker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


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
  const { mutateAsync: addCookingClass } =
    api.admin.addCookingClass.useMutation();

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

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const availDate = formInput.availability.map(avail => avail?.startDate)
    try {    
      await addCookingClass({
        title: formInput.title,
        description: formInput.description,
        product: formInput.product,
        availability: availDate ? new Date(availDate.toString()) : new Date(),
      });

      setFormInput(initialData);

    } catch (error) {
      console.log(error)
    }
};


  return (
    <div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          onChange={handleTextAreaChange}
          autoComplete="off"
        />
      </div>
      <select
        name="product"
        id=""
        onChange={handleSelectChange}
        className="rounded-md border-gray-200"
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

      <div>
        <label htmlFor="availability" className="mb-2 text-sm font-medium">
          Availability
        </label>
        <AvailabilityPicker
          value={formInput.availability}
          onChange={handleAvailabilityChange}
        />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button type="button" variant="default" onClick={handleSubmit} className="bg-atlantis-600 hover:bg-atlantis-500">Submit</Button>
    </div>
  );
};

export default AddClass;
