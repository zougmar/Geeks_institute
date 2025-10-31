import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const OrderForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams();

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/api/menu');
      setMenuItems(response.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch order details if in view mode
  const fetchOrderDetails = async () => {
    if (!orderId) return;

    try {
      const response = await axios.get('/api/orders');
      const order = response.data.find(o => o._id === orderId);

      if (order) {
        setOrderDetails(order);
        setTableNumber(order.table_number);
        setCart(order.items);
        setIsViewMode(true);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchOrderDetails();
  }, [orderId]);

  // Filter menu items by category
  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item._id);

    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item._id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([
        ...cart,
        {
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: 1
        }
      ]);
    }
  };

  // Update item quantity in cart
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Submit order
  const submitOrder = async () => {
    if (!tableNumber || cart.length === 0) {
      alert('Please select a table and add items to your order');
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        table_number: tableNumber,
        items: cart,
        total_amount: calculateTotal()
      };

      await axios.post('/api/orders', orderData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isViewMode ? 'Order Details' : 'Create New Order'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isViewMode 
            ? 'View the details of this order' 
            : 'Select items from the menu to create a new order'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Menu</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenuItems.map(item => (
                <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="text-indigo-600 font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  {!isViewMode && (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>

            {/* Table Number */}
            <div className="mb-4">
              <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-1">
                Table Number
              </label>
              {isViewMode ? (
                <div className="text-gray-900">{orderDetails?.table_number}</div>
              ) : (
                <input
                  type="number"
                  id="table"
                  min="1"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border"
                  placeholder="Enter table number"
                />
              )}
            </div>

            {/* Cart Items */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
              {cart.length === 0 ? (
                <div className="text-sm text-gray-500 italic">No items in cart</div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">${item.price.toFixed(2)} each</div>
                      </div>
                      {isViewMode ? (
                        <div className="text-sm font-medium text-gray-900">x{item.quantity}</div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total:</span>
                <span className="text-lg font-bold text-indigo-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Order Status (View Mode Only) */}
            {isViewMode && orderDetails && (
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    orderDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    orderDetails.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    orderDetails.status === 'ready' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {orderDetails.status}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {!isViewMode && (
              <button
                onClick={submitOrder}
                disabled={submitting || cart.length === 0 || !tableNumber}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
