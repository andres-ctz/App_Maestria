import { GraduationCap } from "lucide-react"
import { institucion } from "@/lib/config/institucion"

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="size-5" aria-hidden />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold">{institucion.nombre}</span>
        <span className="text-xs text-muted-foreground">{institucion.unidad}</span>
      </div>
    </div>
  )
}
