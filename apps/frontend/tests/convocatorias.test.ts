import { describe, expect, it } from "vitest"
import { convocatorias, programas } from "@/lib/mock-data"
import { ESTADOS_CONVOCATORIA } from "@/lib/types"

describe("convocatorias", () => {
  it("los estados de la convocatoria son exactamente los ocho del v0.3 §5.2", () => {
    expect([...ESTADOS_CONVOCATORIA]).toEqual([
      "borrador",
      "programada",
      "abierta",
      "preparacion",
      "en-curso",
      "cerrada",
      "suspendida",
      "cancelada",
    ])
  })

  it("todas las convocatorias de los datos de ejemplo usan un estado válido", () => {
    for (const c of convocatorias) {
      expect(ESTADOS_CONVOCATORIA, c.id).toContain(c.estado)
    }
  })

  it("en cada convocatoria de ejemplo el inicio es anterior al fin", () => {
    for (const c of convocatorias) {
      expect(new Date(c.inicio).getTime(), c.id).toBeLessThan(new Date(c.fin).getTime())
    }
  })

  it("los cupos viven en la convocatoria y no en el programa", () => {
    for (const c of convocatorias) {
      expect(typeof c.cupos, c.id).toBe("number")
      expect(c.cupos, c.id).toBeGreaterThan(0)
    }
    for (const p of programas) {
      expect(p).not.toHaveProperty("cupos")
    }
  })
})
