import { describe, expect, it } from "vitest"
import { puedeAcceder } from "@/lib/access"
import { ESTRUCTURA_NAVEGACION, ICONOS_NAVEGACION, IDS_CUENTA_COMUN, construirNavegacion } from "@/lib/navigation"
import { RUTAS, buscarRuta, esRutaPublica } from "@/lib/modules"
import { usuarios } from "@/lib/mock-data"

const combinaciones = usuarios.flatMap((cuenta) => cuenta.roles.map((rol) => ({ cuenta, rol })))

describe("navegación por rol", () => {
  it.each(combinaciones.map((c) => [c.cuenta.nombre, c.rol, c] as const))("%s como %s: ningún enlace lleva a 404 ni a 'sin acceso'", (_n, _r, { cuenta, rol }) => {
    const items = construirNavegacion(rol, cuenta).flatMap((s) => s.items)
    expect(items.length).toBeGreaterThan(0)
    for (const item of items) {
      expect(buscarRuta(item.href) || esRutaPublica(item.href), item.href).toBeTruthy()
      expect(puedeAcceder(item.href, rol, cuenta), item.href).toBe(true)
    }
  })

  it("no repite enlaces dentro de un mismo menú", () => {
    for (const { cuenta, rol } of combinaciones) {
      const hrefs = construirNavegacion(rol, cuenta).flatMap((s) => s.items.map((i) => i.href))
      expect(new Set(hrefs).size, `${cuenta.nombre} (${rol})`).toBe(hrefs.length)
    }
  })

  it("todos los roles tienen notificaciones y perfil", () => {
    for (const { cuenta, rol } of combinaciones) {
      const hrefs = construirNavegacion(rol, cuenta).flatMap((s) => s.items.map((i) => i.href))
      expect(hrefs).toContain("/notificaciones")
      expect(hrefs).toContain("/perfil")
    }
  })

  it("las secciones de Postulante/Estudiante dependen del estado de la cuenta", () => {
    const estudiante = usuarios.find((u) => u.id === "p-1")!
    const postulante = usuarios.find((u) => u.id === "po-2")!
    const hrefs = (u: typeof estudiante) => construirNavegacion("postulante", u).flatMap((s) => s.items.map((i) => i.href))
    expect(hrefs(estudiante)).toContain("/estudiante")
    expect(hrefs(estudiante)).toContain("/estudiante/actividades")
    expect(hrefs(postulante)).not.toContain("/estudiante")
    expect(hrefs(postulante)).toContain("/postulante/postulaciones")
  })

  it("cada id de la estructura del menú existe en el registro y tiene icono", () => {
    const idsRegistro = new Set(RUTAS.map((r) => r.id))
    const ids = [...Object.values(ESTRUCTURA_NAVEGACION).flatMap((s) => s.flatMap((x) => x.ids)), ...IDS_CUENTA_COMUN]
    for (const id of ids) {
      expect(idsRegistro.has(id), `id sin ruta: ${id}`).toBe(true)
      expect(ICONOS_NAVEGACION[id], `id sin icono: ${id}`).toBeDefined()
    }
  })

  it("toda pantalla privada es alcanzable desde el menú de algún rol (salvo «sin acceso»)", () => {
    const enMenu = new Set([...Object.values(ESTRUCTURA_NAVEGACION).flatMap((s) => s.flatMap((x) => x.ids)), ...IDS_CUENTA_COMUN])
    const huerfanas = RUTAS.filter((r) => !r.publica && r.id !== "sin-acceso" && !enMenu.has(r.id)).map((r) => r.ruta)
    expect(huerfanas).toEqual([])
  })

  it("todas las rutas del registro están alcanzables por algún rol o son públicas", () => {
    for (const r of RUTAS) {
      const alcanzable = r.publica || usuarios.some((u) => u.roles.some((rol) => puedeAcceder(r.ruta, rol, u)))
      expect(alcanzable, r.ruta).toBe(true)
    }
  })
})
