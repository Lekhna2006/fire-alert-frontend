import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TextField, PasswordField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

// Login screen with email + password fields and a link to register.
export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceid, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const[error, setError]=useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError('');
  setLoading(true);

  try {

    const response = await fetch(
      'https://fire-alert-backend-1.onrender.com/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          deviceId: deviceid,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || data.error || 'Login failed');
      setLoading(false);
      return;
    }

    // Save logged-in user data
    localStorage.setItem('deviceId', data.deviceId);
    localStorage.setItem('email', data.email);
    localStorage.setItem('name', data.name);

    setLoading(false);
    onLogin();

  } catch (error) {
    setLoading(false);
    setError('Unable to connect to server');
  }
};

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-16 pb-8">
        <div className="animate-fade-in-up flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-red-50 ring-1 ring-red-100 flex items-center justify-center">
            <Icon name="fire" size={36} className="text-red-700" strokeWidth={1.8} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-neutral-800">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral-500">Sign in to monitor your sensor</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <TextField
            label="Email"
            icon="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <PasswordField
            label="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <TextField
            label="DeviceId"
            icon="cpu"
            value={deviceid}
            onChange={(e) => setDeviceId(e.target.value)}
            autoComplete="deviceid"
            required
          />

          {error && (
  <p className="text-sm text-red-600">
    {error}
  </p>
)}
          <PrimaryButton type="submit" loading={loading} className="mt-2">
            Login
          </PrimaryButton>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <span className="text-sm text-neutral-500">New User?</span>
          <button onClick={onRegister} className="text-sm font-semibold text-red-700 hover:text-red-800 transition-colors">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
