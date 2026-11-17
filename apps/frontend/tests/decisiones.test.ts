import { afterEach, describe, expect, it, vi } from "vitest"
import { listarCuentasDemo } from "@/lib/auth/auth-service"
import { ESCALA_CALIFICACION, NOTA_MINIMA_APROBACION, TEXTO_ESCALA } from "@/lib/config/calificaciones"
import { RUTAS } from "@/lib/modules"
import { convocatorias, postulaciones, programas, usuarios } from "@/lib/mock-data"
import { ESTADOS_POSTULACION } from "@/lib/types"

afterEach(() => vi.unstubAllEnvs())

describe("decisiones confirmadas por el equipo (15/11/2026)", () => {
  it("los estados de postulación son exactamente los ocho del v0.3 (D-016)", () => {
    expect([...ESTADOS_POSTULACION]).toEqual([
      "borrador",
      "recibida",
      "en-revision",
      "pendiente-correccion",
      "validada",
      "admitida",
      "no-admitida",
      "en-lista-de-espera",
    ])
    expect(ESTADOS_POSTULACION).not.toContain("en-nivelacion")
    expect(ESTADOS_POSTULACION).not.toContain("retirada")
  })

  it("las postulaciones de demostración usan solo esos estados", () => {
    for (const p of postulaciones) expect(ESTADOS_POSTULACION, p.id).toContain(p.estado)
  })

  it("la escala institucional es de 0 a 100 y la nota mínima de aprobación es 70 (D-014 y D-015)", () => {
    expect(ESCALA_CALIFICACION).toEqual({ minimo: 0, maximo: 100 })
    expect(NOTA_MINIMA_APROBACION).toBe(70)
    expect(TEXTO_ESCALA).toContain("0 a 100")
    expect(TEXTO_ESCALA).toContain("70 puntos")
  })

  it("las pantallas de calificaciones muestran la escala confirmada", () => {
    for (const id of ["calificaciones", "tutor-calificaciones", "estudiante-calificaciones"]) {
      expect(RUTAS.find((r) => r.id === id)?.incluira, id).toContain(TEXTO_ESCALA)
    }
  })

  it("las pantallas no presentan como pendientes decisiones ya confirmadas", () => {
    const prohibidas = ["Escala de calificaciones y nota mínima", "Lista oficial de estados", "Si hay correo electrónico", "Ofertas de vacante con plazo de respuesta (Decisiones"]
    for (const r of RUTAS) {
      for (const p of r.pendientes ?? []) {
        for (const x of prohibidas) expect(p.includes(x), `${r.ruta}: ${p}`).toBe(false)
      }
    }
  })

  it("las notificaciones indican correos simulados y sin envío real (D-013)", () => {
    const n = RUTAS.find((r) => r.id === "notificaciones")!
    expect(n.incluira?.join(" ")).toMatch(/correos simulados/)
    expect(n.incluira?.join(" ")).toMatch(/no se envían correos reales/)
  })
})

describe("cupos: pertenecen a la convocatoria, no al programa (v0.3 §5.1)", () => {
  it("el programa no tiene vacantes ni cupos", () => {
    for (const p of programas) {
      expect(Object.keys(p), p.id).not.toContain("vacantes")
      expect(Object.keys(p), p.id).not.toContain("cupos")
    }
  })

  it("cada convocatoria define sus cupos y no tiene más inscritos que cupos", () => {
    for (const c of convocatorias) {
      expect(c.cupos, c.id).toBeGreaterThan(0)
      expect(c.inscritos, c.id).toBeLessThanOrEqual(c.cupos)
    }
  })
})

describe("cambio de cuenta de demostración", () => {
  it("lista las cuentas solo en modo demostración", () => {
    vi.stubEnv("NODE_ENV", "development")
    expect(listarCuentasDemo()).toHaveLength(usuarios.length)
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("AUTH_DEMO", "")
    expect(listarCuentasDemo()).toEqual([])
    vi.stubEnv("AUTH_DEMO", "true")
    expect(listarCuentasDemo()).toHaveLength(usuarios.length)
  })

  it("incluye cuentas desactivadas para mostrarlas, aunque no se pueda entrar con ellas", () => {
    vi.stubEnv("NODE_ENV", "development")
    expect(listarCuentasDemo().some((c) => c.estado !== "activo")).toBe(true)
  })
})
