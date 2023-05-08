import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";
export default function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getPageCount,
    getState,
  } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                {getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="divide-x divide-gray-200 "
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-800"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "group inline-flex cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <span className="ml-2 flex-none items-center rounded text-gray-900">
                                  <ArrowUpIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ),
                              desc: (
                                <span className="ml-2 flex-none items-center rounded text-gray-900">
                                  <ArrowDownIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ),
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {getRowModel().rows.length ? (
                  getRowModel().rows.map((row, idx) => {
                    return (
                      <tr
                        key={row.id}
                        className={clsx(
                          "divide-x divide-gray-200",
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900"
                      colSpan={3}
                    >
                      No Data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Page{" "}
                  <span className="font-medium">
                    {getState().pagination.pageIndex + 1}
                  </span>{" "}
                  of <span className="font-medium">{getPageCount()}</span>
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button
                  disabled={!getCanPreviousPage()}
                  onClick={() => previousPage()}
                  className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={!getCanNextPage()}
                  onClick={() => nextPage()}
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
