import axios from "axios"
import { useEffect, useState } from "react"

const result = async () => {
    try {
      const res = await axios.get('http://localhost:4321/documentos')
      return res.data
    } catch (error) {
       return  `Error: ${error.response.data.message}`
    }
  }


  export const useBringDocument = ()=>{
    const [tipoDocuemento, setTipodocumento] = useState()
    const documentsSet = ()=>{
      result().then(doc => setTipodocumento(doc))
    }
    useEffect(documentsSet,[])
    return [tipoDocuemento]
  };