import Services from "./Services"
import { useState } from 'react'

const Countries = ({countryList}) => {
  console.log(countryList.data)
  if(!countryList.data || countryList.data.length>10){
    console.log('another in')
    return(<p>Too many matches, especify another filter</p>)
  } else if(countryList.data && countryList.data.length>1){
    console.log('in')
    return(<ul>{countryList.data.map(country => <li key={country.name.common}>{country.name.common}</li>)}
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
      
    </div>)
  }
}

function App() {
  const [countries, setCountries] = useState([])
  
  const handleChange = (event) =>{
    Services.getAll(event.target.value).then(
      countriess => {
        console.log('before',countries)
        setCountries(countriess)
        console.log('after',countries)}
    ).catch( e => {
      console.log('error')}
    )
  }

  return (
    <div>
      find countries<input onChange={handleChange}/>
      <Countries countryList={countries}/>
    </div>
  );
}

export default App;
