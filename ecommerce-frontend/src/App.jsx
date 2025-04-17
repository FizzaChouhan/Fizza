import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
//import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
//import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
//import RegisterPage from './pages/RegisterPage';
//import ProfilePage from './pages/ProfilePage';
//import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
