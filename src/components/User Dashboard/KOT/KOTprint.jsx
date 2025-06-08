import React, { useEffect, useState } from "react";
import AddOrderHeader from "../../Other Components/AddOrderHeader";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchDiningKOT, FetchKOT } from "../../../Store/Slice";

function KOTprint({ rePrintsingleOrder, dining, RePrintDining }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [singleOrder, setSingleOrder] = useState({});

  useEffect(() => {
    const fetchSingleData = async () => {
      
        let data;
        if (dining) {
          const res = await dispatch(FetchDiningKOT(id))
          data =res.payload
        } else {
          const res = await dispatch(FetchKOT(id))
          data =res.payload
        }
        console.log("Fetched KOT Data:", data);
        setSingleOrder(data);
      
    };
    if(!RePrintDining){
      fetchSingleData();
    }

    setTimeout(() => {
      window.print()
    }, 500);
  }, [id, dispatch, dining]);

  return (
    <div className="">
      <AddOrderHeader heading={rePrintsingleOrder ? "Re-Print KOT" : "KOT"} id={id} dining={dining} />
      <div>
        <div className="text-center">
          {dining ? (
            <h1 className="mt-5">Table Name : {rePrintsingleOrder?.tablename || singleOrder.tablename}</h1>
          ) : (
            <h1 className="mt-5">Order Id : {rePrintsingleOrder?.id || singleOrder.id}</h1>
          )}
          {!dining && <h1>Customer Name: {rePrintsingleOrder?.customerName || singleOrder.customerName}</h1>}

          <h1 className="mt-5">Order Details</h1>
          <table className="text-center mx-auto mb-5 ">
            <thead className="border-y-1 py-3 mb-3">
              <tr>
                <td className="pr-5">Items Name</td>
                <td className="pr-5">Quantity</td>
              </tr>
            </thead>
            <tbody>
              {(rePrintsingleOrder?.order || singleOrder.order || []).map((item, index) => (
                <tr key={index}>
                  <td>{item.foodName}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KOTprint;
