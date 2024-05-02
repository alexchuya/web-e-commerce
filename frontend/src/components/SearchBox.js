import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'


function SearchBox() {
    const [ keyword ,setKeyword] = useState('')

    let navigate = useNavigate()
    let location = useLocation()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(navigate(location.pathname))
        }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex' >
        <Form.Control
            size="sm"
            type='text'
            name = 'q'
            onChange={ (e) => setKeyword(e.target.value)}
            placeholder="Buscar"
        ></Form.Control>
        <Button
            type='submit'
            variant='outline-succcess'
            className='p-2'
        >

            Submit
        </Button>
    </Form>
  )
}

export default SearchBox
