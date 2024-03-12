import axios from "axios"
import { useEffect, useState } from "react"

const result = async () => {
    try {
      const res = await axios.get('http://localhost:4321/carnet/tipovacuna')
      return res.data
    } catch (error) {
       return  `Error: ${error.response.data.message}`
    }
  }


  export const useBringVacuna = ()=>{
    const [tipoVacuna, setVacuna] = useState()
    const vacunaSet = ()=>{
      result().then(vacuna => setVacuna(vacuna))
    }
    useEffect(vacunaSet,[])
    return [tipoVacuna]
  };