import { useQuery } from "@tanstack/react-query";
import key from '../../key.json'
import { ForestApiResponse, ForestTemperature } from "../types/forest";
export default function useForecast(locationKey: string | undefined) {
    return (
        useQuery<ForestTemperature[]>({
            queryKey: ['Forecast',locationKey],
            enabled: !!locationKey, 
            queryFn: async () => {
                const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${key.apiKey}&language=pt-br&metric=true`)

                const data: ForestApiResponse = await response.json()
            
                return data.DailyForecasts.map(day => ({
                    Date: day.Date,
                    Minimum: day.Temperature.Minimum.Value,
                    Maximum: day.Temperature.Maximum.Value,
                    Icon: day.Day.Icon
                
                }));

            }
        })
    )
}