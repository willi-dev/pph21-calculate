import React, { useState } from 'react'
import './App.css'

/**
 * baseTaxRelief
 */
export const baseTaxRelief = 54000000

/**
 * diffTaxRelief
 */
export const diffTaxRelief = 4500000

/**
 * taxStatus
 */
export const taxStatus = [
  { status: 'TK0', description: 'Single' },
  { status: 'K0', description: 'Married with no dependant' },
  { status: 'K1', description: 'Married with 1 dependant' },
  { status: 'K2', description: 'Married with 2 dependant' },
  { status: 'K3', description: 'Married with 3 dependant' }
]

/**
 * taxScheme
 */
export const taxScheme = [
  { taxRate: 5/100,  maxLimit:  50000000 },
  { taxRate: 15/100, maxLimit: 250000000 },
  { taxRate: 25/100, maxLimit: 500000000 },
  { taxRate: 30/100, maxLimit: 'none' }
]

/**
 * getPKP
 */
export const getPKP = ({ statusIndex, perMonth}) => {
  let PKP = 0
  const perYear = perMonth * 12
  const PKTP = baseTaxRelief + (diffTaxRelief * statusIndex)
  if (perYear > PKTP) {
    PKP = perYear - PKTP
  }
  return PKP
}

/**
 * calculateTax
 */
export const calculateTax = (PKP) => {
  let bottomLimit = 0
  let incomeTax = 0
  let remainIncome = PKP
  taxScheme.forEach( (scheme, index) => {
    if (remainIncome > (scheme.maxLimit - bottomLimit)) {
      remainIncome = remainIncome - (scheme.maxLimit - bottomLimit)
      incomeTax += scheme.taxRate * (scheme.maxLimit - bottomLimit)
    } else {
      incomeTax += scheme.taxRate * remainIncome
      remainIncome = 0
    }
    bottomLimit = scheme.maxLimit
  })
  return incomeTax
}

/**
 * App
 * App component
 */
const App = () => {
  const [status, setStatus] = useState(baseTaxRelief)
  const [incomeMonth, setIncomeMonth] = useState(0)
  const [incomeYear, setIncomeYear] = useState(0)
  const [taxIncome, setTaxIncome] = useState(0)

  const changeStatus = (e) => {
    setStatus(e.target.value)
  }

  const changeIncome = (e) => {
    setIncomeMonth(e.target.value)
    setIncomeYear(e.target.value * 12)
  }

  const onClickCalculate = () => {
    const params = {
      statusIndex: status,
      perMonth: incomeMonth
    }
    const PKP = getPKP(params)
    const tax = calculateTax(PKP)
    setTaxIncome(tax)
  }

  return (
    <div className="container">
      <div className="row">setTaxIncome
        <div className="col-12">
          <h1>Perhitungan Pajak pph21</h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="status">Pilih Status</label>
            <select className="form-control" id="status" onChange={ (e) => changeStatus(e) }>
              {
                taxStatus.map((val, index) => {
                  return (
                    <option key={index} value={index}>{val.status} - {val.description}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="income-per-month">Income Per Bulan</label>
            <input id="income-per-month" type="text" className="form-control" value={incomeMonth} onChange={ (e) => changeIncome(e) }/>
          </div>
          <div className="form-group">
            <label htmlFor="income-per-year">Income Per Tahun</label>
            <input id="income-per-year" type="text" className="form-control" value={incomeYear} disabled/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={(e) => onClickCalculate()}>
              Hitung Pajak
            </button>
          </div>

          <h2>
          Pajak: Rp. {taxIncome}
          </h2>
        </div>
      </div>

    </div>
  )
}

export default App;
