import './Header.scss';
import React from "react";
import { motion } from "framer-motion";

function Header() {
  return (
    <header id='mainHeader'>
      <motion.h1 
        transition={{ type: 'spring'}}
        initial={{ y: -70 }} 
        whileInView={{ y: 0 }}>
        CoinTrain
      </motion.h1>
    </header>
  );
}

export default Header;
