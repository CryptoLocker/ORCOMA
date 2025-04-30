// Este archivo se cargará dinámicamente solo cuando sea necesario
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { UserOptions } from "jspdf-autotable"

interface Usuario {
  id: number
  nombre: string
  cargo: string
  tema: string
  fecha: string
  realizado: boolean
}

export const generarPDF = (usuarios: Usuario[]) => {
  // BACKEND: Idealmente, la generación del PDF se haría en el servidor
  // para reducir la carga en el cliente y mejorar el rendimiento

  // Crear una nueva instancia de jsPDF
  const doc = new jsPDF()

  // Añadir título
  doc.setTextColor(242, 102, 22) // Color naranja similar al de Orcoma
  doc.setFontSize(28)
  doc.text("Orcoma", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" })

  // Añadir subtítulo
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)

  const subtitulo = "Relación de evaluaciones de trabajadores, con indicación de temas, fechas"
  const subtitulo2 = "programadas y su estado de realización."

  doc.text(subtitulo, doc.internal.pageSize.getWidth() / 2, 45, { align: "center" })
  doc.text(subtitulo2, doc.internal.pageSize.getWidth() / 2, 52, { align: "center" })

  // Preparar datos para la tabla (optimizado para grandes conjuntos de datos)
  const tableData = usuarios.map((usuario) => [
    usuario.nombre,
    usuario.cargo,
    usuario.tema,
    usuario.fecha,
    usuario.realizado ? "✓" : "✗",
  ])

  // Definir las opciones de la tabla
  const tableOptions: UserOptions = {
    startY: 70,
    head: [["nombre", "cargo", "Tema (evaluación)", "Fecha", "Realizado"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      fontStyle: "bold",
    },
    bodyStyles: {
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: "auto" },
      2: { cellWidth: "auto" },
      3: { cellWidth: "auto" },
      4: { cellWidth: 30, halign: "center" },
    },
    didDrawCell: (data) => {
      // Si es la columna "Realizado" y es una celda de cuerpo (no de cabecera)
      if (data.column.index === 4 && data.cell.section === "body") {
        const valor = data.cell.raw as string
        const x = data.cell.x + data.cell.width / 2
        const y = data.cell.y + data.cell.height / 2

        // Si está realizado (✓), colorear de verde
        if (valor === "✓") {
          const doc = data.doc as jsPDF
          doc.setFillColor(0, 200, 83) // Color verde
          doc.circle(x, y, 5, "F")
          doc.setTextColor(255, 255, 255)
          doc.text("✓", x, y + 1, { align: "center" })
        }
      }
    },
  }

  // Generar la tabla
  autoTable(doc, tableOptions)

  // Descargar el PDF
  doc.save("evaluaciones_orcoma.pdf")
}
