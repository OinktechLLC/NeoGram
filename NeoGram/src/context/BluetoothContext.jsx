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
    if (navigator.bluetooth) {
      setIsSupported(true);
    } else {
      setError('Web Bluetooth API not supported in this browser');
    }
  }, []);

  const scanForDevices = async () => {
    if (!isSupported) {
      setError('Bluetooth not supported');
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Request Bluetooth device with generic access service
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['generic_access'] }],
        optionalServices: ['generic_attribute']
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
      if (err.name !== 'NotFoundError') {
        setError(err.message);
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
