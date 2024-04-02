import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
// import { Home } from './pages/index'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from 'react-toastify' 
import { AllProducts, NoPage, Order, Cart, Home, Login, Signup, Dasboard } from './pages/index.js'
import MyContextPro from './context/data/MyContextPro.jsx'
import ProductInfo from './pages/productInfo/ProductInfo.jsx'
import UpdateProduct from './pages/admin/pages/UpdateProducts.jsx'
import AddProduct from './pages/admin/pages/AddProducts.jsx'
import { ProtectedRouteAdmin, ProtectedRouteUser } from './components/protectedRoute/ProtectedRoute.jsx'
import ProductCard from './components/productCard/ProductCard.jsx'
import Wishlist from './pages/Wishlist/Wishlist.jsx'
function App() {

  return (
    <MyContextPro>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="order" element={
          <ProtectedRouteUser>
            <Order />
          </ProtectedRouteUser>
        } />
        <Route path="nopage" element={<NoPage />} />
        <Route path="allproducts" element={<AllProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="productInfo/:id" element={<ProductInfo />} />
        <Route path="productCard" element={<ProductCard/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="updateProduct" element={
          // <ProtectedRouteAdmin>
            <UpdateProduct/>
          // </ProtectedRouteAdmin>
        } />
        <Route path="addProduct" element={
          // <ProtectedRouteAdmin>
            <AddProduct/>
          // </ProtectedRouteAdmin>
        } />
        <Route path="dasboard" element={
          // <ProtectedRouteAdmin>
            <Dasboard />
          // </ProtectedRouteAdmin>
        } />
        <Route path="*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyContextPro>
  )
}

export default App
