import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="text-end p-3">
      <button className="btn btn-outline-primary" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
      </button>
    </div>
  );
}
