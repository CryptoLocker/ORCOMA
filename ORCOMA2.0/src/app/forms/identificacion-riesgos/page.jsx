// app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Bienvenido al Sistema de Gestión de Calidad y SST</h1>
      <p>
        <Link href="/formulario">Ir al formulario de identificación de riesgos</Link>
      </p>
    </div>
  );
}