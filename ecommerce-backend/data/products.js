const products = [
    {
      name: "Wireless Bluetooth Earbuds",
      image: "/images/airpods.jpg",
      description:
        "Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers immersive listening experience. Built-in microphone allows you to take calls while working.",
      brand: "Apple",
      category: "Electronics",
      price: 89.99,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
      isFeatured: true,
    },
    {
      name: "Premium Smartphone",
      image: "/images/phone.jpg",
      description:
        "Introducing the latest smartphone with a 6.7-inch Super Retina XDR display. Ceramic Shield with 4x better drop performance. A14 Bionic chip, the fastest chip ever in a smartphone.",
      brand: "Apple",
      category: "Electronics",
      price: 599.99,
      countInStock: 7,
      rating: 4.0,
      numReviews: 8,
      isFeatured: true,
      discount: 10,
    },
    {
      name: "Digital Camera",
      image: "/images/camera.jpg",
      description:
        "Characterized by versatile imaging specs, the camera offers high-resolution stills and video recording capabilities. 24.2MP CMOS sensor and DIGIC 8 image processor.",
      brand: "Canon",
      category: "Electronics",
      price: 929.99,
      countInStock: 5,
      rating: 3,
      numReviews: 12,
    },
    {
      name: "Gaming Console",
      image: "/images/playstation.jpg",
      description:
        "The ultimate home entertainment center starts with this powerful console. Lightning-fast loading with an ultra-high speed SSD. Deeper immersion with support for haptic feedback.",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      numReviews: 12,
      isFeatured: true,
    },
    {
      name: "Gaming Mouse",
      image: "/images/mouse.jpg",
      description:
        "Get a better handle on your games with this gaming mouse. The wireless form factor is engineered for serious gaming and designed for comfort during extended sessions.",
      brand: "Logitech",
      category: "Electronics",
      price: 49.99,
      countInStock: 7,
      rating: 3.5,
      numReviews: 10,
    },
    {
      name: "Smart Speaker",
      image: "/images/alexa.jpg",
      description:
        "Meet the smart speaker that adapts to your room. Smart speaker with voice control built in. Ask it questions, control smart home devices, play music, and more.",
      brand: "Amazon",
      category: "Electronics",
      price: 29.99,
      countInStock: 0,
      rating: 4,
      numReviews: 12,
      discount: 15,
    },
    {
      name: "Fitness Tracker",
      image: "/images/fitbit.jpg",
      description:
        "Track your activity, exercise, sleep, weight, and more. Water resistant and long battery life. Syncs with your phone to show notifications and more.",
      brand: "Fitbit",
      category: "Wearables",
      price: 99.99,
      countInStock: 15,
      rating: 4.2,
      numReviews: 8,
      isFeatured: true,
    },
    {
      name: "Wireless Headphones",
      image: "/images/headphones.jpg",
      description:
        "Premium wireless over-ear headphones with active noise cancellation. Up to 30 hours of battery life. Comfortable ear cups and adjustable headband.",
      brand: "Sony",
      category: "Audio",
      price: 249.99,
      countInStock: 4,
      rating: 4.7,
      numReviews: 15,
      discount: 5,
    },
    
      {
        "id": 1,
        "name": "Wireless Bluetooth Headphones",
        "description": "Premium noise-cancelling headphones with 30-hour battery life and comfortable over-ear design. Perfect for travel and daily commutes.",
        "imageUrl": "https://picsum.photos/id/367/500/500",
        "price": 149.99,
        "category": "Electronics",
        "rating": 4.7,
        "isFeatured": true
      },
      {
        "id": 2,
        "name": "Men's Casual Cotton T-Shirt",
        "description": "Soft, breathable cotton t-shirt with a modern fit. Available in multiple colors and sizes.",
        "imageUrl": "https://picsum.photos/id/669/500/500",
        "price": 24.95,
        "category": "Clothing",
        "rating": 4.3,
        "isFeatured": false
      },
      {
        "id": 3,
        "name": "The Art of Programming",
        "description": "Comprehensive guide to modern programming techniques and best practices. Suitable for beginners and experienced developers alike.",
        "imageUrl": "https://picsum.photos/id/24/500/500",
        "price": 39.99,
        "category": "Books",
        "rating": 4.8,
        "isFeatured": true
      },
      {
        "id": 4,
        "name": "Smart Home Security Camera",
        "description": "HD security camera with motion detection, night vision, and smartphone alerts. Easy to install and connect to your home network.",
        "imageUrl": "https://picsum.photos/id/250/500/500",
        "price": 79.99,
        "category": "Electronics",
        "rating": 4.5,
        "isFeatured": true
      },
      {
        "id": 5,
        "name": "Ceramic Coffee Mug Set",
        "description": "Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe with elegant minimalist design.",
        "imageUrl": "https://picsum.photos/id/30/500/500",
        "price": 34.50,
        "category": "Home Goods",
        "rating": 4.2,
        "isFeatured": false
      },
      {
        "id": 6,
        "name": "Women's Running Shoes",
        "description": "Lightweight, cushioned running shoes with breathable mesh upper and responsive foam midsole for maximum comfort.",
        "imageUrl": "https://picsum.photos/id/21/500/500",
        "price": 89.95,
        "category": "Clothing",
        "rating": 4.6,
        "isFeatured": true
      },
      {
        "id": 7,
        "name": "Stainless Steel Water Bottle",
        "description": "Vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
        "imageUrl": "https://picsum.photos/id/118/500/500",
        "price": 29.99,
        "category": "Home Goods",
        "rating": 4.4,
        "isFeatured": false
      },
      {
        "id": 8,
        "name": "Historical Fiction: The Last Kingdom",
        "description": "Immersive historical fiction novel set in medieval Europe. A tale of adventure, politics, and personal discovery.",
        "imageUrl": "https://picsum.photos/id/24/500/500",
        "price": 18.99,
        "category": "Books",
        "rating": 4.9,
        "isFeatured": false
      },
      {
        "id": 9,
        "name": "Portable Bluetooth Speaker",
        "description": "Waterproof, rugged Bluetooth speaker with 360-degree sound and 20-hour battery life. Perfect for outdoor adventures.",
        "imageUrl": "https://picsum.photos/id/27/500/500",
        "price": 59.99,
        "category": "Electronics",
        "rating": 4.1,
        "isFeatured": true
      },
      {
        "id": 10,
        "name": "Scented Soy Candle Set",
        "description": "Set of 3 hand-poured soy candles with essential oil fragrances. Long-burning and presented in reusable glass containers.",
        "imageUrl": "https://picsum.photos/id/90/500/500",
        "price": 42.00,
        "category": "Home Goods",
        "rating": 4.7,
        "isFeatured": false
      },
      {
        "id": 11,
        "name": "Leather Wallet for Men",
        "description": "Genuine leather bifold wallet with RFID blocking technology. Features multiple card slots and a sleek, minimalist design.",
        "imageUrl": "https://picsum.photos/id/160/500/500",
        "price": 49.95,
        "category": "Clothing",
        "rating": 4.5,
        "isFeatured": false
      },
      {
        "id": 12,
        "name": "Smart Fitness Tracker",
        "description": "Advanced fitness tracker with heart rate monitoring, sleep tracking, and 7-day battery life. Syncs wirelessly with your smartphone.",
        "imageUrl": "https://picsum.photos/id/119/500/500",
        "price": 129.99,
        "category": "Electronics",
        "rating": 4.6,
        "isFeatured": true
      },
      {
        "id": 13,
        "name": "Beginner's Guide to Cooking",
        "description": "Step-by-step cookbook for beginners with simple, delicious recipes and fundamental cooking techniques explained.",
        "imageUrl": "https://picsum.photos/id/24/500/500",
        "price": 22.50,
        "category": "Books",
        "rating": 4.3,
        "isFeatured": false
      },
      {
        "id": 14,
        "name": "Decorative Throw Pillow Covers",
        "description": "Set of 2 decorative throw pillow covers with modern geometric patterns. Made from durable, washable fabric.",
        "imageUrl": "https://picsum.photos/id/58/500/500",
        "price": 19.99,
        "category": "Home Goods",
        "rating": 4.0,
        "isFeatured": false
      },
      {
        "id": 15,
        "name": "Women's Crossbody Handbag",
        "description": "Stylish crossbody bag with adjustable strap and multiple compartments. Perfect for everyday use or casual outings.",
        "imageUrl": "https://picsum.photos/id/91/500/500",
        "price": 54.95,
        "category": "Clothing",
        "rating": 4.4,
        "isFeatured": true
      }
    ]
  
  
  export default products
  