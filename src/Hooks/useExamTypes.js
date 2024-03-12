import axios from "axios"
import { useEffect, useState } from "react"


const result = async () =>{
  try {
    const res = await axios.get('http://localhost:4321/examTypes/')
    return res.data
  } catch (error) {
    return `Error: ${error.response.data.message}`
  }
}

export const useExamTypes = ()=>{
  const [examTypes, setExamType] = useState()
  const documentSet =() =>{
    result().then(data=> setExamType(data))
  }
  useEffect(documentSet,[])

  return [examTypes]
}