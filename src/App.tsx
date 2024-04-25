import './App.scss';
import axios from 'axios';
import { useState } from 'react';
import SearchBar from './Components/search';
import WeatherDetails from './Components/weather';
import { WEATHER_API_OPTIONS } from './Constants/api-constant';

function App() {
  const [loader, setLoader] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (city: string) => {
    try {
      if (!city) {
        setWeatherData(null);
      } else {
        setLoader(true);
        WEATHER_API_OPTIONS.params.city = city;
        const response = await axios.request(WEATHER_API_OPTIONS);
        response.data.city = city;
        setLoader(false);
        setWeatherData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {
        loader ? <p className='loader'>Fetching Data from API...</p> : weatherData && <WeatherDetails data={weatherData} />
      }
    </div>
  );
}

export default App;
