import React, { useState, useEffect } from 'react';
import "./WeatherApp.css"

function WeatherApp() {
    const [alertMsg, setAlertMsg] = useState('');
    const [weatherInfo, setWeatherInfo] = useState({
        city: '',
        country: '',
        temp: '',
        tempMax: '',
        tempMin: '',
        description: '',
        tempIcon: '',
        windSpeed: '',
        humidity: ''
    });

    useEffect(() => {
        const fetchWeather = async () => {
            const cityName = 'Angola'; // Cidade padrão
            const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

            try {
                const results = await fetch(apiUrl);
                const json = await results.json();

                if (json.cod === 200) {
                    setWeatherInfo({
                        city: json.name,
                        country: json.sys.country,
                        temp: json.main.temp.toFixed(1),
                        tempMax: json.main.temp_max.toFixed(1),
                        tempMin: json.main.temp_min.toFixed(1),
                        description: json.weather[0].description,
                        tempIcon: json.weather[0].icon,
                        windSpeed: json.wind.speed.toFixed(1),
                        humidity: json.main.humidity
                    });
                } else {
                    setWeatherInfo({});
                    setAlertMsg('Não foi possível localizar...');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do clima:', error);
                setWeatherInfo({});
                setAlertMsg('Ocorreu um erro ao buscar os dados do clima...');
            }
        };

        fetchWeather();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cityName = event.target.elements.city_name.value;

        if (!cityName) {
            setWeatherInfo({});
            setAlertMsg('Você precisa digitar uma cidade...');
            return;
        }

        const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

        try {
            const results = await fetch(apiUrl);
            const json = await results.json();

            if (json.cod === 200) {
                setAlertMsg('');
                setWeatherInfo({
                    city: json.name,
                    country: json.sys.country,
                    temp: json.main.temp.toFixed(1),
                    tempMax: json.main.temp_max.toFixed(1),
                    tempMin: json.main.temp_min.toFixed(1),
                    description: json.weather[0].description,
                    tempIcon: json.weather[0].icon,
                    windSpeed: json.wind.speed.toFixed(1),
                    humidity: json.main.humidity
                });
            } else {
                setWeatherInfo({});
                setAlertMsg('Não foi possível localizar...');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do clima:', error);
            setWeatherInfo({});
            setAlertMsg('Ocorreu um erro ao buscar os dados do clima...');
        }
    };

    return (
        <div id="container">
            <form id="search" onSubmit={handleSubmit}>
                <i className="fa-solid fa-location-dot"></i>
                <input
                    type="search"
                    name="city_name"
                    id="city_name"
                    placeholder="Buscar cidade"
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            {weatherInfo.city && (
                <div id="weather" className="show">
                    <h1 className=' text-lg' id="title">{`${weatherInfo.city}, ${weatherInfo.country}`}</h1>

                    <div id="infos">
                        <div id="temp" className=' p-7'>
                            <img
                                id="temp_img"
                                src={`https://openweathermap.org/img/wn/${weatherInfo.tempIcon}@2x.png`}
                                alt=""
                                className=' hidden md:block'
                            />

                            <div>
                                <p id="temp_value">{`${weatherInfo.temp} °C`}</p>
                                <p id="temp_description">{weatherInfo.description}</p>
                            </div>
                        </div>

                        <div id="other_infos">
                            <div className="info">
                                <i id="temp_max_icon" className="fa-solid fa-temperature-high"></i>

                                <div>
                                    <h2>Temp. max</h2>
                                    <p id="temp_max">{`${weatherInfo.tempMax} °C`}</p>
                                </div>
                            </div>

                            <div className="info">
                                <i id="temp_min_icon" className="fa-solid fa-temperature-low"></i>

                                <div>
                                    <h2>Temp. min</h2>
                                    <p id="temp_min">{`${weatherInfo.tempMin} °C`}</p>
                                </div>
                            </div>

                            <div className="info">
                                <i id="humidity_icon" className="fa-solid fa-droplet"></i>

                                <div>
                                    <h2>Humidade</h2>
                                    <p id="humidity">{`${weatherInfo.humidity}%`}</p>
                                </div>
                            </div>

                            <div className="info">
                                <i id="wind_icon" className="fa-solid fa-wind"></i>

                                <div>
                                    <h2>Vento</h2>
                                    <p id="wind">{`${weatherInfo.windSpeed} km/h`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div id="alert">{alertMsg}</div>
        </div>
    );
}

export default WeatherApp;
