import { useQuery } from "@tanstack/react-query";
import { client } from "./axios";
import { GET_TIME_QUERY_KEY } from "@/shared/constants/query";

export type GetTimeResponse = { duration: string };

export async function getTime() {
  const response = await client.get<GetTimeResponse>("/");
  return response.data;
}

export type GetTimeQueryProps = {
  toggle: boolean;
};

export function useGetTimeQuery({ toggle }: GetTimeQueryProps) {
  return useQuery({
    queryKey: [GET_TIME_QUERY_KEY],
    queryFn: () => getTime(),
    enabled: toggle === true,
  });
}
