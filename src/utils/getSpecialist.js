import axios from "axios";

export const getSpecialist = async ({specialist}) => {
  try{
    const result = await axios.get(`http://localhost:4321/especialistas/${specialist}`)
    return result.data
  }catch(err){
    return err
  }
};
