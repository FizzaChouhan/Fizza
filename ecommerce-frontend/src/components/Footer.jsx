import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopMERN</h3>
            <p className="text-gray-400">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/Electronics" className="text-gray-400 hover:text-white">Electronics</Link>
              </li>
              <li>
                <Link to="/category/Wearables" className="text-gray-400 hover:text-white">Wearables</Link>
              </li>
              <li>
                <Link to="/category/Audio" className="text-gray-400 hover:text-white">Audio</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 E-Commerce St.</p>
              <p>Tech City, TC 12345</p>
              <p>Email: support@shopmern.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} ShopMERN. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
