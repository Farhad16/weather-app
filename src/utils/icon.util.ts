import clear from "../assets/images/clear.png";
import cloud from "../assets/images/cloud.png";
import drizzle from "../assets/images/drizzle.png";
import rain from "../assets/images/rain.png";
import snow from "../assets/images/snow.png";
import mist from "../assets/images/mist.png";
import thunder from "../assets/images/thunder.png";

export const getWeatherIcon = (icon: string) => {
  if (icon === "01d" || icon === "01n") {
    return clear;
  } else if (
    icon === "02d" ||
    icon === "02n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    return cloud;
  } else if (icon === "03d" || icon === "03n") {
    return drizzle;
  } else if (
    icon === "09d" ||
    icon === "09n" ||
    icon === "10d" ||
    icon === "10n"
  ) {
    return rain;
  } else if (icon === "11d" || icon === "11n") {
    return thunder;
  } else if (icon === "13d" || icon === "13n") {
    return snow;
  } else {
    return mist;
  }
};
