# UPSmart Canteen Admin Dashboard

A comprehensive admin dashboard for managing a campus canteen ordering system. Built with Vue.js 3, Vite, and modern web technologies.

## 🎯 Features

### 📊 Dashboard
- **Real-time Statistics**: Total orders, completed orders, in-progress orders, and daily revenue
- **Recent Orders**: Quick view of the 5 most recent orders
- **Top Selling Items**: Track which items are selling best
- **Quick Actions**: Fast access to key admin functions

### 📦 Orders Management
- **Order Tracking**: View all orders with detailed information
- **Status Management**: Update order status (Pending → Preparing → Ready → Completed)
- **Search & Filter**: Find orders by ID, student name, or filter by status
- **Order Details**: View complete order information including student ID and items
- **Order Cancellation**: Cancel pending or preparing orders

### 🍽️ Menu Management
- **Add New Items**: Create menu items with category, price, and stock
- **Edit Items**: Update prices and stock levels easily
- **Delete Items**: Remove items from the menu
- **Stock Tracking**: Monitor inventory with low-stock alerts
- **Category Organization**: Organize items by category (Meals, Snacks, Drinks)
- **Tags**: Mark items as BESTSELLER, NEW, or POPULAR

### 📈 Analytics & Reports
- **Daily Orders Chart**: Visualize order volume throughout the week
- **Daily Revenue**: Track revenue generation by day
- **Peak Hours Analysis**: Identify busiest times
- **Payment Methods**: See breakdown of payment methods used
- **Student Demographics**: Orders by year level (1st, 2nd, 3rd, 4th year)
- **Weekly Summary**: Total orders, revenue, average order value

### ⚙️ Settings & Configuration
- **Restaurant Settings**: Store name, location, contact details
- **Operating Hours**: Set opening/closing times and peak hours
- **Payment Methods**: Configure accepted payment methods (Cash, GCash, Bank, Student Account)
- **Notifications**: Email, SMS, low-stock alerts, and daily reports
- **Inventory Settings**: Set low-stock warning levels, minimum order values
- **Admin Account**: Manage admin profile and password
- **Data Management**: Backup data, reset daily data, clear all data

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TopBar.vue              # Top navigation bar
│   ├── Header.vue              # Main header with profile menu
│   ├── Sidebar.vue             # Left navigation menu
│   ├── Dashboard.vue           # Main statistics dashboard
│   ├── Orders.vue              # Orders management interface
│   ├── MenuManagement.vue      # Menu CRUD operations
│   ├── Analytics.vue           # Analytics & reports
│   ├── Settings.vue            # Configuration page
│   ├── DishCard.vue            # Menu item card component
│   └── Footer.vue              # Footer component
├── App.vue                     # Root component
├── main.js                     # Vue app entry point
└── index.css                   # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3001/`

## 📋 Admin Dashboard Menu

1. **📊 Dashboard** - View statistics and recent activity
2. **📦 Orders** - Manage student orders
3. **🍽️ Menu Management** - Add/edit/delete menu items
4. **📈 Analytics** - View detailed reports and trends
5. **⚙️ Settings** - Configure system settings

## 💳 Order Status Flow

```
PENDING → PREPARING → READY → COMPLETED
   ↓
CANCELLED (at any point)
```

## 🎨 Design System

### Color Scheme
- **Primary Green**: `#2D5016` - Main brand color
- **Gold Accent**: `#C8A961` - Secondary highlights
- **Dark Green**: `#1a3308` - Dark backgrounds
- **Cream**: `#F5F1E8` - Light background
- **Charcoal**: `#2C2C2C` - Text color

### Typography
- **Font**: Work Sans (primary), Archivo Black (headings)
- **Bold Font**: Archivo Black for strong emphasis
- **Responsive**: Mobile-first design approach

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1600px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🔐 Security Features

- Profile menu with logout option
- Password change functionality
- Admin account management
- Activity tracking capabilities
- Data backup & export

## 📊 Sample Data

The dashboard comes with sample data including:
- 6 sample orders (pending, preparing, ready, completed)
- 9 menu items across 3 categories
- Daily analytics data for the week
- Payment method distribution
- Student year-level distribution

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **State Management**: Vue's Composition API
- **Font**: Google Fonts (Archivo Black, Work Sans)

## 📈 Key Metrics Tracked

- Total daily orders
- Completed orders
- In-progress orders (pending + preparing)
- Daily revenue (₱)
- Average order value (₱)
- Top selling items
- Peak hours
- Payment method distribution
- Orders by student year level

## 🎯 Campus-Specific Features

- Student ID tracking
- Student year level analytics
- Campus-only ordering system
- Operating hours based on class schedule
- Student account balance payment option
- Peak hours during lunch time (11:30 AM - 1:30 PM)

## 📝 Notes

- All data is stored in component state (frontend only)
- For production, connect to a backend database
- Backup and restore functionality for data management
- Settings are not persisted by default (add backend integration)

## 🤝 Support

For issues or feature requests, please contact the IT department.

## 📄 License

© 2026 PHINMA University of Pangasinan - UPSmart Canteen System

---

**Version**: 1.0.0  
**Last Updated**: January 30, 2026  
**Status**: Production Ready

