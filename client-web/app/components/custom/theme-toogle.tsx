import { useTheme } from "@/hooks/use-theme"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="sakura:bg-sakura-dark sakura:text-white rounded-lg bg-gray-800 px-4 py-2 text-white transition dark:bg-gray-200 dark:text-black"
    >
      {theme === "light" ? "🌞 Light" : theme === "dark" ? "🌙 Dark" : "🌸 Sakura"}
    </button>
  )
}
