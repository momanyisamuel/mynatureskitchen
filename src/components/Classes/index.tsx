import { ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/constants/config";
import { api } from "@/utils/api";
import { Plus, Trash } from "lucide-react";
import { AvailabilityPicker } from "../AvailabilityPicker";

interface indexProps {}

type Availability = { startDate: string; endDate: string };

interface CookingClass {
  title: string;
  description: string;
  product: string;
  file: undefined | File;
  availability: Availability[];
}

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
  const [formInput, setformInput] = useState<CookingClass>(initialData);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutateAsync: createImgUrl } =
    api.admin.createPresignedUrl.useMutation();
  const { mutateAsync: addCookingClass } =
    api.admin.addCookingClass.useMutation();
  const { data: cookingClasses, refetch } =
    api.cookingClass.getClasses.useQuery();
  const { mutateAsync: deleteCookingClass } =
    api.admin.deleteCookingClass.useMutation();

  console.log(cookingClasses);

  useEffect(() => {
    if (!formInput.file) return;
    const objectUrl = URL.createObjectURL(formInput.file);
    setPreview(objectUrl);

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
    console.log("newValue:", newValue);
    setformInput((prev) => ({
      ...prev,
      availability: newValue,
    }));
  };

  const handleImageUpload = async () => {
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

    console.log(res.url);

    return { key: key, url: res.url };
  };

  const handleSubmit = async () => {
    console.log("submitted");
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

    setPreview("");
  };

  const handleDelete = async (imageUrl: string, id: string) => {
    await deleteCookingClass({ id, imageUrl });
    refetch();
  };

  return (
    <div className="mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2">
          <input type="text" name="title" id="" onChange={handleChange} />
          <input type="text" name="description" id="" onChange={handleChange} />
          <select name="product" id="" onChange={handleSelectChange}>
            <option value="cooking program">cooking program</option>
            <option value="cooking program">cooking program</option>
            <option value="cooking program">cooking program</option>
          </select>
          <label
            htmlFor="file"
            className="relative h-12 cursor-pointer rounded-sm bg-gray-200 text-sm font-medium"
          >
            <span className="sr-only">File input</span>
            <div className="flex h-full items-center justify-center">
              {preview ? (
                <div className="">
                  <Image
                    alt="preview"
                    style={{ objectFit: "contain" }}
                    fill
                    src={preview}
                  />
                </div>
              ) : (
                <span>Select Image</span>
              )}
            </div>
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
            <label htmlFor="availability" className="text-sm font-medium">
              Availability
            </label>
            
            <AvailabilityPicker
              value={formInput.availability}
              onChange={handleAvailabilityChange}
            />
          </div>
          <button
            className="inline-flex h-12 w-auto min-w-[8rem] justify-center rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        {/* add table here */}

        <div className="grid grid-cols-4 gap-4">
          {cookingClasses?.map((cookingClass) => (
            <div className="relative rounded-md border shadow-md">
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
