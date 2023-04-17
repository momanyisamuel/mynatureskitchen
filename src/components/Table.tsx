import React, { useState } from "react";
import { Trash2Icon, ExternalLink, Edit, X } from "lucide-react";

const Table = ({ data, columns }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Filter data based on search term
  const filteredData = data.filter((item: any) =>
    Object.values(item).some(
      (value: any) =>
        value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  );

  // Calculate indexes of items to show on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(parseInt(event.target.value));
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full border p-1">
      <div className="flex justify-between mb-2 border p-1">
        <div className="flex items-center w-2/6">
          <label className="hidden">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search.."
            className="input-text"
          />
        </div>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="border-b bg-slate-100">
            <th className="whitespace-nowrap w-[1%] mr-0 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">
              #
            </th>
            {columns.map((column: any) => (
              <th
                key={column.title}
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border"
              >
                {column.title}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item: any, index: any) => (
            <tr key={index} className="border-b">
              <td className="whitespace-nowrap w-[1%] mr-0 px-4 py-2 text-gray-700 border">
                {startIndex + index + 1}
              </td>
              {columns.map((column: any) => (
                <td
                  key={column.key}
                  className="px-4 py-2 text-gray-700 text-left align-top border text-sm font-base"
                >
                  {item[column.key]}
                </td>
              ))}
              <td className="px-2 py-2 text-gray-700 text-right whitespace-nowrap w-[1%]">
                <div className="flex gap-2 justify-end items-center">
                  <a
                    href=""
                    className="bg-gray-200 text-gray-500 inline-flex text-right border p-1 text-sm font-base"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href=""
                    className="bg-green-100 text-green-400  inline-flex text-right border p-1 text-sm font-base"
                  >
                    <Edit size={18} />
                  </a>
                  <a
                    href={`/settings/${item._id}`}
                    className="bg-red-100 text-red-400 inline-flex text-right border p-1 text-sm font-base"
                  >
                    <X size={18} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-2 border p-1">
        <div className="flex items-center w-1/6 text-sm">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="input-select w-2/6"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <label className="ml-2 inline-flex w-4/6">items per page</label>
        </div>
        <div className="flex items-center text-sm">
          <label className="text-gray-500 ml-0  leading-tight py-2 px-3">
            Page
          </label>
          <select
            value={currentPage}
            onChange={handlePageChange}
            className="input-select"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label className="ml-2 text-gray-500 leading-tight py-2 pl-2">
            of
            <span className="pl-2">{totalPages}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Table;