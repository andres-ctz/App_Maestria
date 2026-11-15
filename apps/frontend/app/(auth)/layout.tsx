import { Brand } from "@/components/brand"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-4 md:p-8">
      <Brand />
      <div className="flex w-full max-w-xl flex-col gap-4">{children}</div>
    </main>
  )
}
