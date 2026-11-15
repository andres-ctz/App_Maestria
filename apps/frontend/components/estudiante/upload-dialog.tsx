"use client"

import { AVISO_EJEMPLO, LIMITES_ARCHIVO_EJEMPLO } from "@/lib/config/ejemplos"
import { useRef, useState } from "react"
import { FileUp, UploadCloud, X } from "lucide-react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Actividad } from "@/lib/types"

const MAX_MB = LIMITES_ARCHIVO_EJEMPLO.maxMB
const ACCEPT = LIMITES_ARCHIVO_EJEMPLO.extensiones.join(",")

export function UploadDialog({ actividad, onUploaded }: { actividad: Actividad; onUploaded: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isResubmission = actividad.estado === "en-correccion"

  function pick(f: File | undefined) {
    if (!f) return
    if (f.size > MAX_MB * 1024 * 1024) {
      toast.error("Archivo demasiado grande", { description: `El límite es ${MAX_MB} MB.` })
      return
    }
    setFile(f)
  }

  function submit() {
    if (!file) return
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = (p ?? 0) + 20
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            onUploaded(actividad.id)
            toast.success(isResubmission ? "Nueva versión enviada" : "Entrega enviada", {
              description: `${file.name} · tu tutor recibirá una notificación.`,
            })
            reset()
            setOpen(false)
          }, 250)
        }
        return Math.min(next, 100)
      })
    }, 180)
  }

  function reset() {
    setFile(null)
    setProgress(null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) reset()
      }}
    >
      <DialogTrigger render={<Button size="sm" variant={isResubmission ? "default" : "outline"} />}>
        <FileUp data-icon="inline-start" />
        {isResubmission ? "Subir corrección" : "Subir entrega"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actividad.titulo}</DialogTitle>
          <DialogDescription>
            {actividad.curso} · {isResubmission ? "Se guardará como una nueva versión." : `Ponderación ${actividad.ponderacion}%`}
          </DialogDescription>
        </DialogHeader>

        <div
          role="button"
          tabIndex={0}
          aria-label="Seleccionar archivo"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            pick(e.dataTransfer.files[0])
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            dragging ? "border-primary bg-primary/5" : "hover:bg-muted/50",
          )}
        >
          <UploadCloud className="size-8 text-muted-foreground" aria-hidden />
          <span className="text-sm font-medium">Arrastra tu archivo o haz clic para seleccionarlo</span>
          <span className="text-xs text-muted-foreground">
            {LIMITES_ARCHIVO_EJEMPLO.extensiones.map((e) => e.slice(1).toUpperCase()).join(", ")} · máx. {MAX_MB} MB ({AVISO_EJEMPLO.toLowerCase()})
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => pick(e.target.files?.[0])}
          />
        </div>

        {file && (
          <div className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</span>
              <span className="text-xs tabular-nums text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              {progress === null && (
                <Button variant="ghost" size="icon-xs" aria-label="Quitar archivo" onClick={() => setFile(null)}>
                  <X />
                </Button>
              )}
            </div>
            {progress !== null && <Progress value={progress} aria-label="Progreso de carga" />}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor={`nota-${actividad.id}`}>Nota para el tutor (opcional)</FieldLabel>
          <Textarea id={`nota-${actividad.id}`} placeholder="Describe los cambios realizados o dudas..." />
          <FieldDescription>Tu tutor revisará la entrega y te enviará su retroalimentación.</FieldDescription>
        </Field>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <Button onClick={submit} disabled={!file || progress !== null}>
            {progress !== null ? "Enviando..." : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
