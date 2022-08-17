import archivesJSON from "../archives.json";
import { Archive } from "../model/archive";

export function getArchives() {
  return archivesJSON.archives as Archive[];
}

export function getArchive(network: string) {
  let archive = getArchives().find((archive) => archive.network === network);

  if (!archive) {
    throw new Error(`Archive for network '${network} not found`);
  }

  return archive;
}
