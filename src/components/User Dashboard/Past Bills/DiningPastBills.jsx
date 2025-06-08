import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllDining } from '../../../Store/Slice'
import Loading from '../../Other Components/Loading'

function DiningPastBills({admin}) {
  
    const dispatch=useDispatch()
    const navigate =useNavigate()
    const [allDinings,setAllDinings]=useState()
    useEffect(()=>{
        dispatch(fetchAllDining())
        .then((res) => {
            setAllDinings(res.payload); // This should now show the correct data
        })
        .catch((error) => {
            console.error("Error fetching dining data:", error);
        });
    },[])
    
    const {diningLoading}=useSelector((state) => state.restaurant)
  return (
    <>
    
    <div className="grid grid-cols-8 p-5 text-center">
              <div className="col-span-1 lg:col-span-1 max-sm:hidden">
                <p className="font-medium text-lg leading-8 ">
                  Order Id (#)
                </p>
              </div>
              <div className="col-span-1 max-lg:hidden">
                <p className="font-medium text-lg leading-8 text-center">
               Table Name
                </p>
              </div>
              <div className="col-span-2  max-lg:hidden flex items-center justify-center">
                <p className="font-medium text-lg leading-8 ">
                  Total Order Value
                </p>
              </div>
              <div className="col-span-2 max-lg:hidden">
                <p className="font-medium text-lg leading-8 ">
                  Date & Time
                </p>
              </div>
              <div className="col-span-1 max-lg:hidden">
                <p className="font-medium text-lg leading-8 ">
                  Status
                </p>
              </div>
              <div className="col-span-1 max-lg:hidden">
                <p className="font-medium text-lg leading-8 ">
                  Bill Summery
                </p>
              </div>
            </div>
            
      {diningLoading&& <Loading/>}
      {Array.isArray(allDinings) &&allDinings?.slice().reverse().map((data,i)=>{
        
      return <div key={i} className="box p-2 text-center rounded-3xl bg-gray-100 grid grid-cols-8 mb-2  transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto">
        <div className="col-span-8 0 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
          <p className="font-semibold text-xl leading-8 text-black">{data.id}</p>
        </div>
        <div className="col-span-8  sm:col-span-4 lg:col-span-1 flex h-full justify-center pl-4 flex-col max-lg:items-center">
          <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1 whitespace-nowrap">
            {data.tablename}
          </h5>
        </div>

        <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
          <p className="font-semibold text-xl leading-8 text-black">₹ {data.totalAmount}</p>
        </div>
        <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
          <p className="font-semibold text-xl leading-8 text-black">{data.PlacedDate}   {data.PlacedTime}</p>
        </div>
        <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center ">
            {data.orderStatus==="Completed"?
          <p className="font-semibold text-xl leading-8 text-green-600 text-center">
            Completed
          </p>:
          <p className="font-semibold text-xl leading-8 text-red-600 text-center">
            Cancelled
          </p>}
        </div>
        <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center ">
          <button onClick={()=>navigate(`/${admin?"admin":"user"}/DiningBillingSummery/${data.id}`,{state:{onlyViewBill:true}})} className="bg-amber-500 py-1 px-2 rounded-md cursor-pointer">
            View Bill
          </button>
        </div>
      </div>
      })}
    </>
  )
}

export default DiningPastBills