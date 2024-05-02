import React from 'react'
import { Alert } from 'react-bootstrap'

function Messaje({variant, children}) {
  return (
    <Alert variant={variant}>
        {children}

    </Alert>
      
    
  )
}

export default Messaje
