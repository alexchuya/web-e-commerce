import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Messaje from '../components/Messaje'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {

    const productId = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInstock, setCountInstock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()


    const location = useLocation()
    const navigate = useNavigate();


    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate


    useEffect(() => {

        if ( successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{

            if (!product.name ||  product._id !== Number(productId.id)){
                dispatch(listProductDetails(productId.id))
            } else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInstock(product.countInstock)
                setDescription(product.description)
            }
            
        }
        }, [dispatch, product, productId, navigate, successUpdate])

    const SubmitHandler= (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId.id,
            name,
            price,
            image,
            brand,
            category,
            countInstock,
            description
        }))
    }


    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()


        formData.append('image', file)
        formData.append('product_id', productId.id)

        setUploading(true)

        try{

            const config = { 
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)
            
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }       
        
    }

  return (  
  
    <div>
        <Link to='/admin/productlist'>
            go Back
        </Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Messaje variant='danger'>{errorUpdate}</Messaje>}
           
            {loading ? <Loader/> : error ? <Messaje variant='danger'>{error}</Messaje> 
            :(
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

                    <Form.Group controlId='price' className="mb-4">
                    <Form.Label>Price</Form.Label>
                        <Form.Control
                            type = 'number'
                            placeholder = 'Enter price'
                            value = {price}
                            onChange = {(e) => setPrice(e.target.value)}
                        />      
                    </Form.Group>

                    <Form.Group controlId='image' className="mb-4">
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type = 'text'
                            placeholder = 'Enter image'
                            value = {image}
                            onChange = {(e) => setImage(e.target.value)}
                        />    
                        
                        <Form.Control 
                            type='file'
                            label= 'Choose File'
                            onChange= {uploadFileHandler}
                        >
                        
                        </Form.Control>  
                        {uploading && <Loader/>}                
                    
                    </Form.Group>


                    <Form.Group controlId='brand' className="mb-4">
                    <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type = 'text'
                            placeholder = 'Enter brand'
                            value = {brand}
                            onChange = {(e) => setBrand(e.target.value)}
                        />      
                    </Form.Group>


                    <Form.Group controlId='countinstock' className="mb-4">
                    <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type = 'number'
                            placeholder = 'Enter stock'
                            value = {countInstock}
                            onChange = {(e) => setCountInstock(e.target.value)}
                        />      
                    </Form.Group>


                    <Form.Group controlId='category' className="mb-4">
                    <Form.Label>Category</Form.Label>
                        <Form.Control
                            type = 'text'
                            placeholder = 'Enter category'
                            value = {category}
                            onChange = {(e) => setCategory(e.target.value)}
                        />      
                    </Form.Group>

                    <Form.Group controlId='description' className="mb-4">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            type = 'text'
                            placeholder = 'Enter description'
                            value = {description}
                            onChange = {(e) => setDescription(e.target.value)}
                        />      
                    </Form.Group>



                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>    

            )}
            
        </FormContainer>
    </div>
    
  )}

export default ProductEditScreen

