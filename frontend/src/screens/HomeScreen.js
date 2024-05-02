import React, {useState ,useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Messaje from '../components/Messaje'
import Paginate from '../components/Paginate'
import { useLocation } from 'react-router-dom'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state =>state.productList)
  const {error, loading, products, page, pages} = productList
  

  const location = useLocation()

  let keyword = location.search

  console.log(keyword,'hey')
  
  useEffect(()=>{
    dispatch(listProducts(keyword))

  },[dispatch, keyword])

  return (
    <div>
      {!keyword && <ProductCarousel/>}
      
      <h1>Latest Products</h1>
      {loading ? <Loader/>
        :error ? <Messaje variant='danger'>{error}</Messaje> 
          :
          <div>
          <Row>
            {products.map(product =>(
                <Col key={product._id} sm={12} md = {6} lg = {3} >
                    <Product product={product}/>
                </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
    }
    </div>
  )
}

export default HomeScreen
