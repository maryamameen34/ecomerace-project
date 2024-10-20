import React from 'react'
import CheckoutSteps from '../../componants/checkout/CheckoutSteps'
import Header from '../../layout/Header'
import Payment from '../../componants/payment/PaymentData'

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
    </div>
  )
}

export default PaymentPage