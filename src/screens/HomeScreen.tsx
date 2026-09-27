import { useEffect, useState } from 'react';
import { AppBar } from '../components/AppBar';
import { StatusCard } from '../components/StatusCard';
import { Icon } from '../components/Icon';

interface CurrentState {
  deviceId: string;
  fire: string;
  smoke: string;
  lastSeen: string;
  deviceStatus: string;
}

// Home screen: live device, fire, smoke status, and last-updated timestamp.
export function HomeScreen() {

  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
  const deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    setError('Device ID not found');
    return;
  }

  const fetchCurrentState = async () => {
    try {
      const response = await fetch(
        `https://fire-alert-backend-1.onrender.com/api/current-state/${deviceId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch current state');
      }

      const data = await response.json();

      setCurrentState(data);
      setError('');
    } catch (error) {
      setError('Unable to connect to server');
    }
  };

  // Fetch immediately when page opens
  fetchCurrentState();

  // Then fetch every 5 seconds
  const interval = setInterval(fetchCurrentState, 5000);

  // Stop polling when leaving Home page
  return () => clearInterval(interval);
}, []);

  if (error) {
    return (
      <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
        <AppBar title="Home" icon="home" />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentState) {
    return (
      <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
        <AppBar title="Home" icon="home" />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  const deviceOnline = currentState.deviceStatus === 'ONLINE';
  const fireSafe = currentState.fire === 'SAFE';
  const smokeNormal = currentState.smoke === 'NORMAL';

  const lastUpdated = new Date(currentState.lastSeen).toLocaleString(
    'en-IN',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );

  return (
    <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
      <AppBar title="Home" icon="home" />

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24">

        {/* Overall status banner */}
        <div
          className={`rounded-2xl p-4 mb-4 flex items-center gap-3 animate-fade-in-up ${
            fireSafe && smokeNormal
              ? 'bg-emerald-50 ring-1 ring-emerald-200'
              : 'bg-red-50 ring-1 ring-red-200'
          }`}
        >
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              fireSafe && smokeNormal
                ? 'bg-emerald-100'
                : 'bg-red-100'
            }`}
          >
            <Icon
              name={
                fireSafe && smokeNormal
                  ? 'check-circle'
                  : 'alert'
              }
              size={26}
              className={
                fireSafe && smokeNormal
                  ? 'text-emerald-700'
                  : 'text-red-700'
              }
            />
          </div>

          <div>
            <p
              className={`font-semibold ${
                fireSafe && smokeNormal
                  ? 'text-emerald-800'
                  : 'text-red-800'
              }`}
            >
              {fireSafe && smokeNormal
                ? 'All Clear'
                : 'Active Alert'}
            </p>

            <p className="text-sm text-neutral-600">
              {fireSafe && smokeNormal
                ? 'No hazards detected right now'
                : 'Review the alerts below'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <StatusCard
            icon={deviceOnline ? 'wifi' : 'wifi-off'}
            title="Device Status"
            value={deviceOnline ? 'Online' : 'Offline'}
            tone={deviceOnline ? 'success' : 'neutral'}
            index={0}
          />

          <StatusCard
            icon="fire"
            title="Fire Status"
            value={fireSafe ? 'Safe' : 'Detected'}
            tone={fireSafe ? 'success' : 'danger'}
            index={1}
          />

          <StatusCard
            icon="smoke"
            title="Smoke Status"
            value={smokeNormal ? 'Normal' : 'Detected'}
            tone={smokeNormal ? 'success' : 'warning'}
            index={2}
          />

          <StatusCard
            icon="schedule"
            title="Last Updated"
            value={lastUpdated}
            tone="neutral"
            index={3}
          />

        </div>

      </div>
    </div>
  );
}