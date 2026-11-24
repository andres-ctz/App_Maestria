import { readFileSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it, vi } from "vitest"

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

async function cargarConfig() {
  const modulo = (await import(/* @vite-ignore */ "../next.config.mjs?" + Math.random())) as { default: { allowedDevOrigins?: string[] } }
  return modulo.default
}

describe("origenes permitidos del servidor de desarrollo", () => {
  it("permite 127.0.0.1 por defecto, para que la página se hidrate y los botones respondan", async () => {
    vi.stubEnv("ALLOWED_DEV_ORIGINS", "")
    expect((await cargarConfig()).allowedDevOrigins).toEqual(["127.0.0.1"])
  })

  it("mueve el indicador de desarrollo de Next abajo a la derecha, lejos del menú de la cuenta", async () => {
    vi.stubEnv("ALLOWED_DEV_ORIGINS", "")
    const config = (await cargarConfig()) as { devIndicators?: { position?: string } }
    expect(config.devIndicators?.position).toBe("bottom-right")
  })

  it("añade los orígenes de ALLOWED_DEV_ORIGINS, sin espacios ni entradas vacías", async () => {
    vi.stubEnv("ALLOWED_DEV_ORIGINS", " 192.168.*.* , mi-equipo.local ,, ")
    expect((await cargarConfig()).allowedDevOrigins).toEqual(["127.0.0.1", "192.168.*.*", "mi-equipo.local"])
  })
})

describe("campana de notificaciones (comprobación estática del código)", () => {
  const fuente = readFileSync(join(process.cwd(), "components/app-shell/notifications.tsx"), "utf-8")

  it("no navega a /notificaciones ni usa enlaces: es un panel flotante", () => {
    expect(fuente).not.toMatch(/next\/link/)
    expect(fuente).not.toMatch(/href=/)
    expect(fuente).not.toMatch(/router|useRouter|redirect/)
    expect(fuente).not.toMatch(/\/notificaciones/)
  })

  it("indica «Próximamente» y no muestra notificaciones inventadas ni contadores", () => {
    expect(fuente).toContain("Próximamente")
    expect(fuente).toContain("El centro de notificaciones se habilitará en una fase posterior. Por ahora no hay avisos que mostrar.")
    expect(fuente).not.toMatch(/mock-data|alertas|Badge count|\bcount\b/)
  })
})
