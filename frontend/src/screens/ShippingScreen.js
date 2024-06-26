import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }

    console.log("shipping", address,city, postalCode, country)

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className="mb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type = 'text'
                    placeholder = 'Enter Address'
                    value = {address ?  address : ''}
                    onChange = {(e) => setAddress(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='city' className="mb-4">
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type = 'text'
                    placeholder = 'Enter City'
                    value = {city ? city : ''}
                    onChange = {(e) => setCity(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='postalCode' className="mb-4">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    required
                    type = 'text'
                    placeholder = 'Enter Postalcode'
                    value = {postalCode ? postalCode: ''}
                    onChange = {(e) => setPostalCode(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='country' className="mb-4">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type = 'text'
                    placeholder = 'Enter Country'
                    value = {country ? country : ''}
                    onChange = {(e) => setCountry(e.target.value)}
                />
            </Form.Group>
            <Button type= 'submit' variant= 'primary'>
                Continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
