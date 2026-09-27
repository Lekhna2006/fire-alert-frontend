import type { ComponentType, SVGProps } from 'react';
import {
  Home,
  History,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Cpu,
  UserPlus,
  LogOut,
  Trash2,
  Wifi,
  WifiOff,
  CheckCircle,
  Flame,
  Wind,
  Clock,
  Bell,
} from 'lucide-react';

// Material-style icon registry. Keeps icon usage consistent across the app
// and makes swapping to real Material Icons (react-native-vector-icons) trivial
// when porting to React Native.
export type IconName =
  | 'home'
  | 'history'
  | 'person'
  | 'email'
  | 'lock'
  | 'visibility'
  | 'visibility-off'
  | 'cpu'
  | 'person-add'
  | 'logout'
  | 'clear'
  | 'wifi'
  | 'wifi-off'
  | 'check-circle'
  | 'fire'
  | 'smoke'
  | 'schedule'
  | 'alert';

const registry: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: Home,
  history: History,
  person: User,
  email: Mail,
  lock: Lock,
  visibility: Eye,
  'visibility-off': EyeOff,
  cpu:Cpu,
  'person-add': UserPlus,
  logout: LogOut,
  clear: Trash2,
  wifi: Wifi,
  'wifi-off': WifiOff,
  'check-circle': CheckCircle,
  fire: Flame,
  smoke: Wind,
  schedule: Clock,
  alert: Bell,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, className, strokeWidth = 2 }: IconProps) {
  const Cmp = registry[name];
  return <Cmp width={size} height={size} className={className} strokeWidth={strokeWidth} />;
}
