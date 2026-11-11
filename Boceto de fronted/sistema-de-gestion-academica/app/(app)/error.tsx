"use client"

import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertTriangle />
        </EmptyMedia>
        <EmptyTitle>No pudimos cargar esta sección</EmptyTitle>
        <EmptyDescription>
          Ocurrió un error inesperado. El incidente quedó registrado en auditoría. Intenta nuevamente.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={reset}>
          <RotateCcw data-icon="inline-start" />
          Reintentar
        </Button>
      </EmptyContent>
    </Empty>
  )
}
