import { useEffect, useState } from 'react';
import { AppBar } from '../components/AppBar';
import { Icon } from '../components/Icon';
import { PrimaryButton } from '../components/PrimaryButton';

interface ProfileScreenProps {
  onLogout: () => void;
}

interface User {
  name: string;
  email: string;
  deviceId: string;
}

// Profile screen: avatar, name, email, device ID, logout button.
export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    const email = localStorage.getItem('email');

    if (!deviceId || !email) {
      setError('User information not found');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://fire-alert-backend-1.onrender.com/api/users/profile/${encodeURIComponent(deviceId)}/${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();

        setUser(data);
        setError('');
      } catch (error) {
        setError('Unable to connect to server');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
        <AppBar title="Profile" icon="person" />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
        <AppBar title="Profile" icon="person" />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="absolute inset-0 bg-neutral-50 flex flex-col pt-11">
      <AppBar title="Profile" icon="person" />

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24">
        <div className="flex flex-col items-center mt-6 animate-fade-in-up">
          <div className="h-28 w-28 rounded-full bg-red-700 text-white flex items-center justify-center text-3xl font-semibold shadow-lg shadow-red-700/20">
            {initials}
          </div>

          <h2 className="mt-5 text-xl font-bold text-neutral-800">
            {user.name}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {user.email}
          </p>
        </div>

        <div
          className="mt-8 bg-white rounded-2xl shadow-sm ring-1 ring-black/5 divide-y divide-neutral-100 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <InfoRow
            icon="person"
            label="Name"
            value={user.name}
          />

          <InfoRow
            icon="email"
            label="Email"
            value={user.email}
          />

          <InfoRow
            icon="cpu"
            label="DeviceId"
            value={user.deviceId}
          />
        </div>

        <div
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <PrimaryButton
            onClick={onLogout}
            className="!bg-white !text-red-700 ring-1 ring-red-200 hover:!bg-red-50"
          >
            <span className="flex items-center gap-2">
              <Icon name="logout" size={20} />
              Logout
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: 'person' | 'email' | 'cpu';
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center">
        <Icon
          name={icon}
          size={20}
          className="text-neutral-500"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-neutral-400">{label}</p>

        <p className="text-sm font-medium text-neutral-800 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}