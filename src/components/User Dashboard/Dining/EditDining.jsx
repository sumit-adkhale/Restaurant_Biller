import React from 'react'
import AddDining from './AddDining'
import { useParams } from 'react-router-dom'

function EditDining() {
    const {id}=useParams()
  return (
    <AddDining id={id} EditDining={true}/>
  )
}

export default EditDining