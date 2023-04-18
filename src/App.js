import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

const useSettingsCalc = (value) => {
  const [counter, setCounter] = useState(value);
  useEffect(() => setCounter(value),[value]);
  return {
         incCounter: () => {
          if (counter < 50) {
            setCounter(counter => counter + 1)
          }
        },
        decCounter: () => {
          if (counter > -50) {
            setCounter(counter => counter - 1)
          }
         },
        rndCounter: () => {
          setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0))
        },
        resetCounter: () => {
          setCounter(value)
        },
       count: counter,
      }
}

const Counter = ({counter}) => {
const {incCounter, decCounter, rndCounter, resetCounter, count} = useSettingsCalc(counter);
  return (
    <div className="component">
      <div className="counter">{count}</div>
      <div className="controls">
        <button onClick={incCounter}>INC</button>
        <button onClick={decCounter}>DEC</button>
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )
}

const RndCounter = ({counter}) => {
  const {rndCounter, resetCounter, count} = useSettingsCalc(counter);
  return (
    <div className="component">
      <div className="counter">{count}</div>
      <div className="controls">
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )
}


export default function App(){
  
  const [value_1, setValue_1] = useState('loading...');
  const [value_2, setValue_2] = useState('loading...');
  useEffect(() => {
    fetch('https://www.random.org/integers/?num=2&min=-50&max=50&col=1&base=10&format=plain&rnd=new')
      .then(res => res.text())
      .then(res => { const filterValues = new String(res).split('\n').map((el) =>{if (!isNaN(el)) return +el}).filter((el) => el !== 0);
        setValue_1(filterValues[0]);
        setValue_2(filterValues[1]);
      })
  },[])
  return (
    <>
      <Counter counter={value_1}/>
      <RndCounter counter={value_2}/>
    </>
  )
}
