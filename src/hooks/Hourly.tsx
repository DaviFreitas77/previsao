import { useQuery } from "@tanstack/react-query";
import key from '../../key.json'
import { HourlyApiResponse, HourlyTemperature } from "../types/hourTemperature";
//de hora em hora 12 horas total
export default function useHourly(locationKey: string | undefined) {
    return (
        useQuery<HourlyTemperature[]>({
            queryKey: ['hourTemperature', locationKey],
            enabled: !!locationKey,
            refetchInterval: 60000,
            queryFn: async () => {
                const res = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${key.apiKey}&language=pt-br&metric=true`)

                const data: HourlyApiResponse[] = await res.json()
                const filteredData = data.map(hour => ({
                    DateTime: hour.DateTime,
                    ProbabilityRain: hour.PrecipitationProbability,
                    Temperature: hour.Temperature.Value,
                    WeatherIcon: hour.WeatherIcon

                }))
                return filteredData;

            }
        })
    )
}