import axios from "axios";
import { COVID_API_1, COVID_API_2 } from "./constants";

export const fetchCovidData = async (country: string) => {
  let changeableUrl = COVID_API_1;
  if (country) {
    changeableUrl = `${COVID_API_1}/countries/${country}`;
  }

  try {
    const response = await axios.get(changeableUrl);
    const { confirmed, recovered, deaths } = response.data;
    return {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchCovidDailyData = async () => {
  try {
    const { data } = await axios.get(`${COVID_API_1}/daily`);
    const modifiedData = data.map((dailyData: Record<string, any>) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchCovidCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${COVID_API_1}/countries`);
    return countries.map((country: Record<string, string>) => country.name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryDataLive = async (country: string) => {
  const data = await axios.get(
    `${COVID_API_2}/total/dayone/country/${country}`
  );
  const modifiedData = data.data.map((dailyData: Record<string, any>) => ({
    confirmed: dailyData.Confirmed,
    deaths: dailyData.Deaths,
    recovered: dailyData.Recovered,
    active: dailyData.Active,
    date: new Date(dailyData.Date).toDateString(),
  }));

  return modifiedData;
};
