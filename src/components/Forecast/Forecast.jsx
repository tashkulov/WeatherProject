import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { API_KEY, BASE_URL } from "../../services/weather.service.js";
import rain from './icons/rain.svg'
import icon from './icons/Icon.svg'
import weather from './icons/weather.svg'
import wind from './icons/wind.svg'
import './Forecast.css'
const Forecast = ({ city }) => {
    const [weatherForecast, setWeatherForecast] = useState(null);

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await getWeatherForecast(city);
                setWeatherForecast(response);
            } catch (error) {
                console.error("Error fetching weather forecast:", error);
            }
        };

        fetchWeatherForecast();
    }, [city]);

    const getWeatherForecast = async (cityName) => {
        try {
            const url = `${BASE_URL}/forecast`;
            const queryParams = new URLSearchParams({
                q: cityName,
                appid: API_KEY,
                units: "metric",
                rain: "true",
                uvi: "true"
            });

            const response = await fetch(`${url}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather forecast for ${cityName}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
            throw error;
        }
    };


    const formatDate = (timestamp) => {
        return DateTime.fromSeconds(timestamp).toFormat("DDDD");
    };

    const groupForecastByDay = (forecastList) => {
        const groupedForecast = {};
        forecastList.forEach((forecast) => {
            const date = formatDate(forecast.dt);
            if (!groupedForecast[date]) {
                groupedForecast[date] = forecast;
            }
        });
        return groupedForecast;
    };

    return (
        <div>
            <h2>Weather Forecast</h2>
            {weatherForecast && weatherForecast.list && (
                <div>
                    {Object.values(groupForecastByDay(weatherForecast.list)).map((forecast) => (
                        <div key={forecast.dt}>
                            <p>{formatDate(forecast.dt)}</p>
                            <p> Temperature: {forecast.main.temp}&deg;C</p>
                            <p> <img src={weather} width={25} height={25}/>Real Feel: {forecast.main.feels_like}&deg;C
                            </p>
                            <p> <img src={wind} width={25} height={25}/>Wind: {forecast.wind.speed} m/s</p>
                            <p> <img src={rain} width={25} height={25}/>Chance of Rain: {forecast.pop}%</p>
                            <p> <img src={icon} width={25} height={25}/>UV Index: {forecast.uvi}4</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Forecast;
