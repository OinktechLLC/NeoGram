import { createContext, useContext, useState, useEffect } from 'react';

const BluetoothContext = createContext();

export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};

export const BluetoothProvider = ({ children }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Web Bluetooth API is supported
    const checkBluetoothSupport = () => {
      // Check for Web Bluetooth API support
      if (navigator.bluetooth) {
        setIsSupported(true);
        return;
      }
      
      // Check if running in insecure context (HTTP instead of HTTPS)
      if (window.isSecureContext === false) {
        setError('Web Bluetooth API requires HTTPS. Please use HTTPS or localhost.');
        return;
      }
      
      // Check for mobile-specific issues
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      if (isMobile) {
        // Check if it's Yandex Browser on mobile
        const isYandex = /yandex|yabrowser/i.test(userAgent);
        if (isYandex) {
          setError('Yandex Browser на мобильных устройствах может не поддерживать Web Bluetooth API. Попробуйте Chrome для Android.');
          return;
        }
        
        // Check if it's iOS (limited Bluetooth support)
        const isIOS = /iphone|ipad|ipod/i.test(userAgent);
        if (isIOS) {
          setError('iOS Safari имеет ограниченную поддержку Web Bluetooth API. Попробуйте Chrome на Android.');
          return;
        }
      }
      
      setError('Web Bluetooth API not supported in this browser. Try Chrome on Android or Desktop.');
    };
    
    checkBluetoothSupport();
  }, []);

  const scanForDevices = async () => {
    if (!isSupported) {
      setError('Bluetooth not supported in this browser');
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Request Bluetooth device - this MUST be called from a user gesture (click)
      // Web Bluetooth API requires user interaction for security reasons
      
      // Accept all devices (more permissive filter)
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          'battery_service',
          'device_information',
          'generic_access',
          'generic_attribute'
        ]
      });

      setDevices(prev => {
        const exists = prev.find(d => d.id === device.id);
        if (!exists) {
          return [...prev, {
            id: device.id,
            name: device.name || 'Unknown Device',
            device: device
          }];
        }
        return prev;
      });

      setIsScanning(false);
    } catch (err) {
      console.error('Bluetooth scan error:', err);
      
      if (err.name === 'NotFoundError') {
        setError('No device selected or operation cancelled');
      } else if (err.name === 'SecurityError') {
        setError('Security error: Make sure you\'re using HTTPS');
      } else if (err.name === 'NotSupportedError') {
        setError('Bluetooth not supported in this browser');
      } else {
        setError(err.message || 'Failed to scan for devices');
      }
      setIsScanning(false);
    }
  };

  const connectToDevice = async (deviceId) => {
    try {
      const deviceData = devices.find(d => d.id === deviceId);
      if (!deviceData) return;

      const server = await deviceData.device.gatt.connect();
      setConnectedDevice(deviceData);
      setIsConnected(true);
      setError(null);

      // Listen for disconnection
      deviceData.device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        setConnectedDevice(null);
      });

      return server;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const disconnect = () => {
    if (connectedDevice?.device?.gatt?.connected) {
      connectedDevice.device.gatt.disconnect();
    }
    setConnectedDevice(null);
    setIsConnected(false);
  };

  const sendMessage = async (message) => {
    if (!isConnected || !connectedDevice) {
      throw new Error('Not connected to any device');
    }

    try {
      const server = await connectedDevice.device.gatt.connect();
      // This is a simplified implementation
      // In production, you would need to specify the correct service and characteristic UUIDs
      console.log('Sending message via Bluetooth:', message);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    isSupported,
    isScanning,
    devices,
    connectedDevice,
    isConnected,
    error,
    scanForDevices,
    connectToDevice,
    disconnect,
    sendMessage
  };

  return (
    <BluetoothContext.Provider value={value}>
      {children}
    </BluetoothContext.Provider>
  );
};
