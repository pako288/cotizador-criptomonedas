import { useState, useEffect } from "react";

import video from "./assets/lado.jpeg";

import Formulario from "./components/Formulario";
import axios from "axios";
import Cotizacion from "./components/Cotizacion";

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [permiso, guardarPermiso] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === "") return;

      // CONSULTAR API PARA OBTENER LA COTIZACION

      // const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      // const dosurl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${criptomoneda}&tsyms=${moneda}`
      const tresurl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(tresurl);

      // console.log(resultado.data[criptomoneda], resultado.data[moneda] )
      console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      guardarPermiso(true);

      // guardarResultado(resultado.data.Display[moneda][criptomoneda]);
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  return (
    <>
      <div className="contenedor">
        <div>
          <img
            className="video"
            src={video}
          ></img>
        </div>
        <div>
          <h1 className="heading"> Cotiza criptomonedas al instante</h1>

          {/* <Saludemos/> */}
          <Formulario
            guardarCriptomoneda={guardarCriptomoneda}
            guardarMoneda={guardarMoneda}
          />
          <Cotizacion
            resultado={resultado}
            criptomoneda={criptomoneda}
            permiso={permiso}
          />
        </div>
      </div>
    </>
  );
}

export default App;
