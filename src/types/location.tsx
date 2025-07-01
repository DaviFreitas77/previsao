export interface latLon {
  latitude: number,
  longitude: number
}

export interface LocationKeyResponse {
  Key: string;
  LocalizedName: string;
  cityName: string
}

export interface apiLocalizedResponse {
  LocalizedName: string,
  Key: string
  AdministrativeArea: {
    LocalizedName: string
  }
}