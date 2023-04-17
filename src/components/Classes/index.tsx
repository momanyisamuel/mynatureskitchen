import { FC } from "react";
import Table from "../Table";

interface indexProps {}

const columns = [
  { key: "title", title: "Class Title" },
  { key: "description", title: "Description" },
  { key: "product", title: "Product" }
];

const data = [{ title: "Title", description: "Description", product: "Product" },]

const index: FC<indexProps> = ({}) => {
  return (
    <div className="mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2">
          <input type="text" name="title" id="" />
          <input type="text" name="description" id="" />
          <select name="" id="">
            <option value="">cooking program</option>
            <option value="">cooking program</option>
            <option value="">cooking program</option>
          </select>
          <button className="inline-flex bg-blue-600 px-2 py-3" type="button">
            Create class
          </button>
        </div>
      </div>
      <div className="mx-auto container mt-8">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default index;
