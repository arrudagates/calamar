import { fetchGraphql } from "../utils/fetchGraphql";

export type CallsFilter = any;

export async function getCall(network: string, filter?: CallsFilter) {
  const calls = await getCalls(network, 1, 0, filter);
  return calls?.[0];
}

export async function getCalls(
  network: string,
  limit: Number,
  offset: Number,
  filter?: CallsFilter
) {
  const response = await fetchGraphql(
    network,
    `query ($limit: Int!, $offset: Int!, $filter: CallWhereInput) {
      calls(limit: $limit, offset: $offset, where: $filter) {
        id
        name
      }
    }`,
    {
      limit,
      offset,
      filter,
    }
  );

  return response?.calls;
}
