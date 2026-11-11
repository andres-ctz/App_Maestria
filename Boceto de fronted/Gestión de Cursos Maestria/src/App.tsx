import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity, AlertTriangle, Bell, BookOpen, CalendarClock, Check, ChevronDown,
  ChevronRight, ClipboardCheck, Clock3, Download, FileSpreadsheet, GraduationCap,
  LayoutDashboard, Menu, MessageSquare, Moon, MoreHorizontal, PanelLeftClose,
  Search, Settings, ShieldCheck, Sun, UserCheck, Users, X,
} from 'lucide-react'

type Risk = 'Bajo' | 'Medio' | 'Alto'
type Role = 'Coordinador' | 'Tutor' | 'Administrador' | 'Postulante'
type Applicant = { name: string; initials: string; program: string; tutor: string; progress: number; risk: Risk; reason: string; status: string }

const applicants: Applicant[] = [
  { name: 'Mariana López', initials: 'ML', program: 'MBA · 2025-II', tutor: 'Dra. Ana Torres', progress: 82, risk: 'Bajo', reason: 'Actividad regular y entregas al día', status: 'Al día' },
  { name: 'Diego Ramírez', initials: 'DR', program: 'Gestión Pública · 2025-II', tutor: 'Mg. Luis Vera', progress: 44, risk: 'Alto', reason: 'Sin actividad en 7 días', status: 'Pendiente' },
  { name: 'Camila Rojas', initials: 'CR', program: 'Educación · 2025-II', tutor: 'Dra. Ana Torres', progress: 67, risk: 'Medio', reason: 'Evidencia pendiente de corrección', status: 'En corrección' },
  { name: 'José Mendoza', initials: 'JM', program: 'MBA · 2025-II', tutor: 'Mg. Luis Vera', progress: 31, risk: 'Alto', reason: 'Evidencia rechazada y plazo próximo', status: 'Rechazada' },
  { name: 'Sofía Castillo', initials: 'SC', program: 'Educación · 2025-II', tutor: 'Dra. Ana Torres', progress: 75, risk: 'Bajo', reason: 'Actividad regular y entregas al día', status: 'Al día' },
]

const navByRole: Record<Role, { label: string; icon: typeof Activity }[]> = {
  Coordinador: [
    { label: 'Panel ejecutivo', icon: LayoutDashboard }, { label: 'Programas y cursos', icon: BookOpen },
    { label: 'Postulantes', icon: Users }, { label: 'Reportes', icon: FileSpreadsheet }, { label: 'Trazabilidad', icon: Activity },
  ],
  Tutor: [
    { label: 'Mis postulantes', icon: Users }, { label: 'Seguimiento tutorial', icon: MessageSquare },
    { label: 'Revisión de evidencias', icon: ClipboardCheck },
  ],
  Administrador: [
    { label: 'Usuarios y roles', icon: UserCheck }, { label: 'Configuración', icon: Settings }, { label: 'Auditoría', icon: ShieldCheck },
  ],
  Postulante: [
    { label: 'Mi portal', icon: LayoutDashboard }, { label: 'Cursos activos', icon: BookOpen }, { label: 'Mis evidencias', icon: ClipboardCheck },
  ],
}

function Button({ children, className = '', variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'outline' }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>
}

function Badge({ risk }: { risk: Risk }) {
  return <span className={`badge risk-${risk.toLowerCase()}`}><span className="badge-dot" />{risk}</span>
}

function Progress({ value }: { value: number }) {
  return <div className="progress" aria-label={`${value}% completado`}><div style={{ width: `${value}%` }} /></div>
}

function MetricCard({ icon, label, value, detail, tone = 'blue' }: { icon: ReactNode; label: string; value: string; detail: string; tone?: string }) {
  return <div className="card metric-card">
    <div className={`metric-icon tone-${tone}`}>{icon}</div>
    <div className="metric-label">{label}</div>
    <div className="metric-value">{value}</div>
    <div className="metric-detail"><span className={tone === 'red' ? 'down' : 'up'}>{tone === 'red' ? '↑ 3' : '↑ 8.2%'}</span> {detail}</div>
  </div>
}

function ApplicantDrawer({ applicant, onClose }: { applicant: Applicant; onClose: () => void }) {
  return <>
    <div className="drawer-backdrop" onClick={onClose} />
    <aside className="drawer">
      <div className="drawer-head">
        <div><div className="eyebrow">Ficha del postulante</div><div className="drawer-title">{applicant.name}</div></div>
        <Button variant="ghost" className="icon-btn" onClick={onClose} aria-label="Cerrar"><X size={19} /></Button>
      </div>
      <div className="profile-summary">
        <div className="avatar large">{applicant.initials}</div>
        <div><div className="profile-name">{applicant.name}</div><div className="muted">{applicant.program}</div></div>
        <Badge risk={applicant.risk} />
      </div>
      <div className="tabs"><span className="active">Seguimiento</span><span>Evidencias</span><span>Perfil</span></div>
      <div className="drawer-body">
        <div className="section-title">Registrar nuevo contacto</div>
        <div className="form-grid">
          <label>Tipo de contacto<select defaultValue="Llamada"><option>Llamada</option><option>Correo</option><option>Reunión</option></select></label>
          <label>Fecha de compromiso<input type="date" defaultValue="2025-06-28" /></label>
        </div>
        <label>Observaciones<textarea placeholder="Describe el resultado del contacto y próximos pasos…" /></label>
        <Button className="full"><Check size={16} /> Guardar seguimiento</Button>
        <div className="section-row"><div className="section-title">Bitácora tutorial</div><span className="muted">3 registros</span></div>
        <div className="timeline">
          <div className="timeline-item"><span className="timeline-dot green" /><div><div className="timeline-title">Llamada de seguimiento</div><div className="muted small">Hoy, 10:32 · Dra. Ana Torres</div><p>Confirmó que completará la evidencia pendiente antes del viernes.</p><div className="commitment"><CalendarClock size={15} /> Compromiso · 28 jun</div></div></div>
          <div className="timeline-item"><span className="timeline-dot amber" /><div><div className="timeline-title">Correo de recordatorio</div><div className="muted small">18 jun, 16:10 · Sistema</div><p>Recordatorio automático por inactividad durante 5 días.</p></div></div>
          <div className="timeline-item"><span className="timeline-dot blue" /><div><div className="timeline-title">Reunión de bienvenida</div><div className="muted small">10 jun, 09:00 · Dra. Ana Torres</div><p>Se revisó el cronograma y se resolvieron dudas del proceso.</p></div></div>
        </div>
      </div>
    </aside>
  </>
}

export default function App() {
  const [role, setRole] = useState<Role>('Coordinador')
  const [dark, setDark] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const [risk, setRisk] = useState<'Todos' | Risk>('Todos')
  const [selected, setSelected] = useState<Applicant | null>(null)
  const filtered = useMemo(() => risk === 'Todos' ? applicants : applicants.filter(a => a.risk === risk), [risk])

  return <div className={dark ? 'app dark' : 'app'}>
    <aside className={`sidebar ${sidebar ? '' : 'collapsed'} ${mobileNav ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={21} /></div>{sidebar && <div><b>Prepara</b><span>Gestión académica</span></div>}<Button variant="ghost" className="mobile-close" onClick={() => setMobileNav(false)}><X size={18}/></Button></div>
      <nav>{navByRole[role].map((item, i) => <Button key={item.label} variant="ghost" className={`nav-item ${i === 0 ? 'active' : ''}`}><item.icon size={18} />{sidebar && <span>{item.label}</span>}{sidebar && i === 2 && role === 'Coordinador' && <em>24</em>}</Button>)}</nav>
      <div className="sidebar-bottom">
        <div className="support"><MessageSquare size={18}/>{sidebar && <div><b>¿Necesitas ayuda?</b><span>Centro de soporte</span></div>}</div>
        <Button variant="ghost" className="nav-item" onClick={() => setSidebar(!sidebar)}><PanelLeftClose size={18}/>{sidebar && <span>Contraer menú</span>}</Button>
      </div>
    </aside>

    <main className={`main ${sidebar ? '' : 'expanded'}`}>
      <header>
        <Button variant="ghost" className="icon-btn hamburger" onClick={() => setMobileNav(true)}><Menu size={20}/></Button>
        <div className="breadcrumbs"><span>Coordinación</span><ChevronRight size={14}/><b>Panel ejecutivo</b></div>
        <div className="header-actions">
          <div className="search"><Search size={17}/><input placeholder="Buscar postulante, curso…" /></div>
          <Button variant="ghost" className="icon-btn" onClick={() => setDark(!dark)} aria-label="Cambiar tema">{dark ? <Sun size={19}/> : <Moon size={19}/>}</Button>
          <Button variant="ghost" className="icon-btn notification"><Bell size={19}/><span /></Button>
          <div className="role-select"><div className="avatar">AT</div><select value={role} onChange={e => setRole(e.target.value as Role)}>{Object.keys(navByRole).map(r => <option key={r}>{r}</option>)}</select><ChevronDown size={14}/></div>
        </div>
      </header>

      <div className="content">
        <div className="page-head"><div><div className="eyebrow">Ciclo académico 2025-II</div><h1>Buenos días, Ana</h1><p>Este es el estado general de tus programas preparatorios.</p></div><div className="page-actions"><Button variant="outline"><Download size={16}/> Exportar reporte</Button><Button><Users size={16}/> Ver postulantes</Button></div></div>

        <section className="metrics">
          <MetricCard icon={<Users size={20}/>} label="Postulantes totales" value="248" detail="vs. ciclo anterior" />
          <MetricCard icon={<Activity size={20}/>} label="Avance general" value="68.4%" detail="vs. ciclo anterior" tone="violet" />
          <MetricCard icon={<ClipboardCheck size={20}/>} label="Inscripciones aprobadas" value="84.7%" detail="210 de 248" tone="green" />
          <MetricCard icon={<AlertTriangle size={20}/>} label="Riesgo crítico" value="18" detail="desde la semana pasada" tone="red" />
        </section>

        <section className="overview-grid">
          <div className="card risk-panel">
            <div className="card-head"><div><h2>Distribución de riesgo</h2><p>Nivel actual de los postulantes activos</p></div><Button variant="ghost">Ver detalle <ChevronRight size={15}/></Button></div>
            <div className="risk-content">
              <div className="donut"><div><b>248</b><span>Total</span></div></div>
              <div className="risk-legend">
                <div><span className="legend-dot green"/><div><b>Bajo</b><small>Actividad regular</small></div><strong>156 <small>63%</small></strong></div>
                <div><span className="legend-dot amber"/><div><b>Medio</b><small>Seguimiento requerido</small></div><strong>74 <small>30%</small></strong></div>
                <div><span className="legend-dot red"/><div><b>Alto</b><small>Intervención prioritaria</small></div><strong>18 <small>7%</small></strong></div>
              </div>
            </div>
            <div className="risk-reasons"><b>Motivos más frecuentes</b><span>Sin actividad en 7 días <strong>12</strong></span><span>Evidencia rechazada <strong>6</strong></span></div>
          </div>
          <div className="card alerts-panel">
            <div className="card-head"><div><h2>Alertas próximas</h2><p>Vencimientos que requieren atención</p></div><span className="count-badge">8</span></div>
            <div className="alerts">
              <div><span className="date danger"><b>1</b> día</span><div><b>Cierre de carga documental</b><small>Convocatoria MBA 2025-II</small></div><strong>23 postulantes</strong></div>
              <div><span className="date warning"><b>3</b> días</span><div><b>Evaluación diagnóstica</b><small>Gestión Pública</small></div><strong>41 postulantes</strong></div>
              <div><span className="date neutral"><b>5</b> días</span><div><b>Actividad: Caso práctico</b><small>Metodología de investigación</small></div><strong>18 pendientes</strong></div>
            </div>
            <Button variant="outline" className="full">Ver todas las alertas</Button>
          </div>
        </section>

        <section className="card table-card">
          <div className="card-head table-title"><div><h2>Postulantes y nivel de riesgo</h2><p>Seguimiento de avance y señales de alerta</p></div><Button variant="ghost">Ver matriz completa <ChevronRight size={15}/></Button></div>
          <div className="filters"><div className="filter-search"><Search size={16}/><input placeholder="Buscar postulante…" /></div><div className="chips">{(['Todos','Alto','Medio','Bajo'] as const).map(r => <Button key={r} variant="ghost" className={risk === r ? 'active' : ''} onClick={() => setRisk(r)}>{r}</Button>)}</div><select><option>Todas las convocatorias</option><option>MBA 2025-II</option></select></div>
          <div className="table-wrap"><table><thead><tr><th>Postulante</th><th>Convocatoria</th><th>Tutor asignado</th><th>Avance</th><th>Nivel de riesgo</th><th /></tr></thead><tbody>{filtered.map(a => <tr key={a.name} onClick={() => setSelected(a)}><td><div className="person"><div className="avatar">{a.initials}</div><div><b>{a.name}</b><small>{a.status}</small></div></div></td><td>{a.program}</td><td>{a.tutor}</td><td><div className="progress-cell"><Progress value={a.progress}/><b>{a.progress}%</b></div></td><td><span title={a.reason}><Badge risk={a.risk}/></span><small className="reason">{a.reason}</small></td><td><Button variant="ghost" className="icon-btn"><MoreHorizontal size={18}/></Button></td></tr>)}</tbody></table></div>
          <div className="table-footer"><span>Mostrando {filtered.length} de 248 postulantes</span><div><Button variant="outline" disabled>Anterior</Button><Button variant="outline">Siguiente</Button></div></div>
        </section>

        <section className="card audit-card"><div className="card-head"><div><h2>Actividad reciente</h2><p>Últimos eventos de trazabilidad</p></div><Button variant="outline"><FileSpreadsheet size={15}/> Exportar Excel</Button></div><div className="audit-row"><span className="audit-icon"><Check size={16}/></span><div><b>Ana Torres aprobó la evidencia v2</b><small>Mariana López · Ensayo de motivación</small></div><time><Clock3 size={14}/> Hace 12 min</time></div><div className="audit-row"><span className="audit-icon purple"><UserCheck size={16}/></span><div><b>Carlos Ruiz modificó la asignación de tutor</b><small>Diego Ramírez · Mg. Luis Vera</small></div><time><Clock3 size={14}/> Hace 38 min</time></div></section>
      </div>
    </main>
    {selected && <ApplicantDrawer applicant={selected} onClose={() => setSelected(null)} />}
  </div>
}
