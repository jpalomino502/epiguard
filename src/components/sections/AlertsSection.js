import { useState, useEffect } from 'react';
import { Bell, CheckCircle } from 'lucide-react';  
import { db, doc, updateDoc } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function AlertsSection({ notifications = [] }) {
  const [animatedNotifications, setAnimatedNotifications] = useState([]);
  const [view, setView] = useState('unread'); 
  const { user } = useAuth();

  const markAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
      setAnimatedNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    setAnimatedNotifications(notifications.map(n => ({ ...n, isNew: true, read: n.read || false })));
    const timer = setTimeout(() => {
      setAnimatedNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
    }, 500);
    return () => clearTimeout(timer);
  }, [notifications]);

  const filteredNotifications = animatedNotifications.filter(notification => 
    view === 'unread' ? !notification.read : notification.read
  );

  return (
    <motion.div
      className="alerts-section p-6 bg-white rounded-lg shadow-lg mt-14 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Bell className="mr-2 text-blue-500" size={24} />
          Notifications
        </h2>
        <span className="bg-blue-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
          {filteredNotifications.length}
        </span>
      </motion.div>

      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className={`px-4 py-2 font-semibold ${view === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setView('unread')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          No Leídas
        </motion.button>
        <span className="mx-2">|</span>
        <motion.button
          className={`px-4 py-2 font-semibold ${view === 'read' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setView('read')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Leídas
        </motion.button>
      </motion.div>

      {filteredNotifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          {view === 'unread' ? 'Sin nuevas notificaciones' : 'No has leído ninguna notificación aún'}
        </p>
      ) : (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {filteredNotifications.map((notification) => (
            <motion.li
              key={notification.id}
              className={`alert-item p-3 bg-gray-50 rounded-md shadow-sm`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-800 font-medium">{notification.message}</p>
                {view === 'unread' && (
                  <motion.button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => markAsRead(notification.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle size={18} className="text-green-500" /> 
                  </motion.button>
                )}
              </div>
              <small className="text-gray-500 mt-1 block">
                {new Date(notification.timestamp.seconds * 1000).toLocaleString()}
              </small>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
