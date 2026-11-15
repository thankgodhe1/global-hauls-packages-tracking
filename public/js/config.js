const API_BASE_URL = 'https://global-haul-backend.onrender.com/api';
const SOCKET_URL = 'https://global-haul-backend.onrender.com';

const STATUS_PROGRESS = {
  'Processing': 5,
  'Picked Up': 20,
  'Departed': 35,
  'In Transit': 60,
  'Out for Delivery': 85,
  'Delivered': 100,
  'Delayed': 55,
  'Cancelled': 0
};

const TRANSPORT_CONFIG = {
  Air: {
    icon: '<i class="fa-solid fa-plane"></i>',
    iconClass: 'fa-solid fa-plane',
    label: 'Air Freight',
    color: '#2563eb',
    routeColor: '#3b82f6',
    routeWeight: 3,
    routeDash: '10, 8',
    routeOpacity: 0.75,
    markerBg: '#2563eb'
  },
  Sea: {
    icon: '<i class="fa-solid fa-ship"></i>',
    iconClass: 'fa-solid fa-ship',
    label: 'Sea Freight',
    color: '#0ea5e9',
    routeColor: '#0284c7',
    routeWeight: 4,
    routeDash: '2, 10',
    routeOpacity: 0.8,
    markerBg: '#0ea5e9'
  },
  Land: {
    icon: '<i class="fa-solid fa-truck"></i>',
    iconClass: 'fa-solid fa-truck',
    label: 'Land / Truck',
    color: '#f59e0b',
    routeColor: '#d97706',
    routeWeight: 4,
    routeDash: null,
    routeOpacity: 0.85,
    markerBg: '#f59e0b'
  },
  Rail: {
    icon: '<i class="fa-solid fa-train"></i>',
    iconClass: 'fa-solid fa-train',
    label: 'Rail',
    color: '#8b5cf6',
    routeColor: '#7c3aed',
    routeWeight: 4,
    routeDash: '12, 6, 2, 6',
    routeOpacity: 0.8,
    markerBg: '#8b5cf6'
  },
  Express: {
    icon: '<i class="fa-solid fa-bolt"></i>',
    iconClass: 'fa-solid fa-bolt',
    label: 'Express',
    color: '#ef4444',
    routeColor: '#dc2626',
    routeWeight: 3,
    routeDash: '6, 4',
    routeOpacity: 0.9,
    markerBg: '#ef4444'
  }
};

function getTransportConfig(mode) {
  return TRANSPORT_CONFIG[mode] || TRANSPORT_CONFIG.Air;
}

function getTransportIcon(mode) {
  return getTransportConfig(mode).icon;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatShortDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getStatusClass(status) {
  const map = {
    'Processing': 'badge-processing',
    'Picked Up': 'badge-picked',
    'Departed': 'badge-departed',
    'In Transit': 'badge-transit',
    'Out for Delivery': 'badge-out',
    'Delivered': 'badge-delivered',
    'Delayed': 'badge-delayed',
    'Cancelled': 'badge-cancelled'
  };
  return map[status] || 'badge-processing';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Smoothly animate a Leaflet marker from current position to a new latlng
 */
function animateMarker(marker, toLatLng, duration = 1200) {
  if (!marker) return;

  const from = marker.getLatLng();
  const to = L.latLng(toLatLng);
  const start = performance.now();

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    const lat = from.lat + (to.lat - from.lat) * ease;
    const lng = from.lng + (to.lng - from.lng) * ease;
    marker.setLatLng([lat, lng]);
    if (t < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}
