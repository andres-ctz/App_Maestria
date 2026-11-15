import { existsSync, readdirSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { describe, expect, it } from "vitest"
import { RUTAS, buscarRuta } from "@/lib/modules"

const raiz = process.cwd()
const grupos = ["(app)", "(auth)", "(public)"]

function paginaPropia(ruta: string) {
  return grupos.some((g) => existsSync(join(raiz, "app", g, ...ruta.split("/").filter(Boolean), "page.tsx")))
}

function listarPaginas(dir: string): string[] {
  return readdirSync(dir).flatMap((nombre) => {
    const completo = join(dir, nombre)
    if (statSync(completo).isDirectory()) return listarPaginas(completo)
    return nombre === "page.tsx" ? [completo] : []
  })
}

describe("registro de rutas", () => {
  it("no repite ids ni rutas", () => {
    expect(new Set(RUTAS.map((r) => r.id)).size).toBe(RUTAS.length)
    expect(new Set(RUTAS.map((r) => r.ruta)).size).toBe(RUTAS.length)
  })

  it("toda ruta privada tiene roles y toda ruta pública no los necesita", () => {
    for (const r of RUTAS) {
      if (r.publica) expect(r.roles, r.ruta).toEqual([])
      else expect(r.roles.length, r.ruta).toBeGreaterThan(0)
    }
  })

  it("'requiere' solo se usa en rutas del rol Postulante/Estudiante", () => {
    for (const r of RUTAS.filter((x) => x.requiere)) expect(r.roles.includes("postulante"), r.ruta).toBe(true)
  })

  it("las rutas implementadas tienen su propia página", () => {
    for (const r of RUTAS.filter((x) => x.estado === "implementada")) expect(paginaPropia(r.ruta), r.ruta).toBe(true)
  })

  it("las rutas provisionales privadas se resuelven con la pantalla comodín y no tienen página propia", () => {
    expect(existsSync(join(raiz, "app", "(app)", "[...ruta]", "page.tsx"))).toBe(true)
    for (const r of RUTAS.filter((x) => x.estado === "provisional" && !x.publica)) {
      expect(paginaPropia(r.ruta), r.ruta).toBe(false)
    }
  })

  it("las rutas provisionales públicas tienen su página", () => {
    for (const r of RUTAS.filter((x) => x.estado === "provisional" && x.publica)) expect(paginaPropia(r.ruta), r.ruta).toBe(true)
  })

  it("ninguna página existente queda fuera del registro (el proxy no la protegería)", () => {
    const sinRegistrar: string[] = []
    for (const g of grupos) {
      const base = join(raiz, "app", g)
      for (const archivo of listarPaginas(base)) {
        const segmentos = relative(base, archivo).split(sep).slice(0, -1)
        if (segmentos.some((s) => s.startsWith("["))) continue
        const ruta = "/" + segmentos.join("/")
        if (!buscarRuta(ruta)) sinRegistrar.push(ruta)
      }
    }
    expect(sinRegistrar).toEqual([])
  })

  it("las pantallas provisionales describen qué incluirán", () => {
    for (const r of RUTAS.filter((x) => x.estado === "provisional")) expect(r.incluira?.length ?? 0, r.ruta).toBeGreaterThan(0)
  })
})
