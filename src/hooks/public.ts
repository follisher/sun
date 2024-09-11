import { useState } from "react";
import { publicApi } from "../apis/public";

export const useCities = () => {
  const [cities, setCities] = useState<CitiesResult[]>([]);
  async function getCities() {
    const { data } = await publicApi().getCities();
    setCities(data);
  }
  return {
    getCities,
    cities,
  };
};
