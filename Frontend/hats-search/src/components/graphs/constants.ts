import axios from "axios";

export const infectedUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
export const recoveredUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";
export const deathUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const url = "https://covid19.mathdro.id/api";

export const fetchCovidData = async (country: string) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const response = await axios.get(changeableUrl);
    console.log("[fetchCovidData] data: ", response.data);
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
    const { data } = await axios.get(`${url}/daily`);
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
    } = await axios.get(`${url}/countries`);
    return countries.map((country: Record<string, string>) => country.name);
  } catch (error) {
    console.log(error);
  }
};
