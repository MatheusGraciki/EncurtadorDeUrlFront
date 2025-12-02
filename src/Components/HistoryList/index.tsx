interface HistoryItem {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  onOpen: (item: HistoryItem) => void;
  onCopy: (item: HistoryItem) => void;
  onRemove: (id: number) => void;
}

export default function HistoryList({ items, onOpen, onCopy, onRemove }: HistoryListProps) {
  if (!items || items.length === 0) {
    return (
      <div style={{ opacity: 0.7, textAlign: 'center', padding: '0.8rem' }}>
        Nenhum link ainda — crie o primeiro!
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.6rem .8rem',
            borderRadius: 10,
            background: 'rgba(0,0,0,0.02)',
            border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--accent-color') || '#4c956c'}`
          }}
        >
          <div style={{ flex: 1, marginRight: 12 }}>
            <div style={{ fontSize: 13, color: 'var(--text-color)', fontWeight: 600 }}>
              {it.shortUrl}
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, wordBreak: 'break-all' }}>
              {it.originalUrl}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="copy-button" onClick={() => onCopy(it)}>📋</button>
            <button className="global-btn" onClick={() => onOpen(it)}>🔗</button>
            <button
              className="global-btn"
              onClick={() => onRemove(it.id)}
              style={{
                background: 'transparent',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
