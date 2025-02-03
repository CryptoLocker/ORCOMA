// app/layout.jsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Gestión de Calidad y SST</title>
      </head>
      <body>{children}</body>
    </html>
  );
}