import React, { useState } from "react";
import axios from "axios";
import wind from "./wind.png";
import humidity from "./humidity.png";
import "./App.scss";
function Forecast({ item }) {
  const imag = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(item.dt_txt);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
      className="forecast"
    >
      <div
        className="time"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ color: "black" }}> {dayOfWeek} </h3>
        <img style={{ height: "60px", width: "60px" }} src={imag} alt="" />
      </div>

      <div className="description" style={{ fontSize: "15px" }}>
        {item.weather[0].description}
      </div>
      <div style={{ display: "flex", gap: "13px", padding: "10px" }}>
        {" "}
        <div className="temp" style={{ fontSize: "15px" }}>
          {" "}
          {item.main.temp}°C
        </div>
        <div className="temp" style={{ fontSize: "15px" }}>
          Feels Like: {item.main.feels_like}°C
        </div>
      </div>

      <div style={{ display: "flex", fontSize: "15px", gap: "20px" }}>
        <div style={{ fontSize: "15px" }}>Max: {item.main.temp_max}°C</div>
        <div style={{ fontSize: "15px" }}>Min: {item.main.temp_min}°C</div>
      </div>
    </div>
  );
}
function App() {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [loading, setLoading] = useState(false);
  const [nloc, setNloc] = useState("");
  const [desc, setDesc] = useState("");
  const [wnd, setWnd] = useState("");
  const [imgurl, setImgurl] = useState("04n");
  const [humadity, setHumidity] = useState("");
  const [feelslike, setFeelslike] = useState("");
  const [array, setArray] = useState([]);
  const [clk, setClk] = useState(true);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (location) {
        response = await axios.get(
          `https://weatherbackend-34fy.onrender.com/weather?location=${location}`
        );
      } else if (lat && lon) {
        response = await axios.get(
          `https://weatherbackend-34fy.onrender.com/weather?lat=${lat}&lon=${lon}`
        );
      } else {
        throw new Error("Location or coordinates not provided");
      }
      const responseData = response.data;

      setArray(responseData.list.filter((item, index) => index % 8 === 0));

      setWeatherData(responseData.list[0].main.temp);
      setNloc(responseData.city.name);
      setDesc(responseData.list[0].weather[0].description);
      setWnd(responseData.list[0].wind.speed);
      setImgurl(responseData.list[0].weather[0].icon);
      setHumidity(responseData.list[0].main.humidity);
      setFeelslike(responseData.list[0].main.feels_like);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };
  const image = `https://openweathermap.org/img/wn/${imgurl}.png`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="card glass">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City Name"
            value={location}
            disabled={lat ? true : false}
            onChange={(e) => {
              setLocation(e.target.value);
              setLat("");
              setLon("");
            }}
          />
          <div style={{ margin: "5px", color: "black", fontWeight: "800" }}>
            Or
          </div>
          <div className="lati">
            <input
              type="text"
              placeholder="Enter Lat"
              value={lat}
              onChange={(e) => {
                setLat(e.target.value);
                setLocation("");
              }}
              className={`latitude-input ${location ? "disabled" : ""}`}
              disabled={location ? true : false}
            />
            <input
              type="text"
              placeholder="Enter Lon"
              value={lon}
              onChange={(e) => {
                setLon(e.target.value);
                setLocation("");
              }}
              className={`latitude-input ${location ? "disabled" : ""}`}
              disabled={location ? true : false}
            />
          </div>
          <button onClick={handleFormSubmit}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </div>

        <div className={`weather ${loading ? "loading" : ""}`}>
          <img src={image} alt="" className="icon" />
          <h1 className="temp">
            {weatherData
              ? clk
                ? `${weatherData}°C`
                : `${((weatherData * 9) / 5 + 32).toFixed(2)}°F`
              : "0°C"}
            <button onClick={() => setClk(!clk)}  className={`btn ${clk ? "active" : ""}`}>
              {clk ? "Convert °F" : "Convert °C"}
            </button>
            <span
              style={{
                fontSize: "1.1rem",
                paddingLeft: "3rem",
                color: "white",
              }}
              className=""
            >
              Feels Like: {feelslike ? `${feelslike}°C` : "0°C"}
            </span>
          </h1>
          <h2 className="city">{nloc}</h2>
          <div className="flex">
            <div
              className="description"
              style={{ paddingBottom: "30px", fontSize: "25px" }}
            >
              {desc}
            </div>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <div style={{ float: "left", width: "78px" }}>
              <img
                src={humidity}
                width="60px"
                height="45px"
                alt="Humidity Icon"
              />
            </div>
            <div style={{ float: "left", width: "100px" }}>
              <div className="humidity" style={{ fontSize: "30px" }}>
                {humadity ? `${humadity}°C` : "0°C"}
              </div>
              <div>Humidity</div>
            </div>
            <div style={{ float: "left", width: "80px" }}>
              <img src={wind} width="60px" height="45px" alt="Wind Icon" />
            </div>
            <div style={{ float: "left", width: "141px" }}>
              <div className="wind" style={{ fontSize: "30px" }}>
                {wnd ? `${wnd} km/h` : "0 km/h"}
              </div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "23vh",
          maxWidth: "100vw",
          width: "80vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
        className="card glass"
      >
        {array.map((item, index) => (
          <Forecast item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
