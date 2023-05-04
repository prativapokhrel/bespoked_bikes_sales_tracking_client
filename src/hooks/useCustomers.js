import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import doFetch from "../utils/fetchWrapper";

const getAllCustomers = async () => {
    const response = await doFetch({
        url: '/customers'
    });

    return response;
}

const getCustomerById = async (id) => {
    const response = await doFetch({
        url: `/customers/${id}`
    });

    return response;
}

const editCustomer = async (data) => {
const response = await doFetch({
    url: `/customers/${data.id}`,
    method: 'PUT',
    payload: data
});
return response;
}

export const useGetAllCustomers = () => {
return useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers()
})
}

export const useGetCutomerById = (id) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => getCustomerById(id),
        enabled: !!id
    })
    }

    export const useEditCustomer = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => editCustomer(data),
            onSuccess: () => queryClient.invalidateQueries(['customers'])
        })
    }