import { getArchive } from "../services/archivesService";

export async function fetchGraphql(
  network: string,
  query: string,
  variables: object = {}
) {
  const archive = getArchive(network);

  let results = await fetch(archive.providers[0].explorerUrl, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables,
    }),
  });

  let jsonResult = await results.json();
  return jsonResult.data;
}
