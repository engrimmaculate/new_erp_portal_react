
# Golden ERP Portal

A modern, role-based ERP portal built with React, Tailwind CSS, and Framer Motion. This app features authentication, user management, responsive design, and custom theming for enterprise resource planning. It includes comprehensive modules for:

- Accounting operations
- Customer and customer management
- Billing and invoicing management
- Vendor and vendor management system
- HR & payroll systems
- Leave and permission management
- Project management system
- QHSSE and access control systems
- Work permits system
- Fitness to work
- Fleet management system
- Journey management

## Features

- **User Authentication & Role Management**: Secure login/logout, role-based access, and user context. Admin dashboard for managing users and assigning roles.
- **Responsive Sidebar Navigation**: Sidebar is always visible on desktop, toggled on mobile, and adapts menu items based on user role.
- **Custom Theming**: Red primary color, black secondary, white text, and gradient backgrounds for a modern look.
- **Dashboard Views**: Optimized dashboard content for each user type, covering all major ERP modules listed above.
- **Modern UI/UX**: Framer Motion animations, lucide-react icons, and Tailwind CSS styling.
- **Password Visibility Toggle**: User-friendly login form with icons and show/hide password functionality.

## Project Structure

```
keves-erp-app/
  erp-app/
    src/
      components/
        SideBar.jsx
        Header.jsx
        Login.jsx
        UserManagement.jsx
        ui/
          button.jsx
          toast.jsx
          toaster.jsx
          use-toast.jsx
      context/
        AuthContext.jsx
      App.jsx
      main.jsx
      index.css
    public/
      banner.jpg
      keves-new-logo.png
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-org/keves-erp-portal.git
   cd keves-erp-portal
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```sh
npm run build
# or
yarn build
```

## Authentication & Roles
- Demo users are pre-configured in `AuthContext.jsx`.
- Roles include: `ict`, `hr`, `logistics`, `accounts`, `operations`, `business`, `qhsse`, `project`.
- Admins can manage users and assign roles via the dashboard.

## Customization
- Update colors and gradients in `index.css` and Tailwind config.
- Add or modify menu items in `SideBar.jsx`.
- Replace logo and banner images in the `public/assets` folder.

## Dependencies
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/)
- [react-router-dom](https://reactrouter.com/)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Maintainers
- [Emmanuel Nwachukwu](mailto:your.info@goldenimpactdevs.com)
- [Golden Impact Digitals](https://www.goldenimpactdevs.com)

---

For questions or support, open an issue or contact the maintainer.
