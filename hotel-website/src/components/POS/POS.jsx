import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './POS.css';

const POS = () => {
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderType, setOrderType] = useState('dine-in');
  const [roomNumber, setRoomNumber] = useState('');

  const menuCategories = [
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'alcohol', name: 'Bar' }
  ];

  const menuItems = [
    { id: 1, category: 'appetizers', name: 'Spring Rolls', price: 8, description: 'Crispy vegetable rolls' },
    { id: 2, category: 'appetizers', name: 'Soup of the Day', price: 6, description: 'Chef\'s daily selection' },
    { id: 3, category: 'appetizers', name: 'Salad', price: 10, description: 'Fresh garden salad' },
    { id: 4, category: 'mains', name: 'Grilled Chicken', price: 22, description: 'Served with vegetables' },
    { id: 5, category: 'mains', name: 'Beef Steak', price: 28, description: 'Premium cut with sauce' },
    { id: 6, category: 'mains', name: 'Fish & Chips', price: 20, description: 'Fresh local fish' },
    { id: 7, category: 'mains', name: 'Pasta', price: 18, description: 'Italian style' },
    { id: 8, category: 'mains', name: 'Jollof Rice', price: 15, description: 'Local specialty' },
    { id: 9, category: 'desserts', name: 'Chocolate Cake', price: 10, description: 'Rich & creamy' },
    { id: 10, category: 'desserts', name: 'Ice Cream', price: 8, description: '3 scoops' },
    { id: 11, category: 'desserts', name: 'Fruit Platter', price: 12, description: 'Seasonal fruits' },
    { id: 12, category: 'beverages', name: 'Coffee', price: 4, description: 'Freshly brewed' },
    { id: 13, category: 'beverages', name: 'Tea', price: 3, description: 'Various flavors' },
    { id: 14, category: 'beverages', name: 'Juice', price: 6, description: 'Freshly squeezed' },
    { id: 15, category: 'beverages', name: 'Water', price: 2, description: 'Mineral water' },
    { id: 16, category: 'alcohol', name: 'Beer', price: 6, description: 'Local & imported' },
    { id: 17, category: 'alcohol', name: 'Wine', price: 12, description: 'Red & white' },
    { id: 18, category: 'alcohol', name: 'Spirits', price: 10, description: 'Whiskey, Vodka, Gin' }
  ];

  const [orders, setOrders] = useState([
    { id: 101, type: 'dine-in', table: 5, items: [{ name: 'Grilled Chicken', qty: 2, price: 22 }], status: 'preparing', time: '12:30' },
    { id: 102, type: 'room-service', room: 301, items: [{ name: 'Coffee', qty: 2, price: 4 }], status: 'ready', time: '12:45' },
    { id: 103, type: 'takeout', items: [{ name: 'Jollof Rice', qty: 1, price: 15 }, { name: 'Salad', qty: 1, price: 10 }], status: 'pending', time: '12:50' }
  ]);

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
    
    const newOrder = {
      id: Math.floor(Math.random() * 1000) + 100,
      type: orderType,
      table: orderType === 'dine-in' ? Math.floor(Math.random() * 20) + 1 : null,
      room: orderType === 'room-service' ? roomNumber : null,
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      status: 'pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setRoomNumber('');
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <section className="pos-section" id="pos">
      <div className="container">
        <h2 className="section-title">Point of Sale</h2>
        <p className="section-subtitle">Restaurant orders & room service</p>

        <div className="pos-layout">
          <div className="menu-section">
            <div className="order-type-selector">
              <button 
                className={orderType === 'dine-in' ? 'active' : ''}
                onClick={() => setOrderType('dine-in')}
              >
                Dine In
              </button>
              <button 
                className={orderType === 'room-service' ? 'active' : ''}
                onClick={() => setOrderType('room-service')}
              >
                Room Service
              </button>
              <button 
                className={orderType === 'takeout' ? 'active' : ''}
                onClick={() => setOrderType('takeout')}
              >
                Takeout
              </button>
            </div>

            {orderType === 'room-service' && (
              <div className="room-input">
                <input
                  type="text"
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
            )}

            <div className="category-tabs">
              {menuCategories.map(cat => (
                <button
                  key={cat.id}
                  className={activeTab === cat.id ? 'active' : ''}
                  onClick={() => setActiveTab(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {menuItems.filter(item => item.category === activeTab).map(item => (
                <div key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <span className="price">{format(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-section">
            <div className="cart-header">
              <h3>Current Order</h3>
              <span className="cart-count">{cartCount} items</span>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">No items in cart</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span className="item-price">{format(item.price)}</span>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <span className="total-amount">{format(cartTotal)}</span>
            </div>

            <button 
              className="btn-place-order" 
              onClick={placeOrder}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>

        <div className="active-orders">
          <h3>Active Orders</h3>
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">#{order.id}</span>
                  <span className={`order-type ${order.type}`}>{order.type}</span>
                </div>
                <p className="order-location">
                  {order.type === 'dine-in' ? `Table ${order.table}` : 
                   order.type === 'room-service' ? `Room ${order.room}` : 'Takeout'}
                </p>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <span key={i}>{item.qty}x {item.name}</span>
                  ))}
                </div>
                <p className="order-time">{order.time}</p>
                <div className="order-actions">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default POS;
