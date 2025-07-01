import { useQuery } from "@tanstack/react-query";
import key from "../../key.json";
import { dayTemperature,ForecastApiResponse } from "../types/temperature";

export function useTemperature(locationKey: string | undefined) {
    return useQuery<dayTemperature>({
        queryKey: ["temperature", locationKey],
        enabled: !!locationKey,
        refetchInterval: 60000, // Atualiza a cada 60 segundos (1 minuto)
        queryFn: async () => {
            const res = await fetch(
                `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${key.apiKey}&language=pt-br&metric=true`
            );
            if (!res.ok) throw new Error("Erro ao buscar locationKey");
            const data: ForecastApiResponse = await res.json();
            return {
                max: data.DailyForecasts[0].Temperature.Maximum.Value,
                min: data.DailyForecasts[0].Temperature.Minimum.Value,
                currentCondition: data.DailyForecasts[0].Day.IconPhrase,
            };
        },
    });
}
