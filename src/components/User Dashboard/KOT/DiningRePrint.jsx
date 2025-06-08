import React, { useEffect, useState } from "react";
import KOTprint from "./KOTprint";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchOneDining } from "../../../Store/Slice";

function DiningRePrint() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [singleOrder, setSingleOrder] = useState(null);

  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        const data = await dispatch(fetchOneDining(id)).unwrap(); // Unwrapping to get direct payload
        console.log("Fetched Dining Order:", data);
        setSingleOrder(data);
      } catch (error) {
        console.error("Error fetching dining order:", error);
      }
    };

    fetchSingleData();
  }, [id, dispatch]);

  return <KOTprint rePrintsingleOrder={singleOrder} RePrintDining={true} dining={true} />;
}

export default DiningRePrint;
