import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import { useEffect, useState } from "react";
import axios from "axios";





const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
const [listacriptomonedas, guardarCriptomonedas] = useState([])
  const MONEDAS = [
    {codigo: "USD" , nombre: "Dolar de Estados Unidos"},
    {codigo: "MXN" , nombre: "Peso Mexicano"},
    {codigo: "EUR" , nombre: "Euro"},
    {codigo: "GBP" , nombre: "Libra Esterlina"},
  ]

  // Utilizar useMoneda
  const [moneda, SelectMoneda, ] = useMoneda("Elige tu moneda", "", MONEDAS)
  // Utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu criptomoneda", "" , listacriptomonedas)

  // MANEJAR LOS ERRORES
  const [error, setError] = useState(false)

  // Ejecutar llamada a la API

  useEffect(() => {
   const consultarApi = async() => {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
    const resultado = await axios.get(url)

    guardarCriptomonedas(resultado.data.Data)
   }
  consultarApi()

  }, [])

  // CUANDO EL USUARIO HACE SUBMIT

  const handledSubmit = (e) => {
    e.preventDefault()

    // VALIDAR SI AMBOS CAMPOS DEL FORMULARIO ESTAN LLENOS
    if(moneda === `` || criptomoneda === ``) {
      setError(true)
      return
    }
    // PASAR LOS DATOS AL COMPONENTE PRINCIPAL
    setError(false)
    guardarMoneda(moneda)
    guardarCriptomoneda(criptomoneda)
  }
  
  
  return (
    <form onSubmit={handledSubmit}>
      {error ? <Error mensaje = "Todos los campos son obligatorios"/> : null}
         <SelectMoneda/>
         <SelectCripto/>
       <input className="button"  type="submit" value="Calcular" />
    </form>
  )
}

export default Formulario

