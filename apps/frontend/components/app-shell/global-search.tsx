"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, GraduationCap, Search, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Command } from "@/components/ui/command"
import { evidencias, getPrograma, postulantes, programas } from "@/lib/mock-data"

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground sm:w-64"
        onClick={() => setOpen(true)}
      >
        <Search data-icon="inline-start" />
        <span className="flex-1 text-left">Buscar…</span>
        <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Búsqueda global"
        description="Busca postulantes, programas y evidencias"
      >
        <Command>
          <CommandInput placeholder="Buscar postulantes, programas, evidencias…" />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup heading="Postulantes">
              {postulantes.map((p) => (
                <CommandItem
                  key={p.id}
                  value={`${p.nombre} ${p.documento} ${p.email}`}
                  onSelect={() => go(`/postulantes?q=${encodeURIComponent(p.nombre)}`)}
                >
                  <UserRound />
                  <span className="truncate">{p.nombre}</span>
                  <span className="ml-auto truncate text-xs text-muted-foreground">
                    {getPrograma(p.programaId)?.nombre.replace("Maestría en ", "")}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Programas">
              {programas.map((p) => (
                <CommandItem key={p.id} value={p.nombre} onSelect={() => go("/programas")}>
                  <GraduationCap />
                  {p.nombre}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Evidencias">
              {evidencias.map((e) => (
                <CommandItem
                  key={e.id}
                  value={`${e.titulo} ${e.versiones[0].archivo}`}
                  onSelect={() => go("/tutor/evidencias")}
                >
                  <FileText />
                  <span className="truncate">{e.versiones[0].archivo}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
