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

interface UsuarioAgrupado {
  nombre: string
  cargo: string
  evaluaciones: {
    tema: string
    fecha: string
    realizado: boolean
  }[]
}

// Función para agrupar usuarios por nombre y cargo
function agruparUsuarios(usuarios: Usuario[]): UsuarioAgrupado[] {
  const grupos = new Map<string, UsuarioAgrupado>()

  usuarios.forEach((usuario) => {
    const clave = `${usuario.nombre}-${usuario.cargo}`

    if (!grupos.has(clave)) {
      grupos.set(clave, {
        nombre: usuario.nombre,
        cargo: usuario.cargo,
        evaluaciones: [],
      })
    }

    grupos.get(clave)!.evaluaciones.push({
      tema: usuario.tema,
      fecha: usuario.fecha,
      realizado: usuario.realizado,
    })
  })

  // Convertir a array y ordenar alfabéticamente por nombre
  return Array.from(grupos.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
}

// Función para formatear fecha
function formatearFecha(fecha: string): string {
  const fechaObj = new Date(fecha)
  return fechaObj.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const generarPDF = (usuarios: Usuario[]) => {
  // Crear una nueva instancia de jsPDF
  const doc = new jsPDF()

  // Configuración de colores en escala de grises para impresión económica
  const colores = {
    negro: [0, 0, 0],
    grisOscuro: [51, 51, 51],
    grisMedio: [120, 120, 120],
    grisClaro: [200, 200, 200],
    grisFondo: [240, 240, 240],
    blanco: [255, 255, 255],
  }

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // === ENCABEZADO MINIMALISTA ===
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("ORCOMA S.A.S - EVALUACIONES INTERNAS", pageWidth / 2, 15, { align: "center" })

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Relación de evaluaciones de trabajadores", pageWidth / 2, 22, { align: "center" })

  // Línea separadora sutil
  doc.setDrawColor(...colores.grisClaro)
  doc.setLineWidth(0.5)
  doc.line(15, 25, pageWidth - 15, 25)

  // Agrupar usuarios
  const usuariosAgrupados = agruparUsuarios(usuarios)

  // === FORMATO DE TABLA PRINCIPAL ===
  // Preparar datos para la tabla principal
  const datosTabla: any[][] = []

  // Encabezados de la tabla principal
  const encabezados = ["Nombre", "Cargo", "Tema de Evaluación", "Fecha Programada", "Estado"]

  // Llenar la tabla con datos de usuarios
  usuariosAgrupados.forEach((usuario) => {
    // Primera fila del usuario con su primera evaluación
    if (usuario.evaluaciones.length > 0) {
      datosTabla.push([
        usuario.nombre,
        usuario.cargo,
        usuario.evaluaciones[0].tema,
        formatearFecha(usuario.evaluaciones[0].fecha),
        usuario.evaluaciones[0].realizado ? "Realizado" : "Pendiente",
      ])

      // Filas adicionales para el resto de evaluaciones del mismo usuario
      for (let i = 1; i < usuario.evaluaciones.length; i++) {
        datosTabla.push([
          "", // Nombre vacío para las filas adicionales
          "", // Cargo vacío para las filas adicionales
          usuario.evaluaciones[i].tema,
          formatearFecha(usuario.evaluaciones[i].fecha),
          usuario.evaluaciones[i].realizado ? "Realizado" : "Pendiente",
        ])
      }
    }
  })

  // Configuración de la tabla principal
  const opcionesTabla: UserOptions = {
    startY: 30,
    head: [encabezados],
    body: datosTabla,
    theme: "grid",
    headStyles: {
      fillColor: colores.grisFondo,
      textColor: colores.negro,
      fontStyle: "bold",
      fontSize: 9,
      cellPadding: 3,
      lineWidth: 0.1,
      lineColor: colores.grisOscuro,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2,
      lineWidth: 0.1,
      lineColor: colores.grisClaro,
    },
    columnStyles: {
      0: {
        // Nombre
        cellWidth: 40,
        fontStyle: "bold",
      },
      1: {
        // Cargo
        cellWidth: 25,
        fontStyle: "normal",
      },
      2: {
        // Tema
        cellWidth: 50,
      },
      3: {
        // Fecha
        cellWidth: 30,
        halign: "center",
      },
      4: {
        // Estado
        cellWidth: 25,
        halign: "center",
      },
    },
    // Alternar colores de filas para mejor legibilidad
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    // Personalizar celdas
    didParseCell: (data) => {
      // Resaltar nombre y cargo solo en la primera fila de cada usuario
      if ((data.column.index === 0 || data.column.index === 1) && data.cell.raw !== "") {
        data.cell.styles.fontStyle = "bold"
      }

      // Estilo para el estado
      if (data.column.index === 4) {
        const estado = data.cell.raw as string
        if (estado === "Realizado") {
          data.cell.styles.fontStyle = "bold"
        } else if (estado === "Pendiente") {
          data.cell.styles.fontStyle = "normal"
          data.cell.styles.textColor = colores.grisMedio
        }
      }
    },
    // Agrupar visualmente por usuario
    didDrawCell: (data) => {
      // Añadir un borde superior más grueso para separar usuarios
      if (data.row.index > 0 && data.column.index === 0) {
        const currentCellText = data.cell.raw as string
        const prevRowIndex = data.row.index - 1
        const prevCellText = data.table.body[prevRowIndex]?.cells[0]?.raw as string

        // Si esta celda tiene nombre y la anterior no, significa que es un nuevo usuario
        if (currentCellText !== "" && prevCellText === "") {
          const doc = data.doc as jsPDF
          const y = data.cell.y
          doc.setDrawColor(...colores.grisOscuro)
          doc.setLineWidth(0.5)
          doc.line(data.table.settings.margin.left, y, pageWidth - data.table.settings.margin.right, y)
        }
      }
    },
  }

  // Generar la tabla principal
  autoTable(doc, opcionesTabla)

  // === PIE DE PÁGINA MINIMALISTA ===
  const totalPages = doc.getNumberOfPages()

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)

    // Línea superior del pie
    doc.setDrawColor(...colores.grisClaro)
    doc.setLineWidth(0.3)
    doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15)

    // Información del pie
    doc.setFontSize(8)
    doc.setTextColor(...colores.grisMedio)

    // Fecha de generación (izquierda)
    const fechaGeneracion = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    doc.text(`Generado: ${fechaGeneracion}`, 15, pageHeight - 10)

    // Número de página (derecha)
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" })
  }

  // === PÁGINA DE RESUMEN ===
  if (usuariosAgrupados.length > 0) {
    doc.addPage()

    // Título de resumen
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...colores.negro)
    doc.text("Resumen de Evaluaciones", pageWidth / 2, 20, { align: "center" })

    // Calcular estadísticas
    const totalTrabajadores = usuariosAgrupados.length
    const totalEvaluaciones = usuarios.length
    const evaluacionesRealizadas = usuarios.filter((u) => u.realizado).length
    const evaluacionesPendientes = totalEvaluaciones - evaluacionesRealizadas
    const porcentajeCompletado = Math.round((evaluacionesRealizadas / totalEvaluaciones) * 100)

    // Crear tabla de resumen
    const datosResumen = [
      ["Total de Trabajadores", totalTrabajadores.toString()],
      ["Total de Evaluaciones", totalEvaluaciones.toString()],
      ["Evaluaciones Realizadas", evaluacionesRealizadas.toString()],
      ["Evaluaciones Pendientes", evaluacionesPendientes.toString()],
      ["Porcentaje de Completado", `${porcentajeCompletado}%`],
    ]

    autoTable(doc, {
      startY: 30,
      head: [["Métrica", "Valor"]],
      body: datosResumen,
      theme: "grid",
      margin: { left: 60, right: 60 },
      headStyles: {
        fillColor: colores.grisFondo,
        textColor: colores.negro,
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 5,
        halign: "left",
      },
      columnStyles: {
        0: { fontStyle: "bold" },
        1: { halign: "center" },
      },
    })
  }

  // Descargar el PDF con nombre descriptivo
  const fechaDescarga = new Date().toISOString().split("T")[0]
  doc.save(`ORCOMA_Evaluaciones_${fechaDescarga}.pdf`)
}
