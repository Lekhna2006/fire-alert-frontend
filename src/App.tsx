import { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav, type TabKey } from './components/BottomNav';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AlertHistoryScreen } from './screens/AlertHistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';

type Route = 'splash' | 'login' | 'register' | 'main';

// Root navigation. Mirrors the React Navigation stack/tab structure the
// React Native build will use, but implemented with local state so the UI
// runs as a web app in this environment.
export default function App() {
  const [route, setRoute] = useState<Route>('splash');
  const [tab, setTab] = useState<TabKey>('home');

  if (route === 'splash') {
    return (
      
        <SplashScreen onDone={() => setRoute('login')} />
      
    );
  }

  if (route === 'login') {
    return (
      
        <LoginScreen
          onLogin={() => setRoute('main')}
          onRegister={() => setRoute('register')}
        />
      
    );
  }

  if (route === 'register') {
    return (
      
        <RegisterScreen
          onRegistered={() => setRoute('main')}
          onLogin={() => setRoute('login')}
        />
      
    );
  }

  // Main app with bottom navigation.
  return (
    <>
      {tab === 'home' && <HomeScreen />}
      {tab === 'history' && <AlertHistoryScreen />}
      {tab === 'profile' && <ProfileScreen onLogout={() => { setTab('home'); setRoute('login'); }} />}
      <BottomNav active={tab} onChange={setTab} />
    </>
  );
}
