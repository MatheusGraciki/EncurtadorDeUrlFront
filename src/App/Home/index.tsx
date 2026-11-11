import "./dashboard.scss";
import { useEffect, useState } from "react";
import Header from "src/Components/Header";
import Icon from "src/Components/Icon";
import ShortenerCard from "src/Components/ShortnerCard";

export default function Home() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>("#link-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="dashboard" id="inicio">
        <div className="dashboard__topbar">
          <label className="global-search" htmlFor="link-search">
            <Icon name="search" size={20} />
            <span className="sr-only">Buscar links</span>
            <input
              id="link-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar links..."
            />
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </label>
          <button
            className="notification-button"
            type="button"
            aria-label="Notificações"
          >
            <Icon name="bell" size={21} />
            <span />
          </button>
          <button
            className="profile-button"
            type="button"
            aria-label="Abrir menu do perfil"
          >
            <span>G</span>
            <Icon name="chevron-down" size={16} />
          </button>
        </div>
        <section className="dashboard__hero">
          <span>Olá!</span>
          <h1>
            Encurte, compartilhe e gerencie <em>seus links</em>
          </h1>
          <p>
            Transforme URLs longas em links curtos de forma rápida e organizada.
          </p>
        </section>
        <ShortenerCard search={search} />
      </main>
    </div>
  );
}
