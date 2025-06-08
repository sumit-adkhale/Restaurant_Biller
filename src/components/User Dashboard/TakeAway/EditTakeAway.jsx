import React from 'react'
import AddTakeAway from './AddTakeAway'
import { useParams } from 'react-router-dom'

function EditTakeAway() {
  const {id} = useParams()
  
  return (
    <>
    <AddTakeAway id={id} action={"EditTakeAway"}/>
    </>
  )
}

export default EditTakeAway