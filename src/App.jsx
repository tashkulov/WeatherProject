import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weather.service";
import MainInformation from "./components/MainInformation/MainIformation.jsx";
import MoreInfo from "./components/MoreInfo/MoreInfo";

function App() {
  const [query, setQuery] = useState({ q: "osh" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.q) {
      fetchWeatherData();
    }
  }, [query]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await getFormattedWeatherData({ ...query, ...units });
      setWeather(data);
    } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (cityInput.trim() !== "") {
      setQuery({ q: cityInput });
      setCityInput("");
    }
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  return (
      <div className="container">
        <div className="search-container">
          <input
              type="text"
              placeholder="Введите название города"
              value={cityInput}
              onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Поиск</button>
        </div>
        {loading ? (
            <div>Загрузка...</div>
        ) : weather ? (
            <div>
              <MainInformation weather={weather} />
              <MoreInfo name={query.q} />
            </div>
        ) : (
            <div>Ничего нет</div>
        )}
      </div>
  );
}

export default App;
