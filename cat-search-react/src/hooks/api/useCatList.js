import { useQuery } from "react-query";

import CatService from "../../service/api/cat";
import SessionStorage from "../../utils/sessionStorage";

export const useCatList = (keyword) =>
  useQuery(["cats", keyword], () => CatService.list(keyword), {
    enabled: !!keyword,
    onSuccess: (res) => {
      SessionStorage.setLastResult(res.data);
    },
    onError: (error) => {
      alert(`에러가 발생했습니다. ${error}`);
    },
  });
