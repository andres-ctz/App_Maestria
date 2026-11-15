import { afterEach, describe, expect, it, vi } from "vitest"
import { obtenerAuthService } from "@/lib/auth/auth-service"
import { resolverSesion, rolInicial, serializarSesion } from "@/lib/auth/sesion"
import { usuarios } from "@/lib/mock-data"

afterEach(() => vi.unstubAllEnvs())

describe("sesión de demostración", () => {
  it("reconoce una cuenta activa con un rol que tiene", () => {
    const sesion = resolverSesion(serializarSesion("t-1", "coordinador"))
    expect(sesion?.cuenta.id).toBe("t-1")
    expect(sesion?.rolActivo).toBe("coordinador")
  })

  it("rechaza cuentas desactivadas, inexistentes, roles ajenos y valores corruptos", () => {
    expect(resolverSesion("t-4:tutor")).toBeNull() // cuenta desactivada
    expect(resolverSesion("nadie:admin")).toBeNull()
    expect(resolverSesion("u-admin:tutor")).toBeNull() // el rol no es de la cuenta
    expect(resolverSesion("p-1:admin")).toBeNull()
    expect(resolverSesion("basura")).toBeNull()
    expect(resolverSesion("")).toBeNull()
    expect(resolverSesion(undefined)).toBeNull()
  })

  it("fuera del modo demostración ninguna cookie crea una sesión (la cookie no está firmada)", () => {
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("AUTH_DEMO", "")
    expect(resolverSesion("u-admin:admin")).toBeNull()
    vi.stubEnv("AUTH_DEMO", "true")
    expect(resolverSesion("u-admin:admin")?.cuenta.id).toBe("u-admin")
  })

  it("el rol inicial es el primero de la cuenta", () => {
    expect(rolInicial(usuarios.find((u) => u.id === "t-1")!)).toBe("tutor")
  })
})

describe("cuentas de demostración", () => {
  it("solo una cuenta tiene varios roles y el cambio de rol se ofrece únicamente a ella", () => {
    const variasRoles = usuarios.filter((u) => u.roles.length > 1)
    expect(variasRoles.map((u) => u.id)).toEqual(["t-1"])
  })

  it("hay dos cuentas administrativas protegidas", () => {
    const protegidas = usuarios.filter((u) => u.protegida)
    expect(protegidas).toHaveLength(2)
    for (const u of protegidas) expect(u.roles).toEqual(["admin"])
  })

  it("no hay contraseñas ni secretos en los datos de demostración", () => {
    for (const u of usuarios) expect(Object.keys(u).some((k) => /contrasena|password|secret|token/i.test(k))).toBe(false)
  })
})

describe("proveedor de autenticación", () => {
  it("en demostración identifica la cuenta por correo, sin importar mayúsculas, y no valida contraseña", async () => {
    vi.stubEnv("NODE_ENV", "development")
    const auth = obtenerAuthService()
    expect(auth.modo).toBe("demo")
    const ok = await auth.iniciarSesion({ email: "  RSALAZAR@posgrado.example ", contrasena: "cualquiera" })
    expect(ok).toMatchObject({ ok: true })
  })

  it("rechaza correos desconocidos y cuentas desactivadas", async () => {
    vi.stubEnv("NODE_ENV", "development")
    const auth = obtenerAuthService()
    expect(await auth.iniciarSesion({ email: "nadie@correo.example" })).toEqual({ ok: false, error: "credenciales" })
    expect(await auth.iniciarSesion({ email: "cbenitez@posgrado.example" })).toEqual({ ok: false, error: "desactivada" })
  })

  it("en producción el proveedor de demostración no está disponible salvo activación explícita", async () => {
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("AUTH_DEMO", "")
    const auth = obtenerAuthService()
    expect(auth.modo).toBe("no-disponible")
    expect(await auth.iniciarSesion({ email: "rsalazar@posgrado.example" })).toEqual({ ok: false, error: "no-disponible" })
    vi.stubEnv("AUTH_DEMO", "true")
    expect(obtenerAuthService().modo).toBe("demo")
  })
})
