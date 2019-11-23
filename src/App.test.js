import React from 'react';
import ReactDOM from 'react-dom';
import App, {getPKP, calculateTax, taxStatus} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Tax Calculation', () => {
  
  /**
   * get PKP with income 7.500.000 & status TK0
   */
  it('get PKP with income 7.500.000 & tax status TK0', () => {
    const status = taxStatus.findIndex( tx => tx.status === 'TK0' )
    const perMonth = 7500000
    const params = {
      statusIndex: status,
      perMonth: perMonth
    }
    expect(getPKP(params)).toBe(36000000)
  })

  /**
   * get PKP with income 4.500.000 & status K0
   */
  it('get PKP with income 4.500.000 & tax status K0', () => {
    const status = taxStatus.findIndex( tx => tx.status === 'K0' )
    const perMonth = 4500000
    const params = {
      statusIndex: status,
      perMonth: perMonth
    }
    expect(getPKP(params)).toBe(0)
  })

  /**
   * calculate tax with perMonth income 7500000 (PKP 36000000) & status K0
   */
  it('calculate tax with income 7.500.000 & tax status K0', () => {
    const status = taxStatus.findIndex( tx => tx.status === 'K0' )
    const perMonth = 7500000
    const params = {
      statusIndex: status,
      perMonth: perMonth
    }
    const PKP = getPKP(params)
    expect(calculateTax(PKP)).toBe(1575000)
  })

  /**
   * calculate tax with perMonth inco
  console.log(incomeTax)me 25000000 & status TK0
   */
  it('calculate tax with income 25.000.000 & tax status TK0', () => {
    const status = taxStatus.findIndex( tx => tx.status === 'TK0' )
    const perMonth = 25000000
    const params = {
      statusIndex: status,
      perMonth: perMonth
    }
    const PKP = getPKP(params)
    expect(calculateTax(PKP)).toBe(31900000)
  })

})
