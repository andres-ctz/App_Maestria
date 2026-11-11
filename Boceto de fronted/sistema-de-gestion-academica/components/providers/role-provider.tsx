"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { inferRoleFromPath, roleHome, roleUserIds } from "@/lib/navigation"
import { usuarios } from "@/lib/mock-data"
import type { Role, Usuario } from "@/lib/types"

interface RoleContextValue {
  role: Role
  user: Usuario
  switchRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [role, setRole] = useState<Role>(() => inferRoleFromPath(pathname))

  const value = useMemo<RoleContextValue>(() => {
    const user = usuarios.find((u) => u.id === roleUserIds[role]) ?? usuarios[0]
    return {
      role,
      user,
      switchRole: (next) => {
        setRole(next)
        router.push(roleHome[next])
      },
    }
  }, [role, router])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used within RoleProvider")
  return ctx
}
