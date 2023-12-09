import { useState } from "react"

export default function useSelectId(){
  const [selectId, setSelectId ] = useState('')
  
  const saveSelectId = (id)=>{
    setSelectId(id)
  }

  return {
    selectId,
    saveSelectId
  }
}