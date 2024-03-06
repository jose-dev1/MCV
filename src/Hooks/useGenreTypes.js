import axios from "axios";
import { useEffect, useState } from "react";

async function getGenreTypes() {
  try {
    const res = await axios.get('http://localhost:4321/genreTypes')
    return  res.data
  } catch (error) {
    return `Error: ${error.response.data.message}`
  }
}


export default function useGenreTypes() {
  const [genreTypes, setGenreTypes] = useState()
  const genresSet = () => {
    getGenreTypes().then(doc => setGenreTypes(doc))
  }

  useEffect(genresSet,[])
  return [genreTypes]
};
