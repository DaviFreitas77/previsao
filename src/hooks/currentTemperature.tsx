import { useQuery } from "@tanstack/react-query";
import key from "../../key.json";
import { currentTemperature, currentApiResponse } from "../types/temperature";

export function useCurrentTemperature(locationKey: string | undefined) {
    return useQuery<currentTemperature>({
        queryKey: ["CurrentTemperature", locationKey],
        enabled: !!locationKey,
        refetchInterval: 60000,
        queryFn: async () => {
            const res = await fetch(
                `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key.apiKey}&language=pt-br&metric=true&details=true`
            );
            if (!res.ok) throw new Error("Erro ao buscar locationKey");
            const data: currentApiResponse[] = await res.json()
            return {
                current: data[0].Temperature.Metric.Value,
                currentDescription: data[0].WeatherText,
                humidity: data[0].RelativeHumidity,
                windSpeed: data[0].Wind.Speed.Metric.Value,
                rain:data[0].PrecipitationSummary.PastHour.Metric.Value,
                Pressure: data[0].Pressure.Metric.Value // Corrigido com P maiúsculo
                
            };
        },
    });
}