import { RedoTwoTone } from "@mui/icons-material";
import axios from "axios";

export const emptyValidation = ({DocumentType, DocumentNumber}) =>{
  return DocumentType === '' || DocumentNumber === '' ? true : false
} 

export const getPetsWithOwner = async ({DocumentType, DocumentNumber}) => {
  try {
    const result = await axios.get(`http://localhost:4321/mascotas/${DocumentType}/${DocumentNumber}`)
    return result.data
  } catch (error) {
    // error
    return error
  }
}