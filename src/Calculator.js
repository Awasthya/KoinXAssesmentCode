import React from 'react'
import './calculator.css'
import './App.css';
import { useEffect, useState } from 'react';
export const Calculator = () => {

    const [Price, setPrice] = useState({purchasePrice : 0, salePrice : 0, Expense : 0});
  
    const [IncomeRange,setIncomeRange] = useState('Q1');
    const [TaxRateText,setTaxRateText] = useState("0%");
    const [CapitalGain,setCapitalGain] = useState(0);
    const [TaxRate,setTaxRate] = useState(0);
    const [taxVisible, setTaxVisible] = useState(true);
    const [NetCapital, setnetGain] = useState(0);
    const [PayTax,setPayTax] = useState(0);
  
    const changeAnnualIncome =  (e) =>{
       setIncomeRange(e.target.value);
      //console.log(IncomeRange);
      
    }
    let name,value;
    const onHandle = (event) =>{
      name = event.target.name;
      value = event.target.value;
  
      setPrice({ ...Price, [name]: value });
    //  console.log(`${name} -> ${value}`)
  }
  const showGain = (e) => {
    if(e.target.name === 'short')
      setTaxVisible(false);
    else  
      setTaxVisible(true);
  
    //  console.log(taxVisible);
  }
  
  useEffect(() =>{
    setPayTax((NetCapital * TaxRate) / 100)
  },[NetCapital,TaxRate]);
  useEffect (() =>{
    setCapitalGain(Price.salePrice - Price.purchasePrice - Price.Expense);
    if(taxVisible)
      setnetGain(CapitalGain-(CapitalGain/2));
    else{
      setnetGain(Price.salePrice - Price.purchasePrice - Price.Expense);
    }
    
  },[Price,CapitalGain,taxVisible]);
    useEffect(() => {
  
      if(IncomeRange === 'Q1'){
        setTaxRateText("0%");
        setTaxRate(0);
      }else if(IncomeRange === 'Q2'){
        setTaxRateText("Nil + 19% of excess over $18,200");
        setTaxRate(19);
      }else if(IncomeRange === 'Q3'){
        setTaxRateText("$5,092 + 32.5% of excess over $45,000");
        setTaxRate(32.5);
      }else if(IncomeRange === 'Q4'){
        setTaxRateText("$29,467 + 37% of excess over $120,000");
        setTaxRate(37);
      }else if(IncomeRange === 'Q2'){
        setTaxRateText("$51,667 + 45% of excess over $180,000");
        setTaxRate(45);
      }
    },[IncomeRange])
  return (
    <div className="calculator">
        <div className="left">
            <div className="financialYear  ">
              <label>Financial Year : </label>
              <select className='year-select' >
                    <option >FY 2023 - 2024</option>
                </select>
            </div>
            <hr/>

            <div className="purchasePrice">
              <label htmlFor=""> Enter purchase price of crypto : </label>
              <div className="inputdiv">
                <input type="text" name = "purchasePrice" value = {`${Price.purchasePrice}`} onChange={onHandle} placeholder = "Enter Purchase price" />
              </div>
            </div>
            
        </div>
        <div className="right">
            <div className="country  ">
                <label>Country : </label>
              <select className='year-select' >
                    <option >Austrailia</option>
                </select>
            </div>
            <hr/>
            <div className="purchasePrice">
              <label htmlFor=""> Enter sale price of crypto : </label>
              <input type="text" name = "salePrice" value =  {`${Price.salePrice}`} onChange={onHandle} placeholder = "Enter Sale price" />
            </div>
        </div>
    </div>
  )
}
