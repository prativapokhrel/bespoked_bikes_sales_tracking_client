import * as React from "react";
import { useGetAllSalespeople } from "../../hooks/useSalespeople";
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
    header: "Last name",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
  }),
  columnHelper.accessor("start_date", {
    header: "Start date",
  }),
  columnHelper.accessor("termination_date", {
    header: "Termination date",
  }),
  columnHelper.accessor("manager_id", {
    header: "Manager id",
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: (info) => {
      const { id } = info.row.original;
      return (
        <div className="flex gap-x-3 ">
          <Link to={`/salespeople/${id}/edit`}>
            <Button label="" icon={<PencilSquareIcon />} buttonType={"icon"} />
          </Link>
        </div>
      );
    },
  }),
];

export default function Salespeople() {
  const { data, isLoading } = useGetAllSalespeople();
  if (isLoading) {
    return <div>Loading Data</div>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5">
      <h3 className="text-2xl font-semibold leading-6 text-primary-500">
        Salespeople
      </h3>
      <Table data={data} columns={columns} />
    </div>
  );
}
