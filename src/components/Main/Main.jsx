import './Main.scss';
import React from "react";
import { useParams } from 'react-router-dom';

function Main() {
  const { currency } = useParams();  

  return (
    <main>
        {currency}
    </main>
  );
}

export default Main;