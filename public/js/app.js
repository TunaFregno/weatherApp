import axios from "https://cdn.jsdelivr.net/npm/axios@1.5.0/dist/esm/axios.min.js";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const result = document.querySelector(".resulsTag");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (location) {
    getWeather(location);
  }
});

const getWeather = async (location) => {
  result.innerHTML = "<p class='icon'>Loading... 🐛</p>";
  await axios
    .get(`http://localhost:3000/weather?address=${location}`)
    .then(({ data }) => {
      if (data.err) {
        return (result.innerHTML = `<p>Oh oh!..${data.err}</p>`);
      }

      const icon = data.response.split(".")[0].toLowerCase();

      result.innerHTML = `<p>🌍 ${data.location}</p>`;
      result.innerHTML += `<span>${weatherIcon(icon)}</span> <span>${
        data.response
      }</span> `;
    });
};

const weatherIcon = (icon) => {
  return icon.includes("storm") || icon.includes("thunderstorm")
    ? "⚡️"
    : icon.includes("rain") || icon.includes("drizzle")
    ? "☔️"
    : icon.includes("snow") || icon.includes("blizzard")
    ? "❄️"
    : icon.includes("sunny") || icon.includes("clear")
    ? "☀️"
    : icon.includes("overcast") ||
      icon.includes("mist") ||
      icon.includes("fog") ||
      icon.includes("haze")
    ? "☁️"
    : "⛅️";
};
