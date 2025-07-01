import { useQuery } from "@tanstack/react-query";
import key from "../../key.json";
import { LocationKeyResponse, apiLocalizedResponse } from '../types/location'

export function useLocationKey(location: { latitude: number; longitude: number } | null) {
  return useQuery<LocationKeyResponse>({
    queryKey: ["locationKey", location],
    enabled: !!location,
    queryFn: async () => {
      const res = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key.apiKey}&q=${location?.latitude},${location?.longitude}`
      );
      if (!res.ok) throw new Error("Erro ao buscar locationKey");
      const data: apiLocalizedResponse = await res.json()
      return {
        Key: data.Key,
        LocalizedName: data.LocalizedName,
        cityName: data.AdministrativeArea.LocalizedName
      };
    },
  });
}
