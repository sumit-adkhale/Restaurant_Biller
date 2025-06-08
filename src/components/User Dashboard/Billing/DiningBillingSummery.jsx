import React from 'react'
import BillingSummery from './BillingSummery'

function DiningBillingSummery({admin}) {
  return (
    <>
    <BillingSummery DiningBilling={true} admin={admin}/>
    </>
  )
}

export default DiningBillingSummery