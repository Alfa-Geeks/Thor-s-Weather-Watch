import React, { useEffect, useState } from "react";
import axios from "axios";

function Geolocation() {
  const [status, setStatus] = useState("Waiting for location...");
  const [Data, setData] = useState(null);

  let getLocation = () => {
    if (navigator.geolocation) {
      setStatus("Getting location...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setStatus("Location retrieved successfully!");

          axios
            .post("http://localhost:3000/sms/send-location", {
              latitude,
              longitude,
            })
            .then((response) => {
              setData(response.data);
              console.log(Data, "inside log");
            })
            .catch((error) => {
              console.error("Error sending location:", error);
              setStatus("Failed to send location to server.");
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setStatus("Failed to get location: " + error.message);
        }
      );
    } else {
      setStatus("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div>
        <h1>User Location</h1>
        <button className="bg-gray-400" onClick={getLocation}>
          Get Location
        </button>
        <p>Status: {status}</p>
        {Data && (
          <div>
            <p>Name: {Data.location.name}</p>
            <p>Latitude: {Data.location.lat}</p>
            <p>Longitude: {Data.location.lon}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Geolocation;
