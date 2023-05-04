import * as React from 'react';
import { useGetAllProducts} from '../../hooks/useProducts';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../components/table';
import Button from '../../components/button';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('name', {
        header: 'Name'
    }),
    columnHelper.accessor('manufacturer', {
        header: 'Manufacturer'
    }),
    columnHelper.accessor('style', {
        header: 'Style'
    }),
    columnHelper.accessor('purchase_price', {
        header: 'Purchase price'
    }),
    columnHelper.accessor('sale_price', {
        header: 'Sale price'
    }),
    columnHelper.accessor('qty_on_hand', {
        header: 'Qty on hand'
    }),
    columnHelper.accessor('commission_percentage', {
        header: 'Commission percentage'
    }),
    columnHelper.accessor('actions', {
        header: 'Actions',
        cell: (info) => {

            const {id} = info.row.original;
            return (
                <div className="flex gap-x-3 ">
                 <Link to={`/products/${id}/edit`} >
                 <Button
                      label=""
                      icon={<PencilSquareIcon />}
                      buttonType={'icon'}
                    />
                 </Link>
                 
   
                  
                    
                 
                </div>
              );
        }
    }),
];

export default function Products() {
    const {data, isLoading, isError, error, isSuccess} = useGetAllProducts();
   if(isLoading) {
    return(
        <div>Loading Data</div>
    );
   }
    return(
        <div className="px-4 sm:px-6 lg:px-8 mt-5">
            <h3 className="text-2xl font-semibold leading-6 text-primary-500">
            Products
          </h3>
          <Table data={data} columns={columns} />
        </div>
       
    );
}