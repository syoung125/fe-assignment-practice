import { useQuery } from "react-query";

import CatService from "../../service/api/cat";

export const useRandomCatList = (key, options) =>
  useQuery(key, CatService.randomList, {
    onError: (error) => {
      alert(`에러가 발생했습니다. ${error}`);
    },
    ...options,
  });
