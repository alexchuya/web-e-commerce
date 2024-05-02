import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Messaje from '../components/Messaje'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstans'
import { listMyOrders } from '../actions/orderActions'


function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy 


    useEffect(() => {
        if (!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const SubmitHandler= (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')

        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
        }
    }

    console.log(user)
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Messaje variant='danger'>{message}</Messaje> }
            {error && <Messaje variant='danger'>{error}</Messaje>}
            {loading && <Loader/>}
            
            <Form onSubmit={SubmitHandler}>

                <Form.Group controlId='name' className="mb-4">
                    <Form.Label>Name</Form.Label>
                        <Form.Control
                            type = 'name'
                            placeholder = 'Enter Name'
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}
                        />      
                </Form.Group>

                <Form.Group controlId='email' className="mb-4">
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            type = 'email'
                            placeholder = 'Enter email'
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                        />      
                </Form.Group>

                <Form.Group controlId='password' className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type = 'password'
                        placeholder = 'Enter Password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type = 'password'
                        placeholder = 'Confirm Password'
                        value = {confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>

        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader/>
            ) : errorOrders ? (
                <Messaje variant='danger'>{errorOrders}</Messaje>
            ): (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen
