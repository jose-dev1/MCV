import axios from "axios";
import { useEffect, useState } from "react";

const result = async () => {
  try {
    const res = await axios.get("http://localhost:4321/despaTypes");
    return res.data;
  } catch (error) {
    return `Error: ${error.response.data.message}`;
  }
};

export const useTypeDespa = () => {
  const [desparacitacion, setDesparacitacion] = useState();
  const desparacitacionset = () => {
    result().then((tipoDesparasitacion) =>
      setDesparacitacion(tipoDesparasitacion)
    );
  };
  useEffect(desparacitacionset, []);
  return [desparacitacion];
};
