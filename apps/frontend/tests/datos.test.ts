import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { FORMATO_FECHA, ZONA_HORARIA } from "@/lib/config/institucion"
import { formatDate, formatDateTime, formatIdentificacion } from "@/lib/format"
import { entregas, estudiantes, postulaciones, seguimientos, usuarios } from "@/lib/mock-data"

describe("formato de fechas y configuración", () => {
  it("usa DD/MM/AAAA", () => {
    expect(FORMATO_FECHA).toBe("dd/MM/yyyy")
    expect(formatDate("2026-10-27")).toBe("27/10/2026")
    expect(formatDateTime("2026-10-27T09:05:00")).toBe("27/10/2026 09:05")
  })

  it("la zona horaria es la de Ecuador", () => {
    expect(ZONA_HORARIA).toBe("America/Guayaquil")
  })

  it("muestra el tipo de identificación", () => {
    expect(formatIdentificacion({ tipo: "cedula", numero: "9900000001" })).toBe("Cédula 9900000001")
    expect(formatIdentificacion({ tipo: "pasaporte", numero: "AB123" })).toBe("Pasaporte AB123")
  })
})

function archivosFuente(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) return n === "ui" || n === "node_modules" ? [] : archivosFuente(p)
    return /\.(ts|tsx)$/.test(n) ? [p] : []
  })
}

describe("formato de fechas en el código", () => {
  it("ninguna pantalla usa un patrón de fecha distinto de DD/MM/AAAA", () => {
    const prohibido = /["'`](d|dd) MMM(M)? yyyy|MMMM d|MM\/dd\/yyyy/
    const infractores = ["app", "components"]
      .flatMap((d) => archivosFuente(join(process.cwd(), d)))
      .filter((f) => prohibido.test(readFileSync(f, "utf-8")))
    expect(infractores).toEqual([])
  })
})

describe("datos de demostración", () => {
  const personas = [...estudiantes, ...postulaciones]

  it("siguen el contexto ecuatoriano y son claramente ficticios", () => {
    for (const p of personas) {
      expect(p.telefono, p.nombre).toMatch(/^\+593 /)
      expect(p.identificacion.tipo).toBe("cedula")
      expect(p.identificacion.numero, p.nombre).toMatch(/^99\d{8}$/)
      expect(p.email, p.nombre).toMatch(/@correo\.example$/)
    }
    for (const u of usuarios) expect(u.email, u.nombre).toMatch(/@(posgrado|correo)\.example$/)
  })

  it("postulaciones y estudiantes son conjuntos separados", () => {
    const ids = new Set(estudiantes.map((e) => e.id))
    for (const p of postulaciones) expect(ids.has(p.id), p.id).toBe(false)
  })

  it("las referencias entre datos existen", () => {
    const idsEstudiantes = new Set(estudiantes.map((e) => e.id))
    const idsUsuarios = new Set(usuarios.map((u) => u.id))
    for (const e of estudiantes) expect(e.tutorId === null || idsUsuarios.has(e.tutorId), e.id).toBe(true)
    for (const s of seguimientos) expect(idsEstudiantes.has(s.estudianteId), s.id).toBe(true)
    for (const e of entregas) expect(idsEstudiantes.has(e.estudianteId), e.id).toBe(true)
  })

  it("no hay una escala de calificaciones fija en los datos de los estudiantes", () => {
    for (const e of estudiantes) expect(Object.keys(e.formacion)).not.toContain("promedio")
  })
})
