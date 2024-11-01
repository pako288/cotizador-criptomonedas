import React from 'react'

const Cotizacion = ({resultado, criptomoneda, permiso}) => {

  // console.log({resultado})
  return (
    <div>
      {permiso ?   <p> La {criptomoneda } tiene un valor de {resultado.PRICE}</p> : null}
    
    </div>
  )
}

export default Cotizacion
