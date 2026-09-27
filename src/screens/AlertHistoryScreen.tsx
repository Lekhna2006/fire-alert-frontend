import { useEffect, useState } from 'react';
import { AppBar } from '../components/AppBar';
import { AlertCard } from '../components/AlertCard';
import { Icon } from '../components/Icon';

interface Alert {
  id: string;
  email: string;
  deviceId: string;
  alertType: string;
  status: string;
  deviceStatus: string;
  timestamp: string;
}

// Alert History screen: title, clear button, and a list of alert cards.
export function AlertHistoryScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');

    if (!deviceId) {
      setError('Device ID not found');
      return;
    }

    const fetchAlerts = async () => {
      try {
        const response = await fetch(
          `https://fire-alert-backend-1.onrender.com/api/alerts/${deviceId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }

        const data = await response.json();

        setAlerts(data);
        setError('');
      } catch (error) {
        setError('Unable to connect to server');
      }
    };

    fetchAlerts();

const interval = setInterval(fetchAlerts, 5000);

return () => clearInterval(interval);
}, []);
  const handleClear = async () => {
    const deviceId = localStorage.getItem('deviceId');

    if (!deviceId) {
      setError('Device ID not found');
      return;
    }

    try {
      const response = await fetch(
        `https://fire-alert-backend-1.onrender.com/api/alerts/${deviceId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to clear alerts');
      }

      setAlerts([]);
      setError('');
    } catch (error) {
      setError('Unable to clear alert history');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);

    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
      <AppBar
        title="Alert History"
        icon="history"
        action={
          <button
            onClick={handleClear}
            disabled={alerts.length === 0}
            className="flex items-center gap-1.5 text-sm font-medium text-red-700 disabled:text-neutral-300 transition-colors"
          >
            <Icon name="clear" size={18} />
            Clear History
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24">
        {error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
            <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center">
              <Icon name="history" size={28} className="text-neutral-400" />
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              No alerts recorded
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {alerts.map((alert, i) => (
              <AlertCard
                key={alert.id}
                type={
                  alert.alertType === 'FIRE'
                    ? 'Fire Detected'
                    : 'Smoke Detected'
                }
                date={formatDate(alert.timestamp)}
                time={formatTime(alert.timestamp)}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}