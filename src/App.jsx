import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weather.service";
import MainIformation from "./components/MainInformation/MainIformation";
import MoreInfo from "./components/MoreInfo/MoreInfo";

function App() {
  const [query, setQuery] = useState({ q: "osh" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    fetchWeatherData();
  }, [query, units]);

  const fetchWeatherData = async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, ...units });
      setWeather(data);
    } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
    }
  };

  const handleSearch = () => {
    if (cityInput.trim() !== "") {
      setQuery({ q: cityInput });
    }
  };

  return (
      <div className="container">
        <div className="search-container">
          <input
              type="text"
              placeholder="Введите название города"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
          />
          <button onClick={handleSearch}>Поиск</button>
        </div>
        {weather ? (
            <div>
              {" "}
              <MainIformation weather={weather} />
              <MoreInfo />
            </div>
        ) : (
            <div>Ничего нету</div>
        )}
      </div>
  );
}

export default App;
