
const apiKey = "109cee50ffade3b275fc8f7614964113"
const unsplashKey = "x-lULc5fr9SgzqWB9wbnr9Fos2g2jr6CG5y_HNe7N7g"

const getAddressByCode = (latitude:number,longitude:number) => {
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(async(res:Response) => {
          const response = await res.json()
          return response[0].name
        })
        .catch((error) => {
          console.log(error);
          return "Couldn't find city"
        });
}

export const getAddressByName = (name:string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${apiKey}`)
        .then(async(res:Response) => {
          const response = await res.json()
          return getWeather(response[0].lat,response[0].lon)
        })
        .catch((error) => {
          console.log(error);
          return "Couldn't find city"
        });
}

export const getImageByName = (name:string) => {
    fetch(`https://api.unsplash.com/search/photos/?client_id=${unsplashKey}&query=${name} city`)
        .then(async(res:Response) => {
          const response = await res.json()
          return response.results[0].urls.raw
        })
        .catch((error) => {
          console.log(error);
          return "Couldn't find city"
        });
}

const getAQI = (latitude:number,longitude:number) => {
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(async(res:Response) => {
          const response = await res.json()
          return response.list[0].main.aqi
        })
        .catch((error) => {
          console.log(error);
          return 0
        });
  }

export const getWeather = (latitude:number,longitude:number) => {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`).then(async(res:Response) =>
    {
      const response = await res.json()
      console.log(response)
      let city = getAddressByCode(latitude,longitude)
      let currentWeather:CurrentWeatherState = {
        location:city,
        temperature:response.current.temp,
        status:response.current.weather[0].main,
        humidity:response.current.humidity,
        image:getImageByName(city)
      }
      let currentHighlights:CurrentHighlightsState = {
        uvIndex:response.current.uvi,
        windSpeed:response.current.wind_speed,
        windDirection:response.current.wind_deg,
        sunrise:response.current.sunrise,
        sunset:response.current.sunset,
        humidity:response.current.humidity,
        visibility:response.current.visibility,
        airQuality:getAQI(latitude,longitude)
      }
      let days = {}
      response.daily.slice(0,7).forEach((day:any,index:number) => {
        days["day"+index] = {
          day:day.dt,
          status:day.weather[0].main,
          maxTemp:day.temp.max,
          minTemp:day.temp.min
        }
      });
      return {currentWeather,currentHighlights,days}
    }
    )
    .catch((error) => console.log(error));
  }