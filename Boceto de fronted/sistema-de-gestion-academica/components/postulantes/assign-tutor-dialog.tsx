"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { postulantes, tutores } from "@/lib/mock-data"
import type { Postulante } from "@/lib/types"

export function AssignTutorDialog({
  postulante,
  open,
  onOpenChange,
  onAssign,
}: {
  postulante: Postulante | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssign: (postulanteId: string, tutorId: string) => void
}) {
  const [tutorId, setTutorId] = useState<string | null>(postulante?.tutorId ?? null)
  const items = tutores.map((t) => ({ label: t.nombre, value: t.id }))

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) setTutorId(postulante?.tutorId ?? null)
        onOpenChange(o)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar tutor</DialogTitle>
          <DialogDescription>{postulante?.nombre}</DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="tutor-select">Tutor responsable</FieldLabel>
          <Select items={items} value={tutorId} onValueChange={(v) => setTutorId(v as string | null)}>
            <SelectTrigger id="tutor-select" className="w-full">
              <SelectValue placeholder="Selecciona un tutor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tutores.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>
            {tutorId
              ? `Carga actual: ${postulantes.filter((p) => p.tutorId === tutorId).length} postulantes`
              : "El cambio quedará registrado en la auditoría."}
          </FieldDescription>
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <Button
            disabled={!tutorId || !postulante}
            onClick={() => {
              if (!tutorId || !postulante) return
              onAssign(postulante.id, tutorId)
              toast.success("Tutor asignado", {
                description: `${tutores.find((t) => t.id === tutorId)?.nombre} → ${postulante.nombre}`,
              })
              onOpenChange(false)
            }}
          >
            Guardar asignación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
