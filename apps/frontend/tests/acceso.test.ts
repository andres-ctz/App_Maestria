import { describe, expect, it } from "vitest"
import { destinoSeguro, puedeAcceder, rutaInicial } from "@/lib/access"

const estudiante = { situacion: { tienePostulaciones: true, tieneMatricula: true } }
const postulante = { situacion: { tienePostulaciones: true, tieneMatricula: false } }
const nuevo = { situacion: { tienePostulaciones: false, tieneMatricula: false } }

describe("control de acceso por rol", () => {
  it("cada rol entra solo a sus rutas", () => {
    expect(puedeAcceder("/usuarios", "admin")).toBe(true)
    expect(puedeAcceder("/usuarios", "coordinador")).toBe(false)
    expect(puedeAcceder("/dashboard", "tutor")).toBe(false)
    expect(puedeAcceder("/tutor/entregas", "tutor")).toBe(true)
    expect(puedeAcceder("/tutor/entregas", "postulante", estudiante)).toBe(false)
  })

  it("donde la matriz de permisos dice «Por definir», la ruta no se habilita para ese rol", () => {
    expect(puedeAcceder("/calificaciones", "coordinador")).toBe(false)
    expect(puedeAcceder("/calificaciones", "admin")).toBe(true)
    expect(puedeAcceder("/tutor/grupos", "admin")).toBe(false)
    expect(puedeAcceder("/tutor/grupos", "coordinador")).toBe(false)
    expect(puedeAcceder("/tutor/grupos", "tutor")).toBe(true)
  })

  it("las rutas inexistentes no se consideran accesibles", () => {
    expect(puedeAcceder("/no-existe", "admin")).toBe(false)
  })

  it("Postulante/Estudiante ve secciones según su estado", () => {
    expect(puedeAcceder("/estudiante", "postulante", estudiante)).toBe(true)
    expect(puedeAcceder("/estudiante", "postulante", postulante)).toBe(false)
    expect(puedeAcceder("/postulante/postulaciones", "postulante", postulante)).toBe(true)
    expect(puedeAcceder("/postulante/postulaciones", "postulante", nuevo)).toBe(false)
  })

  it("la pantalla inicial depende del rol y de la situación", () => {
    expect(rutaInicial("admin")).toBe("/usuarios")
    expect(rutaInicial("coordinador")).toBe("/dashboard")
    expect(rutaInicial("tutor")).toBe("/tutor")
    expect(rutaInicial("postulante", estudiante)).toBe("/estudiante")
    expect(rutaInicial("postulante", postulante)).toBe("/postulante/postulaciones")
    expect(rutaInicial("postulante", nuevo)).toBe("/catalogo")
  })
})

describe("destino seguro tras iniciar sesión", () => {
  it("rechaza redirecciones abiertas y rutas ajenas", () => {
    expect(destinoSeguro("//sitio-externo.com", "admin")).toBeNull()
    expect(destinoSeguro("https://sitio-externo.com", "admin")).toBeNull()
    expect(destinoSeguro("/login", "admin")).toBeNull()
    expect(destinoSeguro("/dashboard", "tutor")).toBeNull()
    expect(destinoSeguro("", "admin")).toBeNull()
    expect(destinoSeguro(undefined, "admin")).toBeNull()
  })

  it("acepta una ruta interna permitida", () => {
    expect(destinoSeguro("/tutor/entregas", "tutor")).toBe("/tutor/entregas")
    expect(destinoSeguro("/tutor/entregas/", "tutor")).toBe("/tutor/entregas")
  })
})
