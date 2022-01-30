import { useQuery } from "react-query";

import CatService from "../../service/api/cat";

export const useCatDetail = (id) =>
  useQuery(["cat", id], () => CatService.read(id), {
    enabled: !!id,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
