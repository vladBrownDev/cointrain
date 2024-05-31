import './Main.scss';
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import Loading from './Loading.tsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
};

function Main() {
  const [rates, setRates] = useState([])
  const [times, setTimes] = useState([])
  const {currency} = useParams();

  const data = {
    labels: times,
    datasets: [{
      label: currency,
      data: rates,
      backgroundColor: [
        '#F3BA2F',
      ],
      borderColor: [
        '#F3BA2F',
      ],
      borderWidth: 3,
      borderJoinStyle: 'miter',
    }]
  };

  async function fetchChartData(priceArr = [], timesArr = []) {
    const result = await Axios.get('https://api.coinbase.com/v2/exchange-rates?currency=' + currency);
    priceArr.push(result.data.data.rates.USD)
    const time = new Date();
    timesArr.push(
      String(time.getHours()) + ":" +
      String(time.getMinutes()) + ":" +
      String(time.getSeconds())
    )

    if(priceArr.length >= 6) {
      setRates(priceArr);
      setTimes(timesArr)
      return;
    };

    setTimeout(() => {fetchChartData(priceArr, timesArr)}, 10000)
  }

  useEffect(() => {
    fetchChartData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {rates[0] ? <Line options={options} data={data} /> : <Loading/>}
    </main>
  );
}

export default Main;