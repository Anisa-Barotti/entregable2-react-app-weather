import axios from 'axios'
import { useEffect, useState } from 'react'
import './assets/css/App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState ()
  const [isLoading, setIsLoading] = useState (true)
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  useEffect (() => {
    const success = pos => {
      const objeto = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

       setCoords(objeto)
    }  

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
      const APIKey = 'f6f9e6707578d5d6eef6e5706cd1b832'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemperature(obj)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading (false))

    }
  }, [coords])

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      { 
        isLoading ?
          <h1 className='loader'>Loading...</h1>
        : 
          <WeatherCard 
            weather={weather}
            temperature={temperature}
          />
      }
     </div> 

  )
}

export default App;