import { useEffect, useMemo, useState, type FormEvent } from "react";
import HistoryList, { type HistoryItem } from "../HistoryList";
import Icon from "../Icon";
import { notify } from "../Toast";
import { api, API_URL } from "src/services/api";
import "./shortener-card.scss";

interface CreateShortUrlResponse {
  data: { shortUrl: string };
}
interface ShortenerCardProps {
  search: string;
}
const HISTORY_KEY = "short_history";

function isHistoryItem(value: unknown): value is HistoryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.originalUrl === "string" &&
    typeof item.shortUrl === "string" &&
    typeof item.createdAt === "string"
  );
}

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function loadHistory(): HistoryItem[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isHistoryItem) : [];
  } catch {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
}

export default function ShortenerCard({ search }: ShortenerCardProps) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const visibleHistory = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");
    if (!query) return history;
    return history.filter((item) =>
      `${item.shortUrl} ${item.originalUrl}`
        .toLocaleLowerCase("pt-BR")
        .includes(query),
    );
  }, [history, search]);

  async function handleShorten(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const originalUrl = url.trim();
    if (!isValidUrl(originalUrl)) {
      notify.error("Informe uma URL completa, incluindo http:// ou https://");
      return;
    }
    if (!API_URL) {
      notify.error("A URL da API não está configurada");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<CreateShortUrlResponse>("/create", {
        originalUrl,
      });
      const code = response.data.data.shortUrl;
      if (!code) throw new Error("A API não retornou o link encurtado");
      const generatedUrl = /^https?:\/\//i.test(code)
        ? code
        : `${API_URL.replace(/\/$/, "")}/${code.replace(/^\//, "")}`;
      setShortUrl(generatedUrl);
      setHistory((current) =>
        [
          {
            id: Date.now(),
            originalUrl,
            shortUrl: generatedUrl,
            createdAt: new Date().toISOString(),
          },
          ...current,
        ].slice(0, 20),
      );
      setUrl("");
      notify.success("Link encurtado!");
    } catch (error) {
      console.error(error);
      notify.error("Não foi possível encurtar o link");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      notify.success("Link copiado!");
    } catch {
      notify.error("Não foi possível copiar o link");
    }
  }

  return (
    <div className="shortener-content">
      <form className="shortener-form" onSubmit={handleShorten}>
        <div className="shortener-form__field">
          <Icon name="link" size={25} />
          <label className="sr-only" htmlFor="url-input">
            URL para encurtar
          </label>
          <input
            id="url-input"
            type="url"
            inputMode="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Cole sua URL aqui..."
            autoComplete="url"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner" />
          ) : (
            <Icon name="scissors" size={22} />
          )}
          {loading ? "Encurtando..." : "Encurtar"}
        </button>
      </form>

      {shortUrl && (
        <div className="shortener-result" role="status">
          <div>
            <span>Seu novo link</span>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
          <button type="button" onClick={() => copyToClipboard(shortUrl)}>
            <Icon name="copy" size={18} /> Copiar
          </button>
        </div>
      )}

      <section className="history-panel" id="links-recentes">
        <header className="history-panel__header">
          <div>
            <Icon name="clock" size={25} />
            <h2>Links recentes</h2>
          </div>
          <a href="#links-recentes">
            Ver todos <Icon name="arrow-right" size={18} />
          </a>
        </header>
        <HistoryList
          items={visibleHistory}
          hasSearch={Boolean(search.trim())}
          onOpen={(item) =>
            window.open(item.shortUrl, "_blank", "noopener,noreferrer")
          }
          onCopy={(item) => copyToClipboard(item.shortUrl)}
          onRemove={(id) =>
            setHistory((current) => current.filter((item) => item.id !== id))
          }
        />
      </section>
    </div>
  );
}
