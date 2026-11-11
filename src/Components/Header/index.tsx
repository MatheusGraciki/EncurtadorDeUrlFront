import Icon from "../Icon";
import "./sidebar.scss";

export default function Header() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <Icon name="link" size={28} />
        </span>
        <div>
          <strong>Graciki</strong>
          <span>Encurtador de URLs</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Navegação principal">
        <a className="is-active" href="#inicio" aria-current="page">
          <Icon name="home" size={21} />
          <span>Início</span>
        </a>
        <a href="#links-recentes">
          <Icon name="link" size={21} />
          <span>Meus links</span>
        </a>
        <a href="#configuracoes">
          <Icon name="settings" size={21} />
          <span>Configurações</span>
        </a>
      </nav>
    </aside>
  );
}
