
import { useEffect, useState } from 'react';
import './App.css';
import { FAQ } from './FAQ';
import { Ads } from './Ads';
import './FAQ.css'
function App() {
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
    <div className="web">
      <div className="header">
        sdfkljs
      </div>
      <div className="body">
        <div className="main">
          <div className="left">
            <div className="heading">
                <h1>  Free Crypto Tax Calculator Australia</h1>
            </div>
            <div className="calculatorRow location ">
              <div className="financialYear calculatorRow content">
                <label>Financial Year : </label>
                <select className='year-select' >
                      <option >FY 2023 - 2024</option>
                  </select>
              </div>
              <div className="country calculatorRow content">
              <label>Country : </label>
                <select className='year-select' >
                      <option >Austrailia</option>
                  </select>
              </div>
            </div>
            <div className="spacing"></div>
            <hr/>
            <div className="SalePurchasePrice calculatorRow">
              <div className="purchasePrice">
                <label htmlFor=""> Enter purchase price of crypto : </label>
                <div className="inputdiv">
                  <input type="text" name = "purchasePrice" value = {`${Price.purchasePrice}`} onChange={onHandle} placeholder = "Enter Purchase price" />
                </div>
              </div>
              <div className="purchasePrice">
                <label htmlFor=""> Enter sale price of crypto : </label>
                <input type="text" name = "salePrice" value =  {`${Price.salePrice}`} onChange={onHandle} placeholder = "Enter Sale price" />
              </div>
            </div>
            <div className="expense calculatorRow">
            <div className="expensePrice">
                <label htmlFor=""> Enter purchase expense price : </label>
                <input type="text" name = "Expense" value = {`${Price.Expense}`}  onChange={onHandle} placeholder = "Enter Purchase price" />
              </div>
              <div className="InvestmentType">
                <div className="label">

                <label htmlFor=""> Investment Type : </label>
                </div>
                <div className="but">
                  <button name='short' onClick = {showGain}> Short Term </button>
                  <button name = 'long' onClick = {showGain}>Long Term</button>
                </div>
                <div className="condition">
                  <p className="short"> &lt; 12 months </p>
                  <p className="long"> &gt; 12 months </p>
                </div>
              </div>
            </div>
            <div className="annualTax calculatorRow">
            <div className="AnnualIncome">
                <label>Select your Annual Income : </label>
                <select className='income-select' onChange={(evt) => {changeAnnualIncome(evt)}}>
                      <option value={'Q1'}> $0 - $18,200</option> 
                      <option value={'Q2'}> $18,201 - $45,000</option>
                      <option value={'Q3'} > $45,001 - $120,000</option>
                      <option value={'Q4'} > $120,001 - $180,000</option>
                      <option value={'Q5'}> $180,000+</option>
                  </select>
              </div>
              <div className="purchasePrice">
                <label htmlFor=""> Tax Rate </label>
                <p>{TaxRateText}</p>
              </div>
            </div>
            <div  className= {taxVisible ? "visible capitalgain calculatorRow":  "Invisible"}>
              <div className="capital">
                <label htmlFor=""> Capital gain amount: </label>
                <input type="text" value = {`$ ${CapitalGain}`} placeholder = "Enter Purchase price" />
              </div>
              <div className="purchasePrice ">
                <label htmlFor=""> Discount for llong term gain : </label>
                <input type="text" value =  {`$ ${CapitalGain/2}`}  placeholder = "Enter Sale price" />
              </div>
            </div>
            <div className="netTaxAmount calculatorRow">
              <div className=" greeneffect">
                <p > Net Capital gains tax amount </p>
                <h1 style={{color:"green"}} className='netGain'> ${NetCapital}</h1>
              </div>
              <div className=" blueeffect">
                <p> The Tax you need to pay*</p>
                <h1 style={{color:"blue "}} className='netGain'>${PayTax}</h1>
              </div>
            </div>
            </div>
          
            <div className="feedback">
                <FAQ/>
            </div>
          </div>
    
            <Ads/>

      </div>
      <div className="footer"></div>
    </div>
   
  );
}

export default App;
