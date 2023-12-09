import { useState } from "react"

export default function useSelectRow(){
  const [selectRow, setSelectRow ] = useState({})
  
  const saveSelectRow = (row)=>{
    setSelectRow(row)
  }

  return {
    selectRow,
    saveSelectRow
  }
}