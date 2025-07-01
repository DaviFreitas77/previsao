
export interface ForestApiResponse {
    DailyForecasts: {
        Date: string;
        Temperature: {
            Minimum: {
                Value: number;
            };
            Maximum: {
                Value: number;
            };
        };
        Day:{
            Icon:number
        }
    }[];

}

export interface ForestTemperature {
    Date: string,
    Minimum: number,
    Maximum: number,
    Icon:number
}