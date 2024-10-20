import React from 'react'
import Header from '../../layout/Header';
import CheckoutSteps from '../../componants/checkout/CheckoutSteps';
import Checkout from '../../componants/checkout/Checkout';




const CheckoutPage = () => {
  return (
    <div>
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
    </div>
  )
}

export default CheckoutPage