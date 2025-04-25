import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/PlaceOrderPage.jsx';
import UserListPage from './pages/admin/UserListPage.jsx';
import UserEditPage from './pages/admin/UserEditPage.jsx';
import ProductListPage from './pages/admin/ProductListPage.jsx';
import ProductEditPage from './pages/admin/ProductEditPage.jsx';
import OrderListPage from './pages/admin/OrderListPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
// In your main.jsx or App.jsx


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/category/:category" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
            </Route>
            
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/userlist" element={<UserListPage />} />
              <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
              <Route path="/admin/productlist" element={<ProductListPage />} />
              <Route path="/admin/productlist/:pageNumber" element={<ProductListPage />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
              <Route path="/admin/orderlist" element={<OrderListPage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



