import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "sakura"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light"
  })

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "sakura")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "sakura" : "light"))
  }

  return { theme, toggleTheme }
}
