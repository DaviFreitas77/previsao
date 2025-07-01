export interface HourlyApiResponse{
    DateTime:string,
    WeatherIcon:number
    Temperature:{
        Value:number
    },
    PrecipitationProbability:number
}

export interface HourlyTemperature{
    DateTime:string,
    Temperature:number,
   ProbabilityRain:number
   WeatherIcon:number
}