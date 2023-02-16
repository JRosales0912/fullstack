import Services from "./Services"
import { useState, useEffect } from 'react'

const Countries = ({countryList, showOne}) => {
  console.log(countryList.data)
  let weather = null
  if(!countryList.data || countryList.data.length>10){
    console.log('another in')
    return(<p>Too many matches, especify another filter</p>)
  } else if(countryList.data && countryList.data.length>1){
    console.log('in')
    return(
    <ul>{countryList.data.map(country => 
    <li key={country.name.common}>{country.name.common}
    <button key={country.name.common} onClick={() =>showOne(null, country.name.common)}>show</button> 
    </li>)} 
    </ul>)
  } else if(countryList.data && countryList.data.length === 1){
    console.log(countryList.data[0])
    return(<div>
      <h1>{countryList.data[0].name.common}</h1>
      <p>Capital {countryList.data[0].capital[0]}</p>
      <p>Area {countryList.data[0].area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryList.data[0].languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>      
      <img src={countryList.data[0].flags.png}/>

      <h2>Weather in {countryList.data[0].capital[0]}</h2>
      {weather !== null ? (
        <>
          <p>temperature {weather.current.temp_c} Celcius </p>
          <img
            alt="weather_condition_icon"
            src={`https:${weather.current.condition.icon}`}
            width={90}
            height={90}
          />
          <p>wind {weather.current.wind_kph} m/s </p>
        </>
      ) : (
        <></>
      )}
    </div>)

  }
}

function App() {
  const [countries, setCountries] = useState([])
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    //Services.getWeather(countries.data[0].capital.common, api_key).then((response) => setWeather(response.data));
  }, [api_key, countries.data]);


  const handleChange = (event) =>{
    Services.getAll(event.target.value).then(
      countriess => {
        setCountries(countriess)}
    ).catch( e => {
      console.log('error')}
    )
  }

  const showOne = (event, key) =>{
    console.log('in here')
    Services.getAll(key).then(
      country => {
        setCountries(country)}
    ).catch( e => {
      console.log('error')}
    )
    }

  return (
    <div>
      find countries<input onChange={handleChange}/>
      <Countries countryList={countries} showOne={showOne}/>
    </div>
  );
}

export default App;
