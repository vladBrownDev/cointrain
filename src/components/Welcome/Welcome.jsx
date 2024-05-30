import './Welcome.scss';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import coin from "../../img/coin.png"

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

function Welcome() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const nameObject = {
    'BTC' : 'Bitcoin',
    'ETH' : 'Etherium',
    'BNB' : 'BNB'
  }

  function selectValue(e) {
    setSelected(e.target.dataset.value);
  }

  function goToTrain() {
    navigate('/train/' + selected);
  }

  return (
    <main id='welcomeMain'>
      <motion.img className='coinImg' animate={{ rotateY: '360deg' }}
        transition={{ duration: 3, delay: 7, repeatDelay: 7, repeat: Infinity }} src={coin} />
      <div className='welcomeForm'>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="menu"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            className='dropdownBtn'
          >
            {selected ? nameObject[selected] : 'Choose currency'}
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </motion.div>
          </motion.button>
          <motion.ul
            className={'dropdownItems'}
            whileTap={{ scale: 1.1 }}
            onClick={() => {setIsOpen(false)}}
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <motion.li variants={itemVariants} onClick={selectValue} data-value={"BTC"}>Bitcoin</motion.li>
            <motion.li variants={itemVariants} onClick={selectValue} data-value={"ETH"}>Etherium</motion.li>
            <motion.li variants={itemVariants} onClick={selectValue} data-value={"BNB"}>BNB</motion.li>
          </motion.ul>
        </motion.nav>
        <motion.button onClick={goToTrain} className='goButton' whileHover={{ scale: 1.1 }}>Train</motion.button>
      </div>
    </main>
  );
}

export default Welcome;
