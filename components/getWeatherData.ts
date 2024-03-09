import { CurrentHighlightsState } from "@/redux/slices/currentHighlightsSlice";
import { CurrentWeatherState } from "@/redux/slices/currentWeatherSlice";

const apiKey = "109cee50ffade3b275fc8f7614964113"
const unsplashKey = "x-lULc5fr9SgzqWB9wbnr9Fos2g2jr6CG5y_HNe7N7g"

const getAddressByCode = async(latitude:number,longitude:number) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const data = await response.json();
    return data[0].name;
  } catch (error) {
    console.log(error);
    return "Couldn't find city";
  }
}

export const getAddressByName = async(name:string) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${apiKey}`);
      const data = await response.json();
      if(data.length>0){
          const weatherData = await getWeather(data[0].lat,data[0].lon)
          return weatherData
      }
    } catch (error) {
      console.log(error);
      return {};
    }
}

export const getImageByName = async(name:string) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashKey}&query=${name} city`);
      const data = await response.json();
      return data.results[0].urls.raw;
    } catch (error) {
      console.log(error);
      return "Couldn't find city";
    }
}

export const getWeatherIconByName = (name:string) => {
  switch(name) {
    case "Thunderstorm":
      return "/weatherIcons/thunder.svg"
    case "Drizzle":
      return "/weatherIcons/rainy-4.svg"
    case "Rain":
      return "/weatherIcons/rainy-6.svg"
    case "Snow":
      return "/weatherIcons/snowy-6.svg"
    case "Clouds":
      return "/weatherIcons/cloudy.svg"
    default:
      return "/weatherIcons/day.svg"
  }
}

const getAQI = async(latitude:number,longitude:number) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      const data = await response.json();
      return data.list[0].main.aqi
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

export const getWeather = async(latitude:number,longitude:number) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      const data = await response.json();
      let city = await getAddressByCode(latitude,longitude)
      let currentWeather:CurrentWeatherState = {
        location:city,
        temperature:data.current.temp,
        status:data.current.weather[0].main,
        humidity:data.current.humidity,
        image:await getImageByName(city)
      }
      let currentHighlights:CurrentHighlightsState = {
        uvIndex:data.current.uvi,
        windSpeed:data.current.wind_speed,
        windDirection:data.current.wind_deg,
        sunrise:data.current.sunrise,
        sunset:data.current.sunset,
        humidity:data.current.humidity,
        visibility:data.current.visibility,
        airQuality: await getAQI(latitude,longitude)
      }
      let days = {}
      data.daily.slice(0,7).forEach((day:any,index:number) => {
        (days as any)["day"+index] = {
          day:day.dt,
          status:day.weather[0].main,
          maxTemp:day.temp.max,
          minTemp:day.temp.min
        }
      });
      return {currentWeather,currentHighlights,days}
    } catch (error) {
      console.log(error);
      return {};
    }
}

// export const getTestRes = async(latitude:number,longitude:number) => {
//   const data = {
//     "lat": 18.4442,
//     "lon": 73.7991,
//     "timezone": "Asia/Kolkata",
//     "timezone_offset": 19800,
//     "current": {
//         "dt": 1709969943,
//         "sunrise": 1709947068,
//         "sunset": 1709989983,
//         "temp": 306.47,
//         "feels_like": 304.09,
//         "pressure": 1011,
//         "humidity": 14,
//         "dew_point": 275.38,
//         "uvi": 11.14,
//         "clouds": 19,
//         "visibility": 10000,
//         "wind_speed": 1.49,
//         "wind_deg": 8,
//         "wind_gust": 4.57,
//         "weather": [
//             {
//                 "id": 801,
//                 "main": "Clouds",
//                 "description": "few clouds",
//                 "icon": "02d"
//             }
//         ]
//     },
//     "minutely": [
//         {
//             "dt": 1709970000,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970060,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970120,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970180,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970240,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970300,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970360,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970420,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970480,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970540,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970600,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970660,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970720,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970780,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970840,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970900,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709970960,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971020,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971080,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971140,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971200,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971260,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971320,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971380,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971440,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971500,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971560,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971620,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971680,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971740,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971800,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971860,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971920,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709971980,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972040,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972100,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972160,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972220,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972280,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972340,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972400,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972460,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972520,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972580,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972640,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972700,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972760,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972820,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972880,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709972940,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973000,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973060,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973120,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973180,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973240,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973300,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973360,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973420,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973480,
//             "precipitation": 0
//         },
//         {
//             "dt": 1709973540,
//             "precipitation": 0
//         }
//     ],
//     "hourly": [
//         {
//             "dt": 1709967600,
//             "temp": 306.26,
//             "feels_like": 303.93,
//             "pressure": 1011,
//             "humidity": 15,
//             "dew_point": 276.18,
//             "uvi": 11.98,
//             "clouds": 17,
//             "visibility": 10000,
//             "wind_speed": 1.4,
//             "wind_deg": 76,
//             "wind_gust": 3.66,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709971200,
//             "temp": 306.47,
//             "feels_like": 304.09,
//             "pressure": 1011,
//             "humidity": 14,
//             "dew_point": 275.38,
//             "uvi": 11.14,
//             "clouds": 19,
//             "visibility": 10000,
//             "wind_speed": 1.49,
//             "wind_deg": 8,
//             "wind_gust": 4.57,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709974800,
//             "temp": 306.68,
//             "feels_like": 304.25,
//             "pressure": 1011,
//             "humidity": 13,
//             "dew_point": 274.51,
//             "uvi": 8.57,
//             "clouds": 23,
//             "visibility": 10000,
//             "wind_speed": 2.31,
//             "wind_deg": 326,
//             "wind_gust": 4.81,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709978400,
//             "temp": 307.09,
//             "feels_like": 304.62,
//             "pressure": 1010,
//             "humidity": 13,
//             "dew_point": 274.83,
//             "uvi": 5.14,
//             "clouds": 29,
//             "visibility": 10000,
//             "wind_speed": 3.6,
//             "wind_deg": 299,
//             "wind_gust": 4.74,
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709982000,
//             "temp": 307.1,
//             "feels_like": 304.63,
//             "pressure": 1010,
//             "humidity": 13,
//             "dew_point": 274.84,
//             "uvi": 2.21,
//             "clouds": 30,
//             "visibility": 10000,
//             "wind_speed": 5,
//             "wind_deg": 294,
//             "wind_gust": 4.31,
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709985600,
//             "temp": 306.17,
//             "feels_like": 303.82,
//             "pressure": 1010,
//             "humidity": 14,
//             "dew_point": 275.14,
//             "uvi": 0.54,
//             "clouds": 31,
//             "visibility": 10000,
//             "wind_speed": 6.41,
//             "wind_deg": 298,
//             "wind_gust": 5,
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709989200,
//             "temp": 303.53,
//             "feels_like": 301.67,
//             "pressure": 1011,
//             "humidity": 19,
//             "dew_point": 277.04,
//             "uvi": 0,
//             "clouds": 20,
//             "visibility": 10000,
//             "wind_speed": 6.01,
//             "wind_deg": 301,
//             "wind_gust": 8.83,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709992800,
//             "temp": 300.74,
//             "feels_like": 299.7,
//             "pressure": 1012,
//             "humidity": 23,
//             "dew_point": 277.86,
//             "uvi": 0,
//             "clouds": 11,
//             "visibility": 10000,
//             "wind_speed": 3.85,
//             "wind_deg": 296,
//             "wind_gust": 5.76,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1709996400,
//             "temp": 299.51,
//             "feels_like": 299.51,
//             "pressure": 1013,
//             "humidity": 26,
//             "dew_point": 278.2,
//             "uvi": 0,
//             "clouds": 8,
//             "visibility": 10000,
//             "wind_speed": 2.68,
//             "wind_deg": 288,
//             "wind_gust": 3.59,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710000000,
//             "temp": 298.66,
//             "feels_like": 297.97,
//             "pressure": 1014,
//             "humidity": 27,
//             "dew_point": 278.29,
//             "uvi": 0,
//             "clouds": 7,
//             "visibility": 10000,
//             "wind_speed": 2.23,
//             "wind_deg": 288,
//             "wind_gust": 2.8,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710003600,
//             "temp": 297.91,
//             "feels_like": 297.17,
//             "pressure": 1014,
//             "humidity": 28,
//             "dew_point": 278.14,
//             "uvi": 0,
//             "clouds": 5,
//             "visibility": 10000,
//             "wind_speed": 1.95,
//             "wind_deg": 288,
//             "wind_gust": 2.37,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710007200,
//             "temp": 297.38,
//             "feels_like": 296.62,
//             "pressure": 1014,
//             "humidity": 29,
//             "dew_point": 277.89,
//             "uvi": 0,
//             "clouds": 4,
//             "visibility": 10000,
//             "wind_speed": 1.5,
//             "wind_deg": 281,
//             "wind_gust": 1.93,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710010800,
//             "temp": 296.98,
//             "feels_like": 296.15,
//             "pressure": 1014,
//             "humidity": 28,
//             "dew_point": 277.44,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 1.48,
//             "wind_deg": 274,
//             "wind_gust": 1.76,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710014400,
//             "temp": 296.54,
//             "feels_like": 295.67,
//             "pressure": 1013,
//             "humidity": 28,
//             "dew_point": 276.84,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 1.76,
//             "wind_deg": 297,
//             "wind_gust": 1.91,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710018000,
//             "temp": 295.89,
//             "feels_like": 294.95,
//             "pressure": 1013,
//             "humidity": 28,
//             "dew_point": 276.29,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 1.6,
//             "wind_deg": 323,
//             "wind_gust": 1.68,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710021600,
//             "temp": 295.24,
//             "feels_like": 294.24,
//             "pressure": 1013,
//             "humidity": 28,
//             "dew_point": 275.87,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 1.21,
//             "wind_deg": 347,
//             "wind_gust": 1.32,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710025200,
//             "temp": 294.79,
//             "feels_like": 293.74,
//             "pressure": 1013,
//             "humidity": 28,
//             "dew_point": 275.42,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 1.05,
//             "wind_deg": 12,
//             "wind_gust": 1.22,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710028800,
//             "temp": 294.42,
//             "feels_like": 293.33,
//             "pressure": 1013,
//             "humidity": 28,
//             "dew_point": 275.05,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 0.73,
//             "wind_deg": 4,
//             "wind_gust": 1.12,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710032400,
//             "temp": 294.17,
//             "feels_like": 293.06,
//             "pressure": 1014,
//             "humidity": 28,
//             "dew_point": 274.52,
//             "uvi": 0,
//             "clouds": 2,
//             "visibility": 10000,
//             "wind_speed": 0.77,
//             "wind_deg": 344,
//             "wind_gust": 1.13,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710036000,
//             "temp": 295.31,
//             "feels_like": 294.26,
//             "pressure": 1015,
//             "humidity": 26,
//             "dew_point": 274.79,
//             "uvi": 0.38,
//             "clouds": 2,
//             "visibility": 10000,
//             "wind_speed": 0.83,
//             "wind_deg": 4,
//             "wind_gust": 1.01,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710039600,
//             "temp": 298.26,
//             "feels_like": 297.37,
//             "pressure": 1016,
//             "humidity": 21,
//             "dew_point": 274,
//             "uvi": 1.77,
//             "clouds": 3,
//             "visibility": 10000,
//             "wind_speed": 1.24,
//             "wind_deg": 22,
//             "wind_gust": 1.39,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710043200,
//             "temp": 300.85,
//             "feels_like": 299.62,
//             "pressure": 1016,
//             "humidity": 17,
//             "dew_point": 273.9,
//             "uvi": 4.43,
//             "clouds": 4,
//             "visibility": 10000,
//             "wind_speed": 1.34,
//             "wind_deg": 41,
//             "wind_gust": 1.26,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710046800,
//             "temp": 303.32,
//             "feels_like": 301.42,
//             "pressure": 1016,
//             "humidity": 15,
//             "dew_point": 273.96,
//             "uvi": 7.82,
//             "clouds": 3,
//             "visibility": 10000,
//             "wind_speed": 1.47,
//             "wind_deg": 77,
//             "wind_gust": 0.88,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710050400,
//             "temp": 305.37,
//             "feels_like": 303.11,
//             "pressure": 1015,
//             "humidity": 14,
//             "dew_point": 274.01,
//             "uvi": 10.77,
//             "clouds": 3,
//             "visibility": 10000,
//             "wind_speed": 0.86,
//             "wind_deg": 99,
//             "wind_gust": 1.77,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710054000,
//             "temp": 306.85,
//             "feels_like": 304.38,
//             "pressure": 1013,
//             "humidity": 12,
//             "dew_point": 274.1,
//             "uvi": 12.04,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 0.62,
//             "wind_deg": 101,
//             "wind_gust": 3.57,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710057600,
//             "temp": 307.77,
//             "feels_like": 305.2,
//             "pressure": 1012,
//             "humidity": 12,
//             "dew_point": 273.95,
//             "uvi": 11.17,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 0.24,
//             "wind_deg": 41,
//             "wind_gust": 4.06,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710061200,
//             "temp": 308.61,
//             "feels_like": 305.93,
//             "pressure": 1011,
//             "humidity": 11,
//             "dew_point": 273.48,
//             "uvi": 8.5,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.18,
//             "wind_deg": 276,
//             "wind_gust": 4.18,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710064800,
//             "temp": 308.79,
//             "feels_like": 306.05,
//             "pressure": 1010,
//             "humidity": 10,
//             "dew_point": 273.08,
//             "uvi": 5.13,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 4.26,
//             "wind_deg": 272,
//             "wind_gust": 4.21,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710068400,
//             "temp": 308.18,
//             "feels_like": 305.51,
//             "pressure": 1010,
//             "humidity": 10,
//             "dew_point": 272.66,
//             "uvi": 2.2,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 5.71,
//             "wind_deg": 278,
//             "wind_gust": 4.18,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710072000,
//             "temp": 306.88,
//             "feels_like": 304.38,
//             "pressure": 1011,
//             "humidity": 11,
//             "dew_point": 272.21,
//             "uvi": 0.54,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 6.31,
//             "wind_deg": 285,
//             "wind_gust": 5.17,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710075600,
//             "temp": 303.79,
//             "feels_like": 301.79,
//             "pressure": 1012,
//             "humidity": 13,
//             "dew_point": 272.28,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 5.75,
//             "wind_deg": 287,
//             "wind_gust": 8.32,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710079200,
//             "temp": 300.88,
//             "feels_like": 299.62,
//             "pressure": 1014,
//             "humidity": 16,
//             "dew_point": 272.57,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 3.35,
//             "wind_deg": 275,
//             "wind_gust": 4.67,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710082800,
//             "temp": 299.51,
//             "feels_like": 299.51,
//             "pressure": 1015,
//             "humidity": 18,
//             "dew_point": 273.18,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.56,
//             "wind_deg": 265,
//             "wind_gust": 3.02,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710086400,
//             "temp": 298.6,
//             "feels_like": 297.72,
//             "pressure": 1016,
//             "humidity": 20,
//             "dew_point": 273.63,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.25,
//             "wind_deg": 256,
//             "wind_gust": 2.58,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710090000,
//             "temp": 297.93,
//             "feels_like": 297.01,
//             "pressure": 1016,
//             "humidity": 21,
//             "dew_point": 273.92,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.02,
//             "wind_deg": 261,
//             "wind_gust": 2.27,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710093600,
//             "temp": 297.3,
//             "feels_like": 296.35,
//             "pressure": 1016,
//             "humidity": 22,
//             "dew_point": 274.01,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.11,
//             "wind_deg": 276,
//             "wind_gust": 2.36,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710097200,
//             "temp": 296.8,
//             "feels_like": 295.8,
//             "pressure": 1015,
//             "humidity": 22,
//             "dew_point": 273.93,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.21,
//             "wind_deg": 280,
//             "wind_gust": 2.46,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710100800,
//             "temp": 296.36,
//             "feels_like": 295.34,
//             "pressure": 1015,
//             "humidity": 23,
//             "dew_point": 273.72,
//             "uvi": 0,
//             "clouds": 0,
//             "visibility": 10000,
//             "wind_speed": 2.05,
//             "wind_deg": 280,
//             "wind_gust": 2.26,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710104400,
//             "temp": 296,
//             "feels_like": 294.94,
//             "pressure": 1014,
//             "humidity": 23,
//             "dew_point": 273.6,
//             "uvi": 0,
//             "clouds": 1,
//             "visibility": 10000,
//             "wind_speed": 1.85,
//             "wind_deg": 291,
//             "wind_gust": 1.99,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710108000,
//             "temp": 295.58,
//             "feels_like": 294.48,
//             "pressure": 1014,
//             "humidity": 23,
//             "dew_point": 273.49,
//             "uvi": 0,
//             "clouds": 1,
//             "visibility": 10000,
//             "wind_speed": 1.87,
//             "wind_deg": 299,
//             "wind_gust": 1.96,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710111600,
//             "temp": 295.25,
//             "feels_like": 294.14,
//             "pressure": 1014,
//             "humidity": 24,
//             "dew_point": 273.37,
//             "uvi": 0,
//             "clouds": 2,
//             "visibility": 10000,
//             "wind_speed": 1.84,
//             "wind_deg": 303,
//             "wind_gust": 1.97,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710115200,
//             "temp": 294.83,
//             "feels_like": 293.68,
//             "pressure": 1015,
//             "humidity": 24,
//             "dew_point": 273.16,
//             "uvi": 0,
//             "clouds": 3,
//             "visibility": 10000,
//             "wind_speed": 1.7,
//             "wind_deg": 319,
//             "wind_gust": 1.79,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710118800,
//             "temp": 294.41,
//             "feels_like": 293.22,
//             "pressure": 1015,
//             "humidity": 24,
//             "dew_point": 273,
//             "uvi": 0,
//             "clouds": 13,
//             "visibility": 10000,
//             "wind_speed": 1.5,
//             "wind_deg": 331,
//             "wind_gust": 1.64,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02n"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710122400,
//             "temp": 295.41,
//             "feels_like": 294.32,
//             "pressure": 1016,
//             "humidity": 24,
//             "dew_point": 273.55,
//             "uvi": 0.38,
//             "clouds": 9,
//             "visibility": 10000,
//             "wind_speed": 1.28,
//             "wind_deg": 331,
//             "wind_gust": 1.5,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710126000,
//             "temp": 298.51,
//             "feels_like": 297.6,
//             "pressure": 1017,
//             "humidity": 19,
//             "dew_point": 273.27,
//             "uvi": 1.73,
//             "clouds": 8,
//             "visibility": 10000,
//             "wind_speed": 1.33,
//             "wind_deg": 350,
//             "wind_gust": 1.79,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710129600,
//             "temp": 301.09,
//             "feels_like": 299.79,
//             "pressure": 1017,
//             "humidity": 17,
//             "dew_point": 273.44,
//             "uvi": 4.34,
//             "clouds": 8,
//             "visibility": 10000,
//             "wind_speed": 1.61,
//             "wind_deg": 28,
//             "wind_gust": 2.12,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710133200,
//             "temp": 303.17,
//             "feels_like": 301.31,
//             "pressure": 1017,
//             "humidity": 15,
//             "dew_point": 273.53,
//             "uvi": 7.65,
//             "clouds": 9,
//             "visibility": 10000,
//             "wind_speed": 2.06,
//             "wind_deg": 65,
//             "wind_gust": 1.63,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         },
//         {
//             "dt": 1710136800,
//             "temp": 305.01,
//             "feels_like": 302.8,
//             "pressure": 1016,
//             "humidity": 13,
//             "dew_point": 273.51,
//             "uvi": 10.47,
//             "clouds": 10,
//             "visibility": 10000,
//             "wind_speed": 2.24,
//             "wind_deg": 84,
//             "wind_gust": 1.66,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "pop": 0
//         }
//     ],
//     "daily": [
//         {
//             "dt": 1709965800,
//             "sunrise": 1709947068,
//             "sunset": 1709989983,
//             "moonrise": 1709944200,
//             "moonset": 1709986680,
//             "moon_phase": 0.96,
//             "summary": "Expect a day of partly cloudy with clear spells",
//             "temp": {
//                 "day": 305.31,
//                 "min": 294.24,
//                 "max": 307.1,
//                 "night": 297.38,
//                 "eve": 306.17,
//                 "morn": 294.65
//             },
//             "feels_like": {
//                 "day": 303.11,
//                 "night": 296.62,
//                 "eve": 303.82,
//                 "morn": 293.67
//             },
//             "pressure": 1013,
//             "humidity": 16,
//             "dew_point": 276.34,
//             "wind_speed": 6.41,
//             "wind_deg": 298,
//             "wind_gust": 8.83,
//             "weather": [
//                 {
//                     "id": 801,
//                     "main": "Clouds",
//                     "description": "few clouds",
//                     "icon": "02d"
//                 }
//             ],
//             "clouds": 13,
//             "pop": 0,
//             "uvi": 11.98
//         },
//         {
//             "dt": 1710052200,
//             "sunrise": 1710033421,
//             "sunset": 1710076398,
//             "moonrise": 1710033240,
//             "moonset": 1710076860,
//             "moon_phase": 0,
//             "summary": "There will be clear sky today",
//             "temp": {
//                 "day": 305.37,
//                 "min": 294.17,
//                 "max": 308.79,
//                 "night": 297.3,
//                 "eve": 306.88,
//                 "morn": 294.42
//             },
//             "feels_like": {
//                 "day": 303.11,
//                 "night": 296.35,
//                 "eve": 304.38,
//                 "morn": 293.33
//             },
//             "pressure": 1015,
//             "humidity": 14,
//             "dew_point": 274.01,
//             "wind_speed": 6.31,
//             "wind_deg": 285,
//             "wind_gust": 8.32,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 3,
//             "pop": 0,
//             "uvi": 12.04
//         },
//         {
//             "dt": 1710138600,
//             "sunrise": 1710119773,
//             "sunset": 1710162813,
//             "moonrise": 1710122160,
//             "moonset": 1710166980,
//             "moon_phase": 0.03,
//             "summary": "Expect a day of partly cloudy with clear spells",
//             "temp": {
//                 "day": 305.01,
//                 "min": 294.41,
//                 "max": 309.06,
//                 "night": 298.16,
//                 "eve": 307.78,
//                 "morn": 294.83
//             },
//             "feels_like": {
//                 "day": 302.8,
//                 "night": 297.47,
//                 "eve": 305.18,
//                 "morn": 293.68
//             },
//             "pressure": 1016,
//             "humidity": 13,
//             "dew_point": 273.51,
//             "wind_speed": 4.68,
//             "wind_deg": 296,
//             "wind_gust": 7.06,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 10,
//             "pop": 0,
//             "uvi": 11.68
//         },
//         {
//             "dt": 1710225000,
//             "sunrise": 1710206125,
//             "sunset": 1710249228,
//             "moonrise": 1710210960,
//             "moonset": 1710257040,
//             "moon_phase": 0.07,
//             "summary": "Expect a day of partly cloudy with clear spells",
//             "temp": {
//                 "day": 305.6,
//                 "min": 295.64,
//                 "max": 309.28,
//                 "night": 298.09,
//                 "eve": 307.89,
//                 "morn": 295.64
//             },
//             "feels_like": {
//                 "day": 303.37,
//                 "night": 297.79,
//                 "eve": 305.47,
//                 "morn": 294.75
//             },
//             "pressure": 1015,
//             "humidity": 16,
//             "dew_point": 276.71,
//             "wind_speed": 5.49,
//             "wind_deg": 300,
//             "wind_gust": 4.83,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 6,
//             "pop": 0,
//             "uvi": 11.72
//         },
//         {
//             "dt": 1710311400,
//             "sunrise": 1710292476,
//             "sunset": 1710335643,
//             "moonrise": 1710299880,
//             "moonset": 1710347160,
//             "moon_phase": 0.11,
//             "summary": "There will be clear sky today",
//             "temp": {
//                 "day": 304.96,
//                 "min": 295.17,
//                 "max": 307.97,
//                 "night": 295.17,
//                 "eve": 305.53,
//                 "morn": 295.18
//             },
//             "feels_like": {
//                 "day": 303.06,
//                 "night": 294.52,
//                 "eve": 303.38,
//                 "morn": 294.59
//             },
//             "pressure": 1014,
//             "humidity": 22,
//             "dew_point": 280.76,
//             "wind_speed": 5.78,
//             "wind_deg": 291,
//             "wind_gust": 6.44,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 0,
//             "pop": 0,
//             "uvi": 12.04
//         },
//         {
//             "dt": 1710397800,
//             "sunrise": 1710378827,
//             "sunset": 1710422057,
//             "moonrise": 1710388980,
//             "moonset": 1710437340,
//             "moon_phase": 0.15,
//             "summary": "There will be clear sky today",
//             "temp": {
//                 "day": 304.14,
//                 "min": 292.78,
//                 "max": 306.77,
//                 "night": 294.37,
//                 "eve": 303.98,
//                 "morn": 292.78
//             },
//             "feels_like": {
//                 "day": 302.13,
//                 "night": 293.67,
//                 "eve": 302.02,
//                 "morn": 291.56
//             },
//             "pressure": 1014,
//             "humidity": 17,
//             "dew_point": 276.42,
//             "wind_speed": 6.48,
//             "wind_deg": 296,
//             "wind_gust": 7.13,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 2,
//             "pop": 0,
//             "uvi": 13
//         },
//         {
//             "dt": 1710484200,
//             "sunrise": 1710465178,
//             "sunset": 1710508471,
//             "moonrise": 1710478200,
//             "moonset": 0,
//             "moon_phase": 0.19,
//             "summary": "There will be clear sky today",
//             "temp": {
//                 "day": 303.36,
//                 "min": 291.59,
//                 "max": 307.03,
//                 "night": 294.68,
//                 "eve": 304.72,
//                 "morn": 291.59
//             },
//             "feels_like": {
//                 "day": 301.45,
//                 "night": 293.85,
//                 "eve": 302.62,
//                 "morn": 290.66
//             },
//             "pressure": 1013,
//             "humidity": 14,
//             "dew_point": 272.58,
//             "wind_speed": 5.97,
//             "wind_deg": 261,
//             "wind_gust": 7.31,
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "clouds": 0,
//             "pop": 0,
//             "uvi": 13
//         },
//         {
//             "dt": 1710570600,
//             "sunrise": 1710551529,
//             "sunset": 1710594885,
//             "moonrise": 1710567660,
//             "moonset": 1710527460,
//             "moon_phase": 0.22,
//             "summary": "Expect a day of partly cloudy with clear spells",
//             "temp": {
//                 "day": 305.5,
//                 "min": 292.87,
//                 "max": 308.54,
//                 "night": 295.14,
//                 "eve": 305.12,
//                 "morn": 292.87
//             },
//             "feels_like": {
//                 "day": 303.21,
//                 "night": 294.26,
//                 "eve": 303.01,
//                 "morn": 291.68
//             },
//             "pressure": 1013,
//             "humidity": 10,
//             "dew_point": 270.22,
//             "wind_speed": 6.66,
//             "wind_deg": 265,
//             "wind_gust": 6.24,
//             "weather": [
//                 {
//                     "id": 802,
//                     "main": "Clouds",
//                     "description": "scattered clouds",
//                     "icon": "03d"
//                 }
//             ],
//             "clouds": 28,
//             "pop": 0,
//             "uvi": 13
//         }
//     ]
//   }
//   let city = await getAddressByCode(latitude,longitude)
//   let currentWeather:CurrentWeatherState = {
//     location:city,
//     temperature:data.current.temp,
//     status:data.current.weather[0].main,
//     humidity:data.current.humidity,
//     image:await getImageByName(city)
//   }
//   let currentHighlights:CurrentHighlightsState = {
//     uvIndex:data.current.uvi,
//     windSpeed:data.current.wind_speed,
//     windDirection:data.current.wind_deg,
//     sunrise:data.current.sunrise,
//     sunset:data.current.sunset,
//     humidity:data.current.humidity,
//     visibility:data.current.visibility,
//     airQuality: await getAQI(latitude,longitude)
//   }
//   let days = {}
//   data.daily.slice(0,7).forEach((day:any,index:number) => {
//     days["day"+index] = {
//       day:day.dt,
//       status:day.weather[0].main,
//       maxTemp:day.temp.max,
//       minTemp:day.temp.min
//     }
//   });
//     return {currentWeather,currentHighlights,days}
// }

export const kelvinToCelsius = (kelvin:number) => {
  let temp = kelvin - 273.15
  return temp.toFixed(0)+"°";
}
  
export const kelvinToFahrenheit = (kelvin:number) => {
  let temp = (kelvin - 273.15) * 9 / 5 + 32;
  return temp.toFixed(0)+"°";
}