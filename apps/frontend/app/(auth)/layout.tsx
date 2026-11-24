import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/app-shell/theme-toggle"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-4 md:p-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Brand />
      <div className="flex w-full max-w-xl flex-col gap-4">{children}</div>
    </main>
  )
}
