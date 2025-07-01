export interface dayTemperature {
  max: number,
  min: number,
  currentCondition: string
}
export interface ForecastApiResponse {
  DailyForecasts: {
    Temperature: {
      Minimum: { Value: number };
      Maximum: { Value: number };
    };
    Day: {
      IconPhrase: string;
    };
  }[]
}

export interface currentApiResponse {
  WeatherText: string //ensolarado,chuvoso etc
  Temperature: {
    Metric: {
      Value: number //temperatura atual ex:25 "graus"
    }
  },
  RelativeHumidity: number, //humidade
  Wind: {
    Speed: {
      Metric: {
        Value: number;  //vento
      }
    }
  }
  PrecipitationSummary: {
    PastHour: { //chuva
      Metric: {
        Value: number
      }
    }
  },
  Pressure:{
    Metric:{
      Value:number
    }
  }


}

export interface currentTemperature {
  current: number,
  currentDescription: string,
  humidity: number,//humidade
  windSpeed: number, //vento
  rain: number, //chuva
  Pressure:number //pressão
}