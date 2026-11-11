import { useTheme } from "src/Context/ThemeContext";
import type { ThemeSwitchProps } from "./type";
import "./styles.scss";

export default function ThemeSwitch({
  size = "md",
  className,
}: ThemeSwitchProps) {
  const { theme, toggleTheme } = useTheme();

  const switchClass = ["theme-switch", className, `theme-switch--${size}`]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={toggleTheme}
      className={switchClass}
      aria-label="Toggle theme"
    >
      <div className={`switch-track ${theme}`}>
        <div className="icon sun">☀️</div>
        <div className="icon moon">🌙</div>
        <div className={`switch-thumb ${theme}`}></div>
      </div>
    </button>
  );
}
