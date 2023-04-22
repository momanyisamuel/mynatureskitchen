import { ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/constants/config";
import { api } from "@/utils/api";
import { GripVertical, Plus, Trash } from "lucide-react";
import { AvailabilityPicker } from "../AvailabilityPicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface indexProps {}

type Availability = { startDate: string; endDate: string };

interface CookingClass {
  title: string;
  description: string;
  product: string;
  file: undefined | File;
  availability: Availability[];
}
type ImgData = {
  name: string;
  size: number | null;
  type: string;
  url: string;
} | null;

const initialData = {
  title: "",
  description: "",
  product: "",
  file: undefined,
  availability: [],
};

const columns = [
  { key: "title", title: "Class Title" },
  { key: "description", title: "Description" },
  { key: "product", title: "Product" },
  { key: "imageUrl", title: "Image url" },
];

const data = [
  { title: "Title", description: "Description", product: "Product" },
];

const index: FC<indexProps> = ({}) => {
  const { data: prices } = api.checkout.getPrices.useQuery();
  const [formInput, setformInput] = useState<CookingClass>(initialData);
  const [imgPreview, setImgPreview] = useState<ImgData>(null);
  const [error, setError] = useState<string>("");
  const { mutateAsync: createImgUrl } =
    api.admin.createPresignedUrl.useMutation();
  const { mutateAsync: addCookingClass } =
    api.admin.addCookingClass.useMutation();
  const { data: cookingClasses, refetch } =
    api.cookingClass.getClasses.useQuery();
  const { mutateAsync: deleteCookingClass } =
    api.admin.deleteCookingClass.useMutation();


  useEffect(() => {
    if (!formInput.file) return;
    const objectUrl = URL.createObjectURL(formInput.file);
    
    setImgPreview({
      name: formInput.file.name,
      size: formInput.file.size,
      type: formInput.file.type,
      url: objectUrl
    });

    //clean up preview
    return () => URL.revokeObjectURL(objectUrl);
  }, [formInput.file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No file selected");
    if (e.target.files[0].size > MAX_FILE_SIZE)
      return setError("File exceeds maximum size");
    setformInput((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setformInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setformInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.options[e.target.selectedIndex]?.value,
    }));
  };
  const handleAvailabilityChange = (newValue: any) => {
    setformInput((prev) => ({
      ...prev,
      availability: newValue,
    }));
  };

  const handleTextAreaChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setformInput((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
  }

  const handleImageUpload = async () => {
      try {
        const { file } = formInput;

        if (!file) return;

        const { fields, key, url } = await createImgUrl({ filetype: file.type });

        const data = {
          ...fields,
          "Content-Type": file.type,
          file,
        };

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as any);
        });

        const res = await fetch(url, { method: "POST", body: formData });

        return { key: key, url: res.url };
      } catch (error) {
        setError("Error Uploading file: " + error)
      }
  };

  const handleSubmit = async () => {
      try {
   
        const key = await handleImageUpload();

        if (!key) throw new Error("no key");
    
        await addCookingClass({
          title: formInput.title,
          description: formInput.description,
          product: formInput.product,
          imageUrl: key.url + "/" + key.key,
          availability: formInput.availability,
        });
    
        refetch();
        setformInput(initialData);
        setImgPreview(null);

      } catch (error) {
        setError("Couldnt Submit Form, Something went wrong")
      }
  };

  const handleDelete = async (imageUrl: string, id: string) => {
    await deleteCookingClass({ id, imageUrl });
    refetch();
  };

  return (
    <div className="mt-8 bg-white">
      <div className="mx-auto px-5">
        <div className="flex flex-col gap-2">
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
          <select name="product" id="" onChange={handleSelectChange}>
            <option selected disabled>
              Select Product
            </option>
            
            {prices?.map((price) => (
              <option key={price.id} value={price.id}>
                {/* @ts-ignore */}
                {price.product ? price.product.name : ""}
              </option>
            ))}
          </select>
          <label className="flex flex-col">
            {imgPreview ? (
              <div className="flex h-24 flex-row border-[3px] bg-slate-100 transition-all ease-in">
                <div className="flex h-full w-[2%] flex-row items-center justify-center border">
                  <GripVertical className="text-slate-400" />
                </div>
                <div className="flex h-full w-[20%] flex-row items-center justify-start border px-5">
                  <div className="h-16 w-16">
                    <div className="flex h-full items-center justify-center">
                    <Image
                      alt="preview"
                      className=""
                      style={{ objectFit: "contain",  height: "auto", width: "auto", position: "relative" }}
                      width={64}
                      height={64}
                      src={imgPreview.url}
                    />
                    </div>
                  </div>
                  <div className=" ml-4">
                    <p className="text-sm font-medium uppercase text-slate-400">
                      {imgPreview.type}
                    </p>
                    <p className="text-sm font-medium uppercase text-slate-400">
                      {formatFileSize(imgPreview.size)}
                    </p>
                    <a href={imgPreview.url} className="border-b border-slate-400 text-sm font-medium text-slate-400" download>
                      Download
                    </a>
                  </div>
                </div>
                <div className="relative flex h-full w-[78%] flex-row items-center justify-center border px-4">
                  <div className="w-full">
                    <p className="mb-1 text-sm font-medium text-slate-400">
                      Name
                    </p>
                    <p className="inline-flex w-full rounded bg-slate-200 px-2 py-1 text-sm font-medium text-slate-400">
                      {imgPreview.name}
                    </p>
                  </div>
                  <div className=" absolute right-4 top-2 h-5 w-5">
                    <X
                      size={18}
                      onClick={()=> setImgPreview(null)}
                      className="cursor-pointer text-slate-400 hover:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative mb-2 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border-[3px] border-dashed border-atlantis-200 bg-atlantis-100 text-sm font-medium">
                <Plus className="rounded-full border border-atlantis-200 text-atlantis-900 shadow-md" />
                <span className="inline-flex text-atlantis-900">
                  Click to upload media | JPG, JPEG, or PNG
                </span>
              </div>
            )}
             <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              accept="image/jpg image/png image/jpg"
              className="sr-only"
            />
          </label>
          <div>
            <label htmlFor="availability" className="mb-2 text-sm font-medium">
              Availability
            </label>

            <AvailabilityPicker
              value={formInput.availability}
              onChange={handleAvailabilityChange}
            />
          </div>
          <button
            className="inline-flex h-12 w-auto min-w-[8rem] justify-center rounded-md bg-atlantis-600 px-6 py-2 font-medium text-white hover:bg-atlantis-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mx-auto mt-8 px-5">
        {/* add table here */}
        <div className="grid grid-cols-4 gap-4">
          {cookingClasses?.map((cookingClass) => (
            <div
              key={cookingClass.id}
              className="relative rounded-md border shadow-md"
            >
              <button
                onClick={() =>
                  handleDelete(cookingClass.imageUrl, cookingClass.id)
                }
                className="absolute right-0 top-0 m-2 rounded-full bg-red-500 transition-colors duration-300 hover:bg-red-600"
              >
                <Trash size={20} className="p-1 text-white" />
              </button>
              {/* <Image
                  src={cookingClass.imageUrl}
                  alt={cookingClass.title}
                  width={350}
                  height={200}
                  className="rounded-t-md"
                /> */}
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

export default index;
