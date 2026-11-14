# Delivery Platform – Phase 2 Admin Panel

Complete pure HTML + CSS + Vanilla JS admin interface connected to the Phase 1 backend via Axios and Socket.IO.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Admin login |
| `dashboard.html` | Stats + searchable/filterable list of all trackings |
| `create.html` | Full form to create a new delivery (with image upload + transport mode) |
| `edit.html` | Edit status, location, transport mode, notes + view history |

## Features

- JWT authentication (token stored in localStorage)
- Create delivery with product image (sent to Cloudinary)
- Transport mode selector (Air / Sea / Land / Rail / Express)
- Live status & location updates
- Real-time dashboard refresh via Socket.IO
- Filters by status and transport mode
- Search by tracking number, customer name or email
- Progress percentage display
- Tracking history timeline
- Responsive design

## How to use

1. Make sure the backend is running on `http://localhost:5000`
2. Open `frontend/admin/index.html` in a browser (or serve the folder with any static server)
3. Login with the admin credentials created by the seed script:
   - Email: `admin@deliveryplatform.com`
   - Password: `Admin@123456`

If you need to change the API URL, edit `js/config.js`.

## File structure

```
admin/
├── index.html
├── dashboard.html
├── create.html
├── edit.html
├── css/
│   └── admin.css
├── js/
│   ├── config.js
│   ├── api.js
│   └── (page-specific scripts are inline)
└── README.md
```
