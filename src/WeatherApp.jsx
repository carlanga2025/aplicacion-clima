import { useState } from 'react'
import './styles/weatherStyles.css'


const WeatherApp = () => {

  const urlBase = `https://api.openweathermap.org/data/2.5/weather`
  const API_KEY = `18cc716f7879d539172ad5063260b55a`
  const difKelvin = 273


  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const handleCiudad = (e) => {
    setCiudad(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }


  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch (error) {
      console.error('Ocurrió el siguiente error:', error)
    }
  }


  return (
    <div className="container">

      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={ciudad}
          onChange={handleCiudad} />
        <button type="submit">Search</button>
      </form>

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)} °C</p>
          <p>Descripción: {dataClima.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />

        </div>
      )}


    </div>
  )
}

export default WeatherApp