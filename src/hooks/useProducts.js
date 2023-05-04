import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import doFetch from "../utils/fetchWrapper";

const getAllProducts = async () => {
    const response = await doFetch({
        url: '/products'
    });

    return response;
}

const getProductById = async (id) => {
    const response = await doFetch({
        url: `/products/${id}`
    });

    return response;
}

const editProduct = async (data) => {
const response = await doFetch({
    url: `/products/${data.id}`,
    method: 'PUT',
    payload: data
});
return response;
}

export const useGetAllProducts = () => {
return useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts()
})
}

export const useGetProductById = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        enabled: !!id
    })
    }

    export const useEditProduct = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => editProduct(data),
            onSuccess: () => queryClient.invalidateQueries(['products'])
        })
    }