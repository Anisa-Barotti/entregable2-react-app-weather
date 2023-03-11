import React, { useState } from 'react'

const WeatherCard = ({weather, temperature}) => {

    const [isCelsius, setIsCelsius] = useState (true)

    const handleClick = () => setIsCelsius(!isCelsius)

  return (
    <article className='container__app'>
        <h1 className='title' >Weather APP</h1>
        <h2 className='Location' >{weather?.name}, {weather?.sys.country}</h2>
        <div className='container__weather'>
            <div className='container__icon'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            </div>
            <div className='weather'>
            <h2 className='temp'>{isCelsius ? temperature?.celsius + '°C': temperature?.farenheit + '°F'}</h2>
            <button className='bottom' onClick={handleClick}>Change to °{isCelsius ? 'F' : 'C'}</button>
            </div>
        </div>
        <footer>
            <section className='container__description'>
                <h3 className='description'>"{weather?.weather[0].description}"</h3>
                <ul className='container__data'>
                    <li>
                        <img src="src\assets\img\wind-speed-png.png" alt="" />
                        <span>Wins Speed</span> {weather?.wind.speed}m/s
                    </li>
                    <li>
                        <img src="src\assets\img\cloud.png" alt="" />
                        <span>Clouds</span> {weather?.clouds.all}%
                    </li>
                    <li>
                        <img src="src\assets\img\pressure.png" alt="" />
                        <span>Pressure</span> {weather?.main.pressure}hPa
                    </li>
                </ul>
            </section>
        </footer>
    </article>
  )
}

export default WeatherCard