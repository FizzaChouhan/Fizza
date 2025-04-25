import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message.jsx'
import Loader from '../../components/Loader.jsx'
import FormContainer from '../../components/FormContainer.jsx'
import { 
  useGetProductDetailsQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from '../../redux/slices/productsApiSlice'

const ProductEditPage = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId)
  
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()
  
  const { userInfo } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
      return
    }
    
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product, userInfo, navigate])
  
  const submitHandler = async (e) => {
    e.preventDefault()
    
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }
    
    try {
      await updateProduct(updatedProduct).unwrap()
      toast.success('Product updated successfully')
      refetch()
      navigate('/admin/productlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success('Image uploaded successfully')
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/admin/productlist" className="flex items-center text-blue-600 hover:underline mb-4">
        <FaArrowLeft className="mr-1" /> Back to Products
      </Link>
      
      <FormContainer>
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        
        {loadingUpdate && <Loader />}
        
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="text"
                id="image"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
                className="mt-2"
              />
              {loadingUpload && <Loader />}
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-1">
                Count In Stock
              </label>
              <input
                type="number"
                id="countInStock"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows="5"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loadingUpdate}
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditPage
