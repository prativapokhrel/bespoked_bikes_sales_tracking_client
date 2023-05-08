import { useQuery } from "@tanstack/react-query";

import doFetch from "../utils/fetchWrapper";

const getAllCommissions = async (data) => {
  const response = await doFetch({
    url: `/quarterly_commission_report?quarter=${data.quarter}&year=${data.year}`,
  });

  return response;
};

export const useGetAllCommissions = (data) => {
  return useQuery({
    queryKey: ["commissions", data.quarter, data.year],
    queryFn: () => getAllCommissions(data),
  });
};
