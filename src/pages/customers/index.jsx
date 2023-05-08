import * as React from "react";
import { useGetAllCustomers } from "../../hooks/useCustomers";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/table";
import Button from "../../components/button";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("first_name", {
    header: "First Name",
  }),
  columnHelper.accessor("last_name", {
    header: "Last Name",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
  }),
  columnHelper.accessor("start_date", {
    header: "Start Date",
  }),

  columnHelper.accessor("actions", {
    header: "Actions",
    cell: (info) => {
      const { id } = info.row.original;
      return (
        <div className="flex gap-x-3 ">
          <Link to={`/customers/${id}/edit`}>
            <Button label="" icon={<PencilSquareIcon />} buttonType={"icon"} />
          </Link>
        </div>
      );
    },
  }),
];

export default function Customers() {
  const { data, isLoading } = useGetAllCustomers();
  if (isLoading) {
    return <div>Loading Data</div>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5">
      <h3 className="text-2xl font-semibold leading-6 text-primary-500">
        Customers
      </h3>
      <Table data={data} columns={columns} />
    </div>
  );
}
