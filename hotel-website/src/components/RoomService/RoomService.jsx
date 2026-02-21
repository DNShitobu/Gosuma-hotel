import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './RoomService.css';

const RoomService = () => {
  const { format } = useCurrency();
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const menuItems = [
    { id: 1, category: 'breakfast', name: 'Continental Breakfast', price: 15, description: 'Coffee, pastries, fruits' },
    { id: 2, category: 'breakfast', name: 'Full English', price: 22, description: ', sausageEggs, bacon, beans' },
    { id: 3, category: 'mains', name: 'Grilled Chicken', price: 25, description: 'With seasonal vegetables' },
    { id: 4, category: 'mains', name: 'Beef Burger', price: 20, description: 'With fries and coleslaw' },
    { id: 5, category: 'mains', name: 'Caesar Salad', price: 18, description: 'Chicken, croutons, parmesan' },
    { id: 6, category: 'mains', name: 'Pasta Carbonara', price: 22, description: 'Creamy bacon pasta' },
    { id: 7, category: 'desserts', name: 'Chocolate Cake', price: 12, description: 'Rich chocolate layers' },
    { id: 8, category: 'desserts', name: 'Ice Cream', price: 8, description: '3 scoops of your choice' },
    { id: 9, category: 'beverages', name: 'Coffee', price: 5, description: 'Freshly brewed' },
    { id: 10, category: 'beverages', name: 'Tea', price: 4, description: 'Selection of teas' },
    { id: 11, category: 'beverages', name: 'Fresh Juice', price: 8, description: 'Orange or mango' },
    { id: 12, category: 'alcohol', name: 'Wine (Glass)', price: 12, description: 'Red or white' },
    { id: 13, category: 'alcohol', name: 'Beer', price: 7, description: 'Local or imported' }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'alcohol', name: 'Bar' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find(i => i.id === itemId);
    if (existing.qty > 1) {
      setCart(cart.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
    } else {
      setCart(cart.filter(i => i.id !== itemId));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setCart([]);
  };

  if (orderPlaced) {
    return (
      <section className="room-service-section" id="roomservice">
        <div className="container">
          <div className="order-success">
            <span className="icon">✓</span>
            <h2>Order Placed!</h2>
            <p>Your order will be delivered to your room within 30-45 minutes.</p>
            <button className="btn" onClick={() => setOrderPlaced(false)}>Order More</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="room-service-section" id="roomservice">
      <div className="container">
        <h2 className="section-title">Room Service</h2>
        <p className="section-subtitle">Order delicious food to your room</p>

        <div className="service-layout">
          <div className="menu-area">
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={activeCategory === cat.id ? 'active' : ''}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <span className="price">{format(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-area">
            <div className="cart-header">
              <h3>Your Order</h3>
              <span className="item-count">{cartCount} items</span>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <span className="item-price">{format(item.price)}</span>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="total">
                <span>Total</span>
                <span className="total-amount">{format(cartTotal)}</span>
              </div>
              <button 
                className="btn-order" 
                onClick={placeOrder}
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </div>

            <div className="delivery-info">
              <p>🕐 Delivery: 30-45 min</p>
              <p>📞 Questions: Ext. 1234</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomService;
