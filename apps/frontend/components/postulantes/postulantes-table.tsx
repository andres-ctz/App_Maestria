"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  CheckCircle2,
  Eye,
  FilterX,
  MessageSquarePlus,
  MoreHorizontal,
  Search,
  UserCog,
  UserRoundX,
} from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RiskBadge } from "@/components/status/risk-badge"
import { EntregaBadge, InscripcionBadge } from "@/components/status/status-badge"
import { PostulanteSheet } from "@/components/postulantes/postulante-sheet"
import { AssignTutorDialog } from "@/components/postulantes/assign-tutor-dialog"
import { convocatorias, getConvocatoria, getTutor } from "@/lib/mock-data"
import { relativeDays } from "@/lib/format"
import type { EstadoEntrega, Postulante, RiskLevel } from "@/lib/types"

type RiskFilter = RiskLevel | "todos"
const riskOrder: Record<RiskLevel, number> = { alto: 0, medio: 1, bajo: 2 }

const convItems = [{ label: "Todas las convocatorias", value: "todas" }, ...convocatorias.map((c) => ({ label: c.nombre, value: c.id }))]
const entregaItems = [
  { label: "Todo estado de entrega", value: "todos" },
  { label: "Al día", value: "al-dia" },
  { label: "Atrasado", value: "atrasado" },
  { label: "Sin entregas", value: "sin-entregas" },
]

export function PostulantesTable({
  data,
  mode,
  initialRisk = "todos",
}: {
  data: Postulante[]
  mode: "coordinador" | "tutor"
  initialRisk?: RiskFilter
}) {
  const [rows, setRows] = useState(data)
  const [query, setQuery] = useState("")
  const [risk, setRisk] = useState<RiskFilter>(initialRisk)
  const [conv, setConv] = useState("todas")
  const [entrega, setEntrega] = useState<EstadoEntrega | "todos">("todos")
  const [sort, setSort] = useState<{ key: "riesgo" | "avance"; dir: 1 | -1 }>({ key: "riesgo", dir: 1 })
  const [selected, setSelected] = useState<Postulante | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows
      .filter((p) => (risk === "todos" ? true : p.riesgo === risk))
      .filter((p) => (conv === "todas" ? true : p.convocatoriaId === conv))
      .filter((p) => (entrega === "todos" ? true : p.estadoEntrega === entrega))
      .filter((p) => (q ? p.nombre.toLowerCase().includes(q) || p.documento.includes(q) || p.email.includes(q) : true))
      .sort((a, b) =>
        sort.key === "riesgo"
          ? (riskOrder[a.riesgo] - riskOrder[b.riesgo]) * sort.dir || a.avance - b.avance
          : (a.avance - b.avance) * sort.dir,
      )
  }, [rows, query, risk, conv, entrega, sort])

  const counts = useMemo(
    () => ({
      todos: rows.length,
      alto: rows.filter((p) => p.riesgo === "alto").length,
      medio: rows.filter((p) => p.riesgo === "medio").length,
      bajo: rows.filter((p) => p.riesgo === "bajo").length,
    }),
    [rows],
  )

  const hasFilters = query || risk !== "todos" || conv !== "todas" || entrega !== "todos"

  function resetFilters() {
    setQuery("")
    setRisk("todos")
    setConv("todas")
    setEntrega("todos")
  }

  function openSheet(p: Postulante) {
    setSelected(p)
    setSheetOpen(true)
  }

  function toggleSort(key: "riesgo" | "avance") {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <InputGroup className="xl:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, DNI o correo"
            aria-label="Buscar postulantes"
          />
        </InputGroup>
        <ToggleGroup
          variant="outline"
          value={[risk]}
          onValueChange={(v) => setRisk((v[0] as RiskFilter) ?? "todos")}
          aria-label="Filtrar por nivel de riesgo"
          className="flex-wrap"
        >
          <ToggleGroupItem value="todos">Todos · {counts.todos}</ToggleGroupItem>
          <ToggleGroupItem value="alto">Alto · {counts.alto}</ToggleGroupItem>
          <ToggleGroupItem value="medio">Medio · {counts.medio}</ToggleGroupItem>
          <ToggleGroupItem value="bajo">Bajo · {counts.bajo}</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex flex-wrap gap-2 xl:ml-auto">
          <Select items={convItems} value={conv} onValueChange={(v) => setConv((v as string) ?? "todas")}>
            <SelectTrigger className="w-full sm:w-56" aria-label="Convocatoria">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {convItems.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={entregaItems}
            value={entrega}
            onValueChange={(v) => setEntrega((v as EstadoEntrega | "todos") ?? "todos")}
          >
            <SelectTrigger className="w-full sm:w-48" aria-label="Estado de entrega">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {entregaItems.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" onClick={resetFilters}>
              <FilterX data-icon="inline-start" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      <Card className="py-0">
        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserRoundX />
              </EmptyMedia>
              <EmptyTitle>No hay postulantes con estos filtros</EmptyTitle>
              <EmptyDescription>Ajusta la búsqueda o limpia los filtros para ver toda la matriz.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Postulante</TableHead>
                <TableHead className="hidden lg:table-cell">Convocatoria</TableHead>
                {mode === "coordinador" && <TableHead className="hidden md:table-cell">Tutor asignado</TableHead>}
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-2" onClick={() => toggleSort("avance")}>
                    Avance
                    <ArrowUpDown data-icon="inline-end" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-2" onClick={() => toggleSort("riesgo")}>
                    Riesgo
                    <ArrowUpDown data-icon="inline-end" />
                  </Button>
                </TableHead>
                <TableHead className="hidden xl:table-cell">Estado</TableHead>
                <TableHead className="w-12 pr-4">
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const tutor = getTutor(p.tutorId)
                return (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => openSheet(p)}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">{p.iniciales}</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-medium">{p.nombre}</span>
                          <span className="truncate text-xs text-muted-foreground">
                            Activo {relativeDays(p.ultimaActividad).toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {getConvocatoria(p.convocatoriaId)?.nombre}
                    </TableCell>
                    {mode === "coordinador" && (
                      <TableCell className="hidden md:table-cell">
                        {tutor ? (
                          tutor.nombre
                        ) : (
                          <span className="text-muted-foreground italic">Sin asignar</span>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex min-w-28 items-center gap-2">
                        <Progress value={p.avance} className="w-20" aria-label={`Avance ${p.avance}%`} />
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {p.actividadesCompletadas}/{p.actividadesTotales}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <RiskBadge level={p.riesgo} reasons={p.motivosRiesgo} />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex gap-1.5">
                        <EntregaBadge estado={p.estadoEntrega} />
                        {mode === "coordinador" && <InscripcionBadge estado={p.estadoInscripcion} />}
                      </div>
                    </TableCell>
                    <TableCell className="pr-4" onClick={(e) => e.stopPropagation()}>
                      <RowActions
                        mode={mode}
                        postulante={p}
                        onView={() => openSheet(p)}
                        onAssign={() => {
                          setSelected(p)
                          setAssignOpen(true)
                        }}
                        onApprove={() => {
                          setRows((prev) =>
                            prev.map((r) => (r.id === p.id ? { ...r, estadoInscripcion: "aprobada" } : r)),
                          )
                          toast.success("Inscripción aprobada", { description: p.nombre })
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </Card>
      <p className="text-xs text-muted-foreground">
        Mostrando {filtered.length} de {rows.length} postulantes
      </p>

      <PostulanteSheet postulante={selected} open={sheetOpen} onOpenChange={setSheetOpen} />
      <AssignTutorDialog
        postulante={selected}
        open={assignOpen}
        onOpenChange={setAssignOpen}
        onAssign={(id, tutorId) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, tutorId } : r)))}
      />
    </div>
  )
}

function RowActions({
  mode,
  postulante,
  onView,
  onAssign,
  onApprove,
}: {
  mode: "coordinador" | "tutor"
  postulante: Postulante
  onView: () => void
  onAssign: () => void
  onApprove: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Acciones para ${postulante.nombre}`} />}>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onView}>
            <Eye />
            Ver ficha
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onView}>
            <MessageSquarePlus />
            Registrar contacto
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {mode === "coordinador" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onAssign}>
                <UserCog />
                {postulante.tutorId ? "Reasignar tutor" : "Asignar tutor"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onApprove} disabled={postulante.estadoInscripcion === "aprobada"}>
                <CheckCircle2 />
                Aprobar inscripción
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
