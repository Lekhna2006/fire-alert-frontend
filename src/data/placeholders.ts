// Placeholder data and types for the Fire Alert frontend.
// These mimic the shape of responses the Spring Boot REST API will return
// once the backend (Spring Boot + MongoDB + ESP32) is integrated.

export type DeviceState = 'Online' | 'Offline';
export type DetectionState = 'Safe' | 'Fire Detected' | 'Normal' | 'Smoke Detected';

export interface DeviceStatus {
  device: DeviceState;
  fire: DetectionState;
  smoke: DetectionState;
  lastUpdated: string; // formatted "2026-08-02 09:42"
}

export type AlertType = 'Fire Detected' | 'Smoke Detected';

export interface AlertRecord {
  id: string;
  type: AlertType;
  date: string; // "2026-08-02"
  time: string; // "09:42 AM"
}  

export interface UserProfile {
  name: string;
  email: string;
  deviceid: string;
}

// Current sensor snapshot shown on the Home screen.
export const deviceStatus: DeviceStatus = {
  device: 'Offline',
  fire: 'Safe',
  smoke: 'Normal',
  lastUpdated: '02 Aug 2026, 09:42 AM',
};

// Sample alert history records.
export const alertHistory: AlertRecord[] = [
  { id: 'a1', type: 'Fire Detected', date: '2026-08-02', time: '09:41 AM' },
  { id: 'a2', type: 'Smoke Detected', date: '2026-08-01', time: '18:07 PM' },
  { id: 'a3', type: 'Smoke Detected', date: '2026-07-30', time: '02:13 AM' },
  { id: 'a4', type: 'Fire Detected', date: '2026-07-28', time: '23:55 PM' },
  { id: 'a5', type: 'Smoke Detected', date: '2026-07-25', time: '07:30 AM' },
];

// Sample logged-in user shown on the Profile screen.
export const sampleUser: UserProfile = {
  name: 'Chillara Moditha Naga Lakshmi',
  email: 'moditha@example.com',
  deviceid: 'esp1'
};
