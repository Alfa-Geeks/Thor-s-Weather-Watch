import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState("");
  const apiKey = "ded76eee438a450e8e731522240311";
  const [city, setCity] = useState("Allahabad");
  const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  const [day] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

  useEffect(() => {
    // Fetch weather data when the component mounts
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeatherData(response.data); // Set the weather data in state
        setHourlyForecast(response.data.forecast.forecastday[0].hour); //hourly data
        setWeeklyForecast(response.data.forecast.forecastday);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        setError("Error fetching data"); // Handle errors
        setLoading(false);
      });
  }, [weatherUrl]);

  console.log(weeklyForecast);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
    }
  };

  //   console.log(hourlyForecast);

  return (
    <>
      <div className="w-full  bg-gray-900 flex">
        <div className="w-[60%]">
          {/* Search Bar  */}
          <input
            type="text"
            onKeyDown={handleKeyDown}
            className="m-10 w-[92%] outline-none text-white bg-[#202C3C] rounded-full py-3 px-12 "
            placeholder="Search for cities"
          />

          {/* Today Forecast Section  */}
          {weatherData && (
            <div className="w-full h-screen">
              <div className="bg-gray-700 rounded-3xl p-10 mx-10">
                <div className="w-full flex gap-16">
                  <img src={weatherData.current.condition.icon} alt="" />
                  <div>
                    <p className="text-3xl text-white">
                      {weatherData.location.name}
                    </p>
                    <p className="text-lg text-white">
                      {weatherData.location.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl text-white">
                      +{weatherData.current.temp_c}
                      <sup className="">o</sup>
                    </p>
                    <p className="text-lg text-white">Temperature</p>
                  </div>
                  <div>
                    <p className="text-3xl text-white">
                      {weatherData.current.humidity}
                      <span className="text-white text-lg mt-2">%</span>
                    </p>
                    <p className="text-lg text-white">Humidity</p>
                  </div>
                  <div>
                    <p className="text-3xl text-white flex">
                      {weatherData.current.wind_kph}
                      <span className="text-white text-lg mt-2">km/h</span>
                    </p>
                    <p className="text-lg text-white">Wind Speed</p>
                  </div>
                </div>

                <div className="flex items-center justify-around gap-4 overflow-auto mt-9">
                  {hourlyForecast.length > 0
                    ? hourlyForecast.map((element) => {
                        return (
                          <div className="min-w-16  bg-white rounded-3xl mb-3">
                            <p
                              className="text-lg text-black px-3 pt-3"
                              key={element.time_epoch}
                              style={{
                                order:
                                  new Date(
                                    element.time_epoch * 1000
                                  ).getHours() >= new Date().getHours()
                                    ? new Date(
                                        element.time_epoch * 1000
                                      ).getHours() - new Date().getHours()
                                    : 24 -
                                      (new Date().getHours() -
                                        new Date(
                                          element.time_epoch * 1000
                                        ).getHours()),
                              }}
                            >
                              {new Date(element.time_epoch * 1000).getHours()}
                              :00
                            </p>
                            <img
                              src={element.condition.icon}
                              alt=""
                              className="w-20"
                            />
                            <p className="text-xl text-black px-3 pb-3">
                              {element.temp_c}
                              <sup>o</sup>
                            </p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          )}

          {/* AQI Secton  */}
          <div></div>
        </div>

        {/* 7 days forecast  */}
        <div className=" bg-gray-600 rounded-3xl px-11 pt-10 mx-10 w-[34%] mb-4">
          <p className="text-3xl text-white font-semibold pb-7">
            7 Days Forecast
          </p>
          {weeklyForecast.length > 0
            ? weeklyForecast.map((element) => {
                return (
                  <>
                    <div className="mx-2 w-[93%] my-5  h-20 bg-gray-900 rounded-3xl flex justify-between">
                      <img
                        src={element.day.condition.icon}
                        alt=""
                        className="py-2 px-3"
                      />
                      <p className="text-white text-3xl my-auto">
                        +{Math.round(element.day.maxtemp_c)}
                        <sup className="">o</sup>
                        <span className="text-lg">
                          / +{Math.round(element.day.mintemp_c)}
                        </span>
                      </p>
                      <div className="text-white text-3xl my-auto px-10">
                        {day[new Date(element.date).getDay()]}
                      </div>
                    </div>
                  </>
                );
              })
            : null}
          ;
        </div>
      </div>
    </>
  );
};

export default Weather;
