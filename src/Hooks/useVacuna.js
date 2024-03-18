import axios from "axios"
import { useEffect, useState } from "react"

const result = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4321/carnet/tipovacuna/${id}`)
      return res.data
    } catch (error) {
       return  `Error: ${error.response.data.message}`
    }
  }


  export const useBringVacuna = (id)=>{
    const [tipoVacuna, setVacuna] = useState([])
    const vacunaSet = (id)=>{
      result(id).then(vacuna => setVacuna(vacuna))
    }
    useEffect(()=>vacunaSet(id),[id])
    return [tipoVacuna]
  };