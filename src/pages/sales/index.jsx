import React, { useState } from 'react';
import { useGetAllSales } from '../../hooks/useSales';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../components/table';
import Button from '../../components/button';
import Input from '../../components/input';
import {PencilSquareIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('product.name', {
        header: 'Product'
    }),
    columnHelper.accessor('salesperson', {
        header: 'Salesperson',
        cell: (info) => {
            const { first_name, last_name } = info.row.original.salesperson;
            const fullName = `${first_name} ${last_name}`;
            return fullName;
        }
    }),
    columnHelper.accessor('customer', {
        header: 'Customer',
        cell: (info) => {
            const { first_name, last_name } = info.row.original.customer;
            const fullName = `${first_name} ${last_name}`;
            return fullName;
        }
    }),
    columnHelper.accessor('sales_date', {
        header: 'Sales Date'
    }),
    columnHelper.accessor('salesperson_commission', {
        header: 'Salesperson Commission'
    }),
    columnHelper.accessor('discounted_price', {
        header: 'Final Selling Price'
    }),

    columnHelper.accessor('actions', {
        header: 'Actions',
        cell: (info) => {

            const {id} = info.row.original;
            return (
                <div className="flex gap-x-3 ">
                 <Link to={`/sales/${id}/edit`} >
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

export default function Sales() {
    const [date, setDate] = useState({
        from_date: '',
        to_date: ''
    })
    const {data, isLoading} = useGetAllSales(date);
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDate({...date, [name]: value});
      }

   if(isLoading) {
    return(
        <div>Loading Data</div>
    );
   }

    return(
        <div className="px-4 sm:px-6 lg:px-8 mt-5">
            <h3 className="text-2xl font-semibold leading-6 text-primary-500">
                Sales
            </h3>
            <div className="flex gap-4 items-center">
                <div>
                    <Input type="date" name="from_date" label="Start Date" value={date.from_date} onChange={handleInputChange} />
                </div>
                <div>
                    <Input type="date" name="to_date" label="End Date" value={date.to_date} onChange={handleInputChange} />
                </div>
                <div className="ml-auto">
                    <Link to="/sales/new">
                        <Button label="Add Sales" />
                    </Link>
                </div>
            </div>
            <Table data={data} columns={columns} />
        </div>
    );
    
}