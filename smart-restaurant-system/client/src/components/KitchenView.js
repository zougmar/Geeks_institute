import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

const KitchenView = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, in-progress, ready

  const { user } = useAuth();
  const { socket } = useSocket();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      // Socket will handle the UI update
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  // Listen for real-time updates
  useEffect(() => {
    fetchOrders();

    if (socket) {
      // Listen for new orders
      socket.on('new_order', (newOrder) => {
        setOrders(prevOrders => [newOrder, ...prevOrders]);
      });

      // Listen for order status updates
      socket.on('order_status_update', (updatedOrder) => {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      });

      return () => {
        socket.off('new_order');
        socket.off('order_status_update');
      };
    }
  }, [socket]);

  // Filter orders based on status
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Sort orders by creation time (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get next status
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'in-progress';
      case 'in-progress':
        return 'ready';
      case 'ready':
        return 'delivered';
      default:
        return null;
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
        <h1 className="text-2xl font-bold text-gray-900">Kitchen View</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and track orders in real-time.
        </p>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'in-progress'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'ready'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Ready
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      {sortedOrders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-gray-500">No orders found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className={`px-4 py-3 border-b ${getStatusColor(order.status)}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">
                    Table #{order.table_number}
                  </h3>
                  <span className="text-xs">
                    {formatDate(order.created_at)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h4>
                <ul className="space-y-1 mb-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-900">
                    Total: ${order.total_amount.toFixed(2)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {getNextStatus(order.status) && (
                  <button
                    onClick={() => updateOrderStatus(order._id, getNextStatus(order.status))}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
                  >
                    Mark as {getNextStatus(order.status)}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KitchenView;
