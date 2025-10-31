import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

// Create context
const SocketContext = createContext();

// Socket provider component
export const SocketProvider = ({ children, socket }) => {
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Connect to socket
      socket.connect();

      // Join appropriate room based on user role
      if (user.role === 'kitchen') {
        socket.emit('join_room', { room: 'kitchen' });
      } else if (user.role === 'waiter') {
        socket.emit('join_room', { room: `waiter_${user.id}` });
      }

      // Listen for connection events
      socket.on('connect', () => {
        setConnected(true);
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        setConnected(false);
        console.log('Disconnected from server');
      });

      // Clean up on unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [isAuthenticated, user, socket]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocket = () => useContext(SocketContext);

export default SocketContext;
