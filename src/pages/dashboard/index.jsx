import React, { useState } from 'react';
import { useGetAllCommissions } from '../../hooks/useCommissions';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../components/table';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('name', {
        header: 'Name'
    }),
    columnHelper.accessor('quarterly_commission', {
        header: 'Quarterly Commission'
    }),
    columnHelper.accessor('total_sales', {
        header: 'Total Sales'
    }),
];

export default function Dashboard() {
      
    const [params, setParams] = useState({
        quarter: "Q2",
        year: 2023
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParams({...params, [name]: value});
      }
    const {data, isLoading } = useGetAllCommissions(params);
 
    
    const quarterOptions = [
        { label: 'Q1', value: 'Q1' },
        { label: 'Q2', value: 'Q2' },
        { label: 'Q3', value: 'Q3' },
        { label: 'Q4', value: 'Q4' }
      ];
    
      const yearOptions = [
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' }
      ];
    
   if(isLoading) {
    return(
        <div>Loading Data</div>
    );
   }
    return(
        <div className="px-4 sm:px-6 lg:px-8 mt-5">
            <h3 className="text-2xl font-semibold leading-6 text-primary-500">
                Quarterly Commission Report
            </h3>
            <div className='my-10'>
                <div className="flex gap-2 items-center">
                    <div>
                        <select
                            id="quarter"
                                name="quarter"
                                value={params.quarter}
                                onChange={handleInputChange}
                            >
                            {quarterOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                <div>
                <div className="">
                    <select
                        id="year"
                        name="year"
                        value={params.year}
                        onChange={handleInputChange}
                    >
                        {yearOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
              </div>
            </div>
                
            </div>
          <Table data={data} columns={columns} />
        </div>
       
    );
}