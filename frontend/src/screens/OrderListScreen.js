import React, {useEffect, useState} from 'react'
import {Link, LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Messaje from '../components/Messaje'
import { listOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'


function OrderListScreen() {
  const dispatch = useDispatch()
  
  const orderList = useSelector(state => state.orderList)
  const {loading, error, orders} = orderList

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  console.log(orders)
  
  const navigate = useNavigate()

useEffect(() => { 
  if(userInfo && userInfo.isAdmin){
    dispatch(listOrders())
  } else{
    navigate('/login')
  }
  
},[dispatch, navigate, userInfo])


  return (
    <div>
      <h1>Orders</h1>
      {loading
      ? <Loader/>
      : error 
        ? <Messaje variant='danger'>{error}</Messaje>
        : ( 
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>Total</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name }</td>
                    <td>{order.createAt.substring(0,10)}</td>
                    <td>${order.totalPrice}</td>
                    
                    <td>{order.isPaid  ? (
                        order.paidAt.substring(0,10)
                    ) : (
                      <i className='fas fa-check' style={{color: 'red'}}></i>
                      )}
                    </td>

                    <td>{order.isDelivered  ? (
                        order.deliveredAt.substring(0,10)
                    ) : (
                      <i className='fas fa-check' style={{color: 'red'}}></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/order/${order._id}/`}>
                        <Button variant='light' className='btn-sm'>
                            Details
                        </Button> 
                      </LinkContainer>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        )}
    </div>
  )
}

export default OrderListScreen
