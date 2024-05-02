import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Messaje from '../components/Messaje'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()


    const location = useLocation()
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const SubmitHandler= (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')

        }else{
            dispatch(register(name, email, password))
        }
    }


  return (
    <FormContainer>
        <h1>Sign in</h1>
        {message && <Messaje variant='danger'>{message}</Messaje> }
        {error && <Messaje variant='danger'>{error}</Messaje>}
        {loading && <Loader/>}
        <Form onSubmit={SubmitHandler}>

        <Form.Group controlId='name' className="mb-4">
            <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type = 'name'
                    placeholder = 'Enter Name'
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />      
            </Form.Group>

            <Form.Group controlId='email' className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type = 'email'
                    placeholder = 'Enter Email'
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                 />  
           </Form.Group>

           <Form.Group controlId='password' className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type = 'password'
                    placeholder = 'Enter Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='passwordConfirm' className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type = 'password'
                    placeholder = 'Confirm Password'
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            <Button type='submit' variant='primary'>
                Register
            </Button>


        </Form>

        <Row  className='py-3'>
            <Col>
                Have an Account ? <Link 
                to={redirect ?  `/login?redirect=${redirect}` : '/login'}>
                Sign In
                </Link>
            </Col>
        </Row>

      
    </FormContainer>
  )
}

export default RegisterScreen

