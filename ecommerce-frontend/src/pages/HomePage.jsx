import ProductList from '../components/products/ProductList';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Products</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;