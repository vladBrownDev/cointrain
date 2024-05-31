import './Loading.scss';
import React from "react";
import Tetris from 'react-tetris';
import { useState, useMemo } from 'react';

const Loading = React.memo(() => {
  const [timer, setTimer] = useState(60);

  const memoTimer = useMemo(() => {
    const runTimer = () => {
      setTimer(timer - 1)
    }
    setTimeout(runTimer, 1000)
    
    return timer
  }, [timer])

  return (
    <div id='loading'>
      <h1>Your chart will be loaded in {memoTimer} seconds</h1>
      <h2>Play some tetris for now</h2>
      <Tetris
        keyboardControls={{
          // Default values shown here. These will be used if no
          // `keyboardControls` prop is provided.
          down: 'MOVE_DOWN',
          left: 'MOVE_LEFT',
          right: 'MOVE_RIGHT',
          space: 'HARD_DROP',
          z: 'FLIP_COUNTERCLOCKWISE',
          x: 'FLIP_CLOCKWISE',
          up: 'FLIP_CLOCKWISE',
          p: 'TOGGLE_PAUSE',
          c: 'HOLD',
          shift: 'HOLD'
        }}
      >
        {({
          Gameboard,
          state,
          controller,
        }) => (
          <div>
            <Gameboard />
            {state === 'LOST' && (
              <div>
                <h2>Game Over</h2>
                <button onClick={controller.restart}>New game</button>
              </div>
            )}
          </div>
        )}
      </Tetris>
    </div>
  );
})

export default Loading;
