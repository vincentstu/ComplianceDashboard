# Compliance Dashboard

A modern React + Vite application for business partner risk analysis, featuring a dashboard UI, company risk cards, search, and navigation.

## Features

- React 19, Vite, and React Router for fast development
- Dashboard layout with header, tab bar, and risk cards
- Company search and filtering
- Company risk details page with assessment options
- Modular, component-based structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd ComplianceDashboard/Dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To build the app for production:

```sh
npm run build
```

The output will be in the `dist/` folder.

### Linting

To check code quality:

```sh
npm run lint
```

## Project Structure

```
Dashboard/
  src/
    App.jsx         # Main app component
    App.css         # Global styles
    main.jsx        # Entry point
    assets/         # Images and icons
    components/     # Reusable UI components
    data/           # Static data (companyData.js)
    pages/          # Page-level components (Home, CompanyRiskDetails)
```

## Customization

- Add or edit companies in `src/data/companyData.js`.
- Update styles in `src/App.css`.
- Add new pages or components in `src/pages/` or `src/components/`.

## Troubleshooting

- If you see a blank page, ensure you have the correct version of `react-router-dom` (v6+). Run:
  ```sh
  npm install react-router-dom@^6
  ```
- For other issues, check the browser console for errors.

## License

This project is for demonstration and educational purposes.
