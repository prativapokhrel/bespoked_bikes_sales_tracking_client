import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import doFetch from "../utils/fetchWrapper";


const getAllSales = async (data) => {
    let url = "/sales";
    if (data && data.from_date && data.to_date) {
        url += `?from_date=${data.from_date}&to_date=${data.to_date}`;
    }

    const response = await doFetch({ url });

    return response;
}


const getSaleById = async (id) => {
    const response = await doFetch({
        url: `/sales/${id}`
    });

    return response;
}

const editSale = async (data) => {
const response = await doFetch({
    url: `/sales/${data.id}`,
    method: 'PUT',
    payload: data
});
return response;
}

const createSale = async (data) => {
    const response = await doFetch({
        url: `/sales/${data.id}`,
        method: 'POST',
        payload: data
    });
    return response;
    }

export const useGetAllSales = (data) => {
    return useQuery({
        queryKey: ['sales', data.start_date, data.to_date],
        queryFn: () => getAllSales(data),
        //enabled: !!data.to_date 
    })
    }

export const useGetSaleById = (id) => {
    return useQuery({
        queryKey: ['sale', id],
        queryFn: () => getSaleById(id),
        enabled: !!id 
    })
    }

    export const useEditSale = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => editSale(data),
            onSuccess: () => queryClient.invalidateQueries(['sales'])
        })
    }
    export const useCreateSale = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => createSale(data),
            onSuccess: () => queryClient.invalidateQueries(['sales'])
        })
    }