'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, FileText } from 'lucide-react'

export function ReportPreview() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-2xl text-orange-700 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Vista Previa del Reporte
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Preview Toggle */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {isPreviewOpen ? 'Cerrar Vista Previa' : 'Ver Vista Previa'}
            </Button>
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
          </div>

          {/* PDF Preview */}
          {isPreviewOpen && (
            <div className="border rounded-lg overflow-hidden bg-gray-100">
              <div className="aspect-[8.5/11] w-full">
                <iframe
                  src="/placeholder.pdf"
                  className="w-full h-full"
                  style={{ minHeight: '800px' }}
                />
              </div>
            </div>
          )}

          {/* Document Info */}
          {!isPreviewOpen && (
            <div className="text-center py-12 px-4">
              <FileText className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reporte Generado</h3>
              <p className="text-gray-500 mb-4">
                El reporte ha sido generado exitosamente. Puede previsualizarlo o descargarlo usando los botones de arriba.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

