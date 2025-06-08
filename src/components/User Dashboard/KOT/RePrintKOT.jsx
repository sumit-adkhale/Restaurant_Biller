import React, { useEffect, useState } from 'react'
import KOTprint from './KOTprint'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchOneTakeAwayDetails } from '../../../Store/Slice';

function RePrintKOT() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const [singleOrder, setSingleOrder] = useState({});
  useEffect(() => {
    const fetchSingleData = async () => {
      const data = await dispatch(fetchOneTakeAwayDetails(id));
      const singleData = data.payload;
      setSingleOrder(singleData);
    };
    fetchSingleData();

      // window.print()
  }, [id, dispatch]);
  return (
    
    <>
    <KOTprint rePrintsingleOrder={singleOrder} />
    </>
  )
}

export default RePrintKOT