import Icon from "../Icon";
import "./history-list.scss";

export interface HistoryItem {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}
interface HistoryListProps {
  items: HistoryItem[];
  hasSearch: boolean;
  onOpen: (item: HistoryItem) => void;
  onCopy: (item: HistoryItem) => void;
  onRemove: (id: number) => void;
}

function shortAddress(value: string) {
  try {
    const url = new URL(value);
    return `${url.host}${url.pathname}`;
  } catch {
    return value;
  }
}
function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(" de ", " ")
    .replace(" de ", ", ");
}

export default function HistoryList({
  items,
  hasSearch,
  onOpen,
  onCopy,
  onRemove,
}: HistoryListProps) {
  if (items.length === 0)
    return (
      <div className="history-empty">
        <Icon name={hasSearch ? "search" : "inbox"} size={45} />
        <strong>
          {hasSearch ? "Nenhum link encontrado" : "Nenhum link criado ainda"}
        </strong>
        <span>
          {hasSearch
            ? "Tente buscar por outro endereço."
            : "Encurte sua primeira URL para vê-la aqui."}
        </span>
      </div>
    );
  return (
    <div className="history-table-wrap">
      <table className="history-table">
        <thead>
          <tr>
            <th>Link curto</th>
            <th>Link original</th>
            <th>Criado em</th>
            <th>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 8).map((item) => (
            <tr key={item.id}>
              <td>
                <div className="short-link">
                  <span>
                    <Icon name="link" size={17} />
                  </span>
                  <a href={item.shortUrl} target="_blank" rel="noreferrer">
                    {shortAddress(item.shortUrl)}
                  </a>
                  <button
                    type="button"
                    onClick={() => onCopy(item)}
                    aria-label={`Copiar ${item.shortUrl}`}
                    title="Copiar link"
                  >
                    <Icon name="copy" size={17} />
                  </button>
                </div>
              </td>
              <td>
                <span className="original-link" title={item.originalUrl}>
                  {item.originalUrl}
                </span>
              </td>
              <td>
                <time dateTime={item.createdAt}>
                  {formatDate(item.createdAt)}
                </time>
              </td>
              <td>
                <div className="row-actions">
                  <button
                    type="button"
                    onClick={() => onOpen(item)}
                    aria-label="Abrir link"
                    title="Abrir link"
                  >
                    <Icon name="external-link" size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label="Excluir link do histórico"
                    title="Excluir"
                  >
                    <Icon name="trash" size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
