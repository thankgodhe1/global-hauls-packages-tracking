// API Configuration
const API_BASE_URL = 'https://global-haul-backends.onrender.com/api';
const SOCKET_URL = 'https://global-haul-backends.onrender.com';

// Status options with progress mapping
const STATUS_OPTIONS = [
  { value: 'Processing', label: 'Processing', progress: 5 },
  { value: 'Picked Up', label: 'Picked Up', progress: 20 },
  { value: 'Departed', label: 'Departed', progress: 35 },
  { value: 'In Transit', label: 'In Transit', progress: 60 },
  { value: 'Out for Delivery', label: 'Out for Delivery', progress: 85 },
  { value: 'Delivered', label: 'Delivered', progress: 100 },
  { value: 'Delayed', label: 'Delayed', progress: 55 },
  { value: 'Cancelled', label: 'Cancelled', progress: 0 }
];

const TRANSPORT_MODES = [
  { value: 'Air', label: 'Air Freight', icon: '✈️' },
  { value: 'Sea', label: 'Sea Freight', icon: '🚢' },
  { value: 'Land', label: 'Land / Truck', icon: '🚚' },
  { value: 'Rail', label: 'Rail', icon: '🚆' },
  { value: 'Express', label: 'Express', icon: '⚡' }
];

// Helper to get token
function getToken() {
  return localStorage.getItem('adminToken');
}

function setToken(token) {
  localStorage.setItem('adminToken', token);
}

function clearToken() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
}

function getAdminUser() {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
}

function setAdminUser(user) {
  localStorage.setItem('adminUser', JSON.stringify(user));
}

function isAuthenticated() {
  return !!getToken();
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function logout() {
  clearToken();
  window.location.href = 'index.html';
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Status badge class
function getStatusClass(status) {
  const map = {
    'Processing': 'status-processing',
    'Picked Up': 'status-picked',
    'Departed': 'status-departed',
    'In Transit': 'status-transit',
    'Out for Delivery': 'status-out',
    'Delivered': 'status-delivered',
    'Delayed': 'status-delayed',
    'Cancelled': 'status-cancelled'
  };
  return map[status] || 'status-processing';
}

function getTransportIcon(mode) {
  const found = TRANSPORT_MODES.find(t => t.value === mode);
  return found ? found.icon : '📦';
}
