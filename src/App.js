import { Component, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import React from 'react';
import './App.css';

function filterCourse(value) {
  return value.filter((val) => {
    if(val.CurrencyCodeL === 'EUR' || val.CurrencyCodeL === 'USD' || val.CurrencyCodeL === 'GBP') return true;
  })
  .map((val) => ({[val.CurrencyCodeL]: Number(val.Amount)}))
}
async function getCourse() {
  const resFromServ = await fetch('https://bank.gov.ua/NBU_Exchange/exchange?json');
  if(resFromServ.status !== 200){
    await Promise.reject('This aplication do not work now, we are to say sorry you')
  }
  let currentCourse = await resFromServ.json();
  console.log(currentCourse)
  return filterCourse(currentCourse);
}

export default function App(){
  const [values, setValues] = useState({currentValue: 'loading...', buttonAvaliable: true,  error: false});
  let {USD, EUR, GBP, currentValue, buttonAvaliable} = values;

  useEffect(() => {
    let course = {};
    getCourse()
      .then((r) => {r.forEach((el) => { course = {...course, ...el }})})
      .then(() => setValues({...values,...course, currentValue: 'Write your amount UAH', buttonAvaliable: false,}))
      .catch((error) =>  { setValues({...values, error: true, currentValue: error})});
  }, []); 

  const setForm = (e) => {
    setValues((prev) => ({...prev, currentValue: e.target.value}))
  }
  const getCurrencyUAH = (currency) => {
      const currValue = 'Check formate date'
      if(currentValue.length !== 0 && currentValue !== '0') {
        currValue = Math.floor(Number(currentValue) / currency)
        } 
      return currValue;
    }
  const culcCourse = (e) => {
      const currBttn = e.target;
      const currencyUAH = ''; 
      switch(currBttn.name) {
        case "USD" : 
          currencyUAH = getCurrencyUAH(USD);
          // setValues((prevVal) => ({...prevVal, currentValue: currencyUAH}))
          setValues({...values, currentValue: currencyUAH});
          break;
          
          case "EUR" : 
           currencyUAH = getCurrencyUAH(EUR);
            // setValues((prevVal) => ({...prevVal, currentValue: currencyUAH}))
            setValues({...values, currentValue: currencyUAH});
            break;
          
          case "GBP" : 
            currencyUAH = getCurrencyUAH (GBP);
            // setValues((prevVal) => ({...prevVal, currentValue: currencyUAH}))
            setValues({...values, currentValue: currencyUAH});
            break;
          case "RES" : 
            setValues({...values, currentValue: 'Write your amount UAH'});
      }
    }
   
   const cleanField = () => {
     if(buttonAvaliable && isNaN(currentValue)) {
       setValues({...values, currentValue: ''})
     }
   }
    return (
      <form className="app">
        <input onClick={cleanField} onChange={setForm} className="counter" value={currentValue}/>
        <div className="controls">
          <button name='USD' onClick={culcCourse} disabled={buttonAvaliable}>USD</button>
          <button name='EUR' onClick={culcCourse} disabled={buttonAvaliable}>EVRO</button>
          <button name='GBP' onClick={culcCourse} disabled={buttonAvaliable}>GBP</button>
          <button name='RES' onClick={culcCourse} disabled={buttonAvaliable}>RESET</button>
        </div>
      </form>
    )
  }
