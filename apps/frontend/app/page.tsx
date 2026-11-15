import { redirect } from "next/navigation"

/** El proxy redirige "/" según la sesión; esto es solo la ruta de respaldo. */
export default function Home() {
  redirect("/login")
}
