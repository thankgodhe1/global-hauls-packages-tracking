# Delivery Platform – Phase 3 + Phase 4 Public Tracking UI

Beautiful mobile-first public interface matching the screenshot, now with sophisticated live map behaviour.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home – greeting, search, quick actions, Active Shipments, promo, bottom nav |
| `track.html` | Tracking Details – Live Map / Timeline / Details + **Phase 4 enhancements** |

## Phase 4 Enhancements

- **Transport-mode aware map**
  - Different marker icon & color for Air / Sea / Land / Rail / Express
  - Route line style changes (dash pattern, color, weight) per mode
- **Smooth marker animation** when admin updates location (eased movement over ~1.4s)
- **Follow mode** – map keeps the current location centered
- **Fit Route** button – zooms to show full origin→destination path
- **Live indicator** (green pulsing “LIVE”) when Socket.IO is connected
- Progress bar color adapts to transport mode
- Better popups, legend, and visual polish

## How live updates work

1. User opens `track.html?tn=ZX...`
2. Page joins the Socket.IO room for that tracking number
3. Admin changes status or current location in the Admin Panel
4. Backend geocodes the new location, updates history & progress, emits `trackingUpdate`
5. Public page receives the event → smoothly animates the marker, redraws the route with the correct transport style, updates progress stages and history

## How to test

1. Start backend + seed
2. Create or edit a delivery in Admin (change location / status / transport mode)
3. Open the public tracking page for that number
4. Watch the marker move, route restyle, and progress update in real time
