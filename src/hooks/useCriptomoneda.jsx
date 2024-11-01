import { useState } from "react";

const useCriptomoneda = (label, stateInicial, opciones) => {
  const [state, actualizarState] = useState(stateInicial);
  const SelectCripto = () => {
    return (
      <>
        <label htmlFor="">{label}</label>
        <select onChange={(e) => actualizarState(e.target.value)} value={state}>
          <option value=""> - Seleccione -</option>
          {opciones.map((opcion) => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
              {opcion.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </>
    );
  };
  return [state, SelectCripto, actualizarState];
};

export default useCriptomoneda;
