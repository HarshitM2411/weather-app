import "./weather.scss";

const WeatherDetails = ({ data }: any) => {
    return (
        <div className="weather-details">
            <h2>Weather Details for {data.city}</h2>
            <p>Temperature: {data.temp}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Wind Speed: {data.wind_speed}</p>
        </div>
    );
};

export default WeatherDetails;
