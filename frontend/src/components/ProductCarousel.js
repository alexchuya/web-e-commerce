import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Messaje from './Messaje'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, dispatch)

  return ( loading ? <Loader/>
  : error
  ? <Messaje variant='danger'>{error}</Messaje>
  : (
    <Carousel pause='hover' className='bg-dark'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel.caption'>
                        <h4>{product.name}(${product.price})</h4>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )

  )
}



export default ProductCarousel
