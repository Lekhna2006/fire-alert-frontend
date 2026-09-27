import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TextField, PasswordField } from '../components/TextField';
import { PrimaryButton } from '../components/PrimaryButton';

interface RegisterScreenProps {
  onRegistered: () => void;
  onLogin: () => void;
}

// Register screen: name, email, password, confirm password.
export function RegisterScreen({ onRegistered, onLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deviceid, setDeviceId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirm) {
    setError('Passwords do not match');
    return;
  }

  setError('');
  setLoading(true);

  try {
    const response = await fetch('https://fire-alert-backend-1.onrender.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        deviceId: deviceid,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    setLoading(false);
onRegistered();
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
            <Icon name="person-add" size={32} className="text-red-700" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-neutral-800">Create account</h1>
          <p className="mt-1 text-sm text-neutral-500">Join Fire Alert to stay safe</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <TextField
            label="Name"
            icon="person"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          <TextField
            label="Email"
            icon="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
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
          <PasswordField
            label="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <PasswordField
            label="Confirm Password"
            icon="lock"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />

          {error && (
            <p className="text-sm text-red-600 -mt-1 animate-fade-in">{error}</p>
          )}

          <PrimaryButton type="submit" loading={loading} className="mt-1">
            Register
          </PrimaryButton>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <span className="text-sm text-neutral-500">Already have an account?</span>
          <button onClick={onLogin} className="text-sm font-semibold text-red-700 hover:text-red-800 transition-colors">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
