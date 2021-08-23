import {useState, useEffect} from 'react'
import { MenuItem, FormControl, Select, CardContent, Card } from '@material-ui/core'
import InfoBox from './InfoBox'
import MapBox from './Map'
import Table from './Table'
import './App.css';
import {sortData} from './util'
import LigneGraph from './LigneGraph'



function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] =useState({})
  const [tableData, setTableData] = useState([])


  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountry("worldwide")
      setCountryInfo(data)
    })
  },[])
  //Pull dat from the opened Online API https://desease.sh/v3/covid-19/countries
  // USEEFFECT rus a piece of code based on a given condition and

  useEffect(() => {
    //The code inside here will run once shen the app loads depending onn the change in the variable in the table in params
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }

    getCountries()
  },[])

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url = countryCode === "worlwide" 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        {/* dropdown menu to select countries*/}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onChangeCountry}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      
      

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <MapBox/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
            <LigneGraph/>
        </CardContent> 
      </Card>
    </div>
  );
}

export default App;
