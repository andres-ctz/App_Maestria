"use client"

import { FORMATO_FECHA } from "@/lib/config/institucion"
import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Save } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ResultadoContacto, Seguimiento, TipoContacto } from "@/lib/types"

const tipos = [
  { label: "Llamada", value: "llamada" },
  { label: "Correo", value: "correo" },
  { label: "Reunión", value: "reunion" },
  { label: "WhatsApp", value: "whatsapp" },
]

const resultados = [
  { label: "Contactado", value: "contactado" },
  { label: "No contesta", value: "no-contesta" },
  { label: "Reprogramado", value: "reprogramado" },
]

export function ContactForm({
  estudianteId,
  tutorId,
  onCreated,
}: {
  estudianteId: string
  tutorId: string
  onCreated: (s: Seguimiento) => void
}) {
  const [tipo, setTipo] = useState<TipoContacto>("llamada")
  const [resultado, setResultado] = useState<ResultadoContacto>("contactado")
  const [observaciones, setObservaciones] = useState("")
  const [compromiso, setCompromiso] = useState("")
  const [fecha, setFecha] = useState<Date | undefined>()
  const [proxima, setProxima] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const obsInvalid = submitted && observaciones.trim().length < 10
  const fechaInvalid = submitted && compromiso.trim().length > 0 && !fecha

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (observaciones.trim().length < 10 || (compromiso.trim() && !fecha)) return

    onCreated({
      id: `s-${Date.now()}`,
      estudianteId,
      tutorId,
      fecha: new Date().toISOString(),
      tipo,
      resultado,
      observaciones: observaciones.trim(),
      compromiso:
        compromiso.trim() && fecha
          ? { descripcion: compromiso.trim(), fechaLimite: format(fecha, "yyyy-MM-dd"), cumplido: false }
          : undefined,
      proximaAccion: proxima.trim() || undefined,
    })
    toast.success("Contacto registrado", { description: "La bitácora y la auditoría fueron actualizadas." })
    setObservaciones("")
    setCompromiso("")
    setFecha(undefined)
    setProxima("")
    setSubmitted(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="tipo">Tipo de contacto</FieldLabel>
            <Select items={tipos} value={tipo} onValueChange={(v) => v && setTipo(v as TipoContacto)}>
              <SelectTrigger id="tipo" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tipos.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="resultado">Resultado</FieldLabel>
            <Select
              items={resultados}
              value={resultado}
              onValueChange={(v) => v && setResultado(v as ResultadoContacto)}
            >
              <SelectTrigger id="resultado" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {resultados.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field data-invalid={obsInvalid || undefined}>
          <FieldLabel htmlFor="observaciones">Observaciones</FieldLabel>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Resume lo conversado, dificultades detectadas y acuerdos..."
            aria-invalid={obsInvalid || undefined}
            className="min-h-24"
          />
          {obsInvalid && <FieldError>Describe el contacto con al menos 10 caracteres.</FieldError>}
        </Field>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Field>
            <FieldLabel htmlFor="compromiso">Compromiso</FieldLabel>
            <Input
              id="compromiso"
              value={compromiso}
              onChange={(e) => setCompromiso(e.target.value)}
              placeholder="Ej. Entregar avance del marco teórico"
            />
          </Field>
          <Field data-invalid={fechaInvalid || undefined}>
            <FieldLabel htmlFor="fecha-compromiso">Fecha límite</FieldLabel>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    id="fecha-compromiso"
                    variant="outline"
                    className="w-full justify-start font-normal sm:w-44"
                    aria-invalid={fechaInvalid || undefined}
                  />
                }
              >
                <CalendarIcon data-icon="inline-start" />
                {fecha ? format(fecha, FORMATO_FECHA, { locale: es }) : <span className="text-muted-foreground">Elegir fecha</span>}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={fecha} onSelect={setFecha} locale={es} />
              </PopoverContent>
            </Popover>
            {fechaInvalid && <FieldError>Indica la fecha del compromiso.</FieldError>}
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="proxima">Próxima acción</FieldLabel>
          <Input
            id="proxima"
            value={proxima}
            onChange={(e) => setProxima(e.target.value)}
            placeholder="Ej. Llamada de verificación el lunes"
          />
          <FieldDescription>Se generará un recordatorio automático para el tutor.</FieldDescription>
        </Field>
        <Button type="submit" className="self-end">
          <Save data-icon="inline-start" />
          Registrar contacto
        </Button>
      </FieldGroup>
    </form>
  )
}
