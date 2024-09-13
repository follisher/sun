import { useState } from "react";
import { publicApi } from "../apis/public";
import { FetchState } from "../main";

export const useCities = () => {
  const [cities, setCities] = useState<CitiesResult[]>([]);
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function getCities() {
    setFetchState(FetchState.Processing);
    publicApi()
      .getCities()
      .then(({ data }) => {
        setFetchState(FetchState.Success);
        setCities(data);
      })
      .catch(() => {
        setFetchState(FetchState.Fail);
      });
  }
  return {
    getCities,
    cities,
    fetchState,
  };
};
