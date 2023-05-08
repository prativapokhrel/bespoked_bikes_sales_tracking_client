import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import doFetch from "../utils/fetchWrapper";

const getAllSalespeople = async () => {
  const response = await doFetch({
    url: "/salespeople",
  });

  return response;
};

const getSalespersonById = async (id) => {
  const response = await doFetch({
    url: `/salespeople/${id}`,
  });

  return response;
};

const editSalesperson = async (data) => {
  const response = await doFetch({
    url: `/salespeople/${data.id}`,
    method: "PUT",
    payload: data,
  });
  return response;
};

export const useGetAllSalespeople = () => {
  return useQuery({
    queryKey: ["salespeople"],
    queryFn: () => getAllSalespeople(),
  });
};

export const useGetSalespersonById = (id) => {
  return useQuery({
    queryKey: ["salesperson", id],
    queryFn: () => getSalespersonById(id),
    enabled: !!id,
  });
};

export const useEditSalesperson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => editSalesperson(data),
    onSuccess: () => queryClient.invalidateQueries(["salespeople"]),
  });
};
