import React, { useState, useEffect } from 'react'; 
import { db, collection, getDocs, doc, updateDoc } from '../firebaseConfig'; 
import { useAuth } from '../components/context/AuthContext'; 
import Header from '../components/common/Header'; 
import NavBar from '../components/common/NavBar'; 
import MapSection from '../components/sections/MapSection'; 
import AlertsSection from '../components/sections/AlertsSection'; 
import ReportSection from '../components/sections/ReportSection'; 
import ConfiguracionSection from '../components/sections/ConfiguracionSection'; 

export default function Home() { 
  const [activeSection, setActiveSection] = useState('map'); 
  const [notifications, setNotifications] = useState([]); 
  const { user } = useAuth();  // Current authenticated user

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const notificationsRef = collection(db, 'users', user.uid, 'notifications');
          const querySnapshot = await getDocs(notificationsRef);

          const fetchedNotifications = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setNotifications(fetchedNotifications);

          // Show browser notifications for new notifications if permission is granted
          showBrowserNotifications(fetchedNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [user]); // Fetch notifications when the user changes

  // Function to request notification permission and show browser notifications
  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  };

  // Function to display browser notifications and update 'notified' flag
  const showBrowserNotifications = async (notifications) => {
    // Check if permission is granted
    if (Notification.permission === 'granted') {
      for (const notification of notifications) {
        if (!notification.notified) {  // Only show if it's not already notified
          // Create a notification
          new Notification(notification.message, {
            body: notification.message,
            icon: '/path/to/icon.png',  // Optional: add an icon to your notification
            timestamp: new Date(notification.timestamp.seconds * 1000).toLocaleString(),
          });

          // Update the notification in Firestore to mark it as notified
          const notificationRef = doc(db, 'users', user.uid, 'notifications', notification.id);
          try {
            await updateDoc(notificationRef, { notified: true });  // Set the 'notified' flag to true
            console.log(`Notification ${notification.id} marked as notified.`);
          } catch (error) {
            console.error('Error updating notification:', error);
          }
        }
      }
    }
  };

  // Request permission on initial load if not already granted
  useEffect(() => {
    requestNotificationPermission();
  }, []); // This only runs once when the component mounts

  const renderSection = () => {
    switch (activeSection) {
      case 'map':
        return <MapSection />;
      case 'alerts':
        return <AlertsSection notifications={notifications} />;
      case 'report':
        return <ReportSection />;
      case 'configuracion':
        return <ConfiguracionSection />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow overflow-y-auto">
        {renderSection()}
      </main>
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}
