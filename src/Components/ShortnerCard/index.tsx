import { useState, useEffect } from 'react';
import { notify } from 'src/Components/Toast';
import './styles.scss';
import { Card, CardBody, Input, Button, Spinner } from 'reactstrap';
import HistoryList from './../HistoryList';

// 🔹 Define o tipo do item do histórico
interface HistoryItem {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

export default function ShortenerCard() {
  const BASE_URL = "https://www.graciki.systems";

  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  /** LOAD HISTORY FROM LOCALSTORAGE **/
  useEffect(() => {
    const saved = localStorage.getItem('short_history');
    if (saved) setHistory(JSON.parse(saved) as HistoryItem[]);
  }, []);

  /** SAVE HISTORY **/
  useEffect(() => {
    localStorage.setItem('short_history', JSON.stringify(history));
  }, [history]);

  /** ADD HISTORY ITEM **/
  function pushHistory(entry: HistoryItem) {
    setHistory(prev => [entry, ...prev].slice(0, 20));
  }

  /** SHORTEN URL **/
  async function handleShorten() {
    if (!url.trim() || !url.includes(".")) {
      return notify.error('Digite uma URL válida');
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url.trim() }),
      });

      if (!res.ok) throw new Error(`API retornou ${res.status}`);

      const json = await res.json();
      const code: string = json.data.shortUrl;

      if (!code) throw new Error('API não retornou shortUrl');

      const fullUrl = `${BASE_URL}/${code}`;
      setShortUrl(fullUrl);

      pushHistory({
        id: Date.now(),
        originalUrl: url,
        shortUrl: fullUrl,
        createdAt: new Date().toISOString(),
      });

      notify.success("Link encurtado!");
      setUrl("");

    } catch (err) {
      console.error(err);
      notify.error("Erro ao encurtar o link");
    } finally {
      setLoading(false);
    }
  }

  /** COPY RESULT URL **/
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    notify.success("Copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  /** ACTIONS FROM HISTORY **/
  const handleHistoryCopy = (item: HistoryItem) =>
    navigator.clipboard.writeText(item.shortUrl) && notify.success("Copiado!");

  const handleOpen = (item: HistoryItem) =>
    window.open(item.shortUrl, "_blank");

  const handleRemove = (id: number) =>
    setHistory(prev => prev.filter(i => i.id !== id));

  return (
    <div className="d-flex justify-content-center w-100 p-3">
      <Card className="shortener-card border-0">
        <CardBody className="p-4 p-md-5">

          <h2 className="shortener-title">
            🔗 <span>Encurtador de Links</span>
          </h2>

          <div className="shortener-form">
            <Input
              placeholder="Cole seu link aqui..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleShorten} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Encurtar"}
            </Button>
          </div>

          {shortUrl && (
            <div className="shortener-result mt-4">
              <p className="mb-1 text-muted small">Link Encurtado:</p>

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="d-block text-truncate"
              >
                {shortUrl}
              </a>

              <div className="d-flex gap-2 mt-3">
                <Button size="sm" color="success" onClick={handleCopy}>
                  {copied ? "✅ Copiado!" : "📋 Copiar"}
                </Button>

                <Button
                  size="sm"
                  outline
                  color="secondary"
                  onClick={() => window.open(shortUrl, "_blank")}
                >
                  Abrir
                </Button>
              </div>
            </div>
          )}

          <div className="mt-5">
            <h5 className="mb-3" style={{ fontWeight: 700, opacity: .8 }}>
              Histórico Recente
            </h5>

            {history.length > 0 ? (
              <HistoryList
                items={history}
                onOpen={handleOpen}
                onCopy={handleHistoryCopy}
                onRemove={handleRemove}
              />
            ) : (
              <p className="text-center text-muted">
                Nenhum link ainda — crie o primeiro!
              </p>
            )}
          </div>

        </CardBody>
      </Card>
    </div>
  );
}
