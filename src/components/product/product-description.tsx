function parseInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-[var(--michio-deep-navy)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ProductDescription({ text }: { text: string }) {
  // split by double newline -> blocks, but within each block handle mixed heading+list+paragraph
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--michio-deep-navy)]/80">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // if block contains bullet lines, split into segments
        if (trimmed.includes("\n- ")) {
          const lines = trimmed.split("\n");
          const elements: React.ReactNode[] = [];
          let listBuffer: string[] = [];

          const flushList = (key: string) => {
            if (listBuffer.length) {
              elements.push(
                <ul key={key} className="list-disc pl-5 space-y-1.5">
                  {listBuffer.map((it, j) => (
                    <li key={j} className="pl-1">
                      {parseInline(it)}
                    </li>
                  ))}
                </ul>
              );
              listBuffer = [];
            }
          };

          lines.forEach((line, li) => {
            const t = line.trim();
            if (t.startsWith("- ")) {
              listBuffer.push(t.replace(/^-+\s*/, ""));
            } else if (t.startsWith("**") && t.endsWith("**")) {
              flushList(`${idx}-list-${li}`);
              elements.push(
                <h3 key={`${idx}-h-${li}`} className="font-display text-sm font-semibold tracking-wide text-[var(--michio-deep-navy)]">
                  {parseInline(t)}
                </h3>
              );
            } else if (t) {
              flushList(`${idx}-list-${li}`);
              elements.push(<p key={`${idx}-p-${li}`}>{parseInline(t)}</p>);
            }
          });
          flushList(`${idx}-tail`);
          return <div key={idx} className="space-y-2">{elements}</div>;
        }

        // pure bullet block
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-+\s*/, "").trim()).filter(Boolean);
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5">
              {items.map((it, j) => (
                <li key={j} className="pl-1">{parseInline(it)}</li>
              ))}
            </ul>
          );
        }

        // heading-only block
        if (trimmed.startsWith("**")) {
          const lines = trimmed.split("\n");
          const first = lines[0];
          const rest = lines.slice(1).join("\n").trim();
          return (
            <div key={idx}>
              <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--michio-deep-navy)]">
                {parseInline(first)}
              </h3>
              {rest && <p className="mt-1.5">{parseInline(rest)}</p>}
            </div>
          );
        }

        return <p key={idx}>{parseInline(trimmed)}</p>;
      })}
    </div>
  );
}
