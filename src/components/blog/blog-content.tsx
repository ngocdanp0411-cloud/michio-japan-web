import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|\[[0-9]+\])/g);
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-semibold text-[var(--michio-deep-navy)]">{token.slice(2, -2)}</strong>;
    }
    if (/^\[[0-9]+\]$/.test(token)) {
      return <sup key={index} className="ml-0.5 text-[10px] text-[var(--michio-deep-rose)]">{token}</sup>;
    }
    return <span key={index}>{token}</span>;
  });
}

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

export function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let table: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(<p key={`p-${blocks.length}`}>{inline(paragraph.join(" ").trim())}</p>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc space-y-1.5 pl-5">
          {list.map((item, index) => <li key={index}>{inline(item)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      const rows = table
        .filter((line) => !/^\|\s*:?-{2,}/.test(line.trim()))
        .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      if (rows.length) {
        blocks.push(
          <div key={`table-${blocks.length}`} className="overflow-x-auto rounded-xl border border-[var(--michio-line)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--michio-soft-blush)] text-[var(--michio-deep-navy)]">
                <tr>{rows[0].map((cell, index) => <th key={index} className="px-3 py-2 font-semibold">{inline(cell)}</th>)}</tr>
              </thead>
              <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex} className="border-t border-[var(--michio-line)]"><>{row.map((cell, index) => <td key={index} className="px-3 py-2 align-top">{inline(cell)}</td>)}</></tr>)}</tbody>
            </table>
          </div>,
        );
      }
      table = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }
    if (isTableLine(line)) {
      flushParagraph();
      flushList();
      table.push(line);
      return;
    }
    if (table.length) flushTable();
    if (/^#{2,3}\s+/.test(line)) {
      flushParagraph();
      flushList();
      const level = line.startsWith("###") ? 3 : 2;
      const heading = line.replace(/^#{2,3}\s+/, "");
      blocks.push(level === 3
        ? <h3 key={`h-${blocks.length}`} className="pt-2 font-display text-lg font-semibold text-[var(--michio-deep-navy)]">{inline(heading)}</h3>
        : <h2 key={`h-${blocks.length}`} className="pt-4 font-display text-xl font-semibold text-[var(--michio-deep-navy)]">{inline(heading)}</h2>);
      return;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
      return;
    }
    if (/^(?:Q\d+:|\d+[.)]\s+)/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(<h3 key={`faq-${blocks.length}`} className="pt-2 font-display text-base font-semibold text-[var(--michio-deep-navy)]">{inline(line)}</h3>);
      return;
    }
    if (/^A\d+:/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(<p key={`answer-${blocks.length}`} className="rounded-lg bg-[var(--michio-soft-blush)]/50 px-3 py-2">{inline(line)}</p>);
      return;
    }
    if (line === "Trả lời nhanh") {
      flushParagraph();
      flushList();
      blocks.push(<h2 key={`quick-${blocks.length}`} className="font-display text-xl font-semibold text-[var(--michio-deep-navy)]">{line}</h2>);
      return;
    }
    if (line === "Nguồn tham khảo" || line === "## Nguồn tham khảo") {
      flushParagraph();
      flushList();
      blocks.push(<h2 key={`ref-${blocks.length}`} className="pt-4 font-display text-xl font-semibold text-[var(--michio-deep-navy)]">Nguồn tham khảo</h2>);
      return;
    }
    paragraph.push(line);
  });
  flushParagraph();
  flushList();
  flushTable();

  return <div className="space-y-4 text-[15px] leading-7 text-[var(--michio-deep-navy)]/80">{blocks}</div>;
}
