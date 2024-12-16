import { useQuery } from "@tanstack/react-query";
import { client } from "./axios";

export type GetTimeResponse = { duration: Date };

export async function getTime() {
  const response = await client.get<GetTimeResponse>("/", {
    withCredentials: true,
  });
  return response.data;
}

export type GetTimeQueryProps = {
  toggle: boolean;
};

export function useGetTimeQuery({ toggle }: GetTimeQueryProps) {
  return useQuery({
    queryKey: ["getTime"],
    queryFn: () => getTime(),
    enabled: toggle === true,
    staleTime: 0,
  });
}
