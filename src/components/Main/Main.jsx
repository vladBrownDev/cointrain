import './Main.scss';
import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function Main() {
  const [rates, setRates] = useState([])

  const data = {
    labels: labels,
    datasets: [{
      label: '',
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

  async function fetchChartData(priceArr = []) {
    const result = await Axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
    priceArr.push(result.data.data.rates.USD)

    if(priceArr.length >= 5) {
      setRates(priceArr);
      return;
    };
    
    setTimeout(() => {fetchChartData(priceArr)}, 10000)
  }

  useEffect(() => {
    fetchChartData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {rates[0] ? <Line options={options} data={data} /> : "loading..."}
    </main>
  );
}

export default Main;