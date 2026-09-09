import Link from "next/link";
import type { ReactNode } from "react";

const INTERNAL_PATH = /^\/(?:san-pham|danh-muc|tin-tuc|cua-hang|gioi-thieu|huong-dan-mua-hang|chinh-sach-[a-z-]+|tim-kiem)(?:\/[a-z0-9-]+)?(?:\?[^\s]+)?$/i;

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\)|\[[^\]]+\]\(\/(?:san-pham|danh-muc|tin-tuc|cua-hang|gioi-thieu|huong-dan-mua-hang|chinh-sach-[a-z-]+|tim-kiem)(?:\/[a-z0-9-]+)?(?:\?[^\s)]+)?\)|https?:\/\/[^\s]+|\[[0-9]+\]|\/(?:san-pham|danh-muc|tin-tuc|cua-hang|gioi-thieu|huong-dan-mua-hang|chinh-sach-[a-z-]+|tim-kiem)(?:\/[a-z0-9-]+)?(?:\?[^\s]+)?)/gi);
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-semibold text-[var(--michio-navy)]">{token.slice(2, -2)}</strong>;
    }
    if (/^\[[0-9]+\]$/.test(token)) {
      return <sup key={index} className="ml-0.5 text-[10px] font-semibold text-[var(--michio-primary)]">{token}</sup>;
    }
    const markdownLink = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/i);
    if (markdownLink) {
      return <a key={index} href={markdownLink[2]} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--michio-primary)] underline decoration-[var(--michio-primary)]/35 underline-offset-4">{markdownLink[1]}</a>;
    }
    const internalMarkdownLink = token.match(/^\[([^\]]+)\]\((\/(?:san-pham|danh-muc|tin-tuc|cua-hang|gioi-thieu|huong-dan-mua-hang|chinh-sach-[a-z-]+|tim-kiem)(?:\/[a-z0-9-]+)?(?:\?[^\s)]+)?)\)$/i);
    if (internalMarkdownLink) {
      return <Link key={index} href={internalMarkdownLink[2]} className="font-medium text-[var(--michio-primary)] underline decoration-[var(--michio-primary)]/35 underline-offset-4 transition-colors hover:text-[var(--michio-primary-hover)]">{internalMarkdownLink[1]}</Link>;
    }
    if (/^https?:\/\//i.test(token)) {
      return <a key={index} href={token} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-[var(--michio-primary)] underline decoration-[var(--michio-primary)]/35 underline-offset-4">{token}</a>;
    }
    if (INTERNAL_PATH.test(token)) {
      return <Link key={index} href={token} className="font-medium text-[var(--michio-primary)] underline decoration-[var(--michio-primary)]/35 underline-offset-4 transition-colors hover:text-[var(--michio-primary-hover)]">{token}</Link>;
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
  let orderedList: string[] = [];
  let table: string[] = [];
  let quickAnswer: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(<p key={`p-${blocks.length}`} className="text-base leading-[1.75] text-[var(--michio-text-muted)]">{inline(paragraph.join(" ").trim())}</p>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="list-disc space-y-2 pl-5 text-base leading-[1.7] text-[var(--michio-text-muted)] marker:text-[var(--michio-primary)]">
          {list.map((item, index) => <li key={index}>{inline(item)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  const flushOrderedList = () => {
    if (orderedList.length) {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="list-decimal space-y-2 pl-5 text-base leading-[1.7] text-[var(--michio-text-muted)] marker:font-semibold marker:text-[var(--michio-primary)]">
          {orderedList.map((item, index) => <li key={index}>{inline(item)}</li>)}
        </ol>,
      );
      orderedList = [];
    }
  };
  const flushQuickAnswer = () => {
    if (quickAnswer) {
      blocks.push(
        <section key={`quick-${blocks.length}`} aria-label="Trả lời nhanh" className="rounded-2xl bg-[var(--michio-primary-soft)] p-4 md:p-5">
          <h2 className="text-lg font-bold text-[var(--michio-navy)]">Trả lời nhanh</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-[1.7] text-[var(--michio-text-muted)] marker:text-[var(--michio-primary)]">
            {quickAnswer.map((item, index) => <li key={index}>{inline(item)}</li>)}
          </ul>
        </section>,
      );
      quickAnswer = null;
    }
  };
  const flushTable = () => {
    if (table.length) {
      const rows = table
        .filter((line) => !/^\|\s*:?-{2,}/.test(line.trim()))
        .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      if (rows.length) {
        blocks.push(
          <div key={`table-${blocks.length}`} className="overflow-x-auto rounded-xl border border-[var(--michio-border)]">
            <table className="min-w-[560px] text-left text-sm leading-6"><caption className="sr-only">Bảng thông tin trong bài viết</caption>
              <thead className="bg-[var(--michio-primary-soft)] text-[var(--michio-navy)]">
                <tr>{rows[0].map((cell, index) => <th key={index} scope="col" className="px-3 py-2 text-xs font-semibold leading-5">{inline(cell)}</th>)}</tr>
              </thead>
              <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex} className="border-t border-[var(--michio-border)]"><>{row.map((cell, index) => <td key={index} className="px-3 py-2 align-top text-[var(--michio-text-muted)]">{inline(cell)}</td>)}</></tr>)}</tbody>
            </table>
          </div>,
        );
      }
      table = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (quickAnswer && line.startsWith("- ")) {
      quickAnswer.push(line.slice(2));
      return;
    }
    if (quickAnswer && line) flushQuickAnswer();
    if (!line) {
      if (quickAnswer?.length) flushQuickAnswer();
      flushParagraph();
      flushList();
      flushOrderedList();
      flushTable();
      return;
    }
    if (/^#\s+/.test(line)) return;
    if (line === "Trả lời nhanh") {
      flushParagraph();
      flushList();
      flushOrderedList();
      quickAnswer = [];
      return;
    }
    if (isTableLine(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      table.push(line);
      return;
    }
    if (table.length) flushTable();
    if (/^#{2,3}\s+/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const level = line.startsWith("###") ? 3 : 2;
      const heading = line.replace(/^#{2,3}\s+/, "");
      blocks.push(level === 3
        ? <h3 key={`h-${blocks.length}`} className="pt-2 text-lg font-bold leading-snug text-[var(--michio-navy)] md:text-xl">{inline(heading)}</h3>
        : <h2 key={`h-${blocks.length}`} className="pt-4 text-[1.35rem] font-bold leading-snug tracking-[-0.015em] text-[var(--michio-navy)] md:text-2xl">{inline(heading)}</h2>);
      return;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      flushOrderedList();
      list.push(line.slice(2));
      return;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      flushParagraph();
      flushList();
      orderedList.push(line.replace(/^\d+[.)]\s+/, ""));
      return;
    }
    if (/^Q\d+:/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push(<h3 key={`faq-${blocks.length}`} className="pt-2 text-base font-bold leading-6 text-[var(--michio-navy)]">{inline(line)}</h3>);
      return;
    }
    if (/^A\d+:/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push(<p key={`answer-${blocks.length}`} className="rounded-xl bg-[var(--michio-surface-warm)] px-4 py-3 text-base leading-7 text-[var(--michio-text-muted)]">{inline(line)}</p>);
      return;
    }
    if (line === "Nguồn tham khảo" || line === "## Nguồn tham khảo") {
      flushParagraph();
      flushList();
      flushOrderedList();
      blocks.push(<h2 key={`ref-${blocks.length}`} className="pt-4 text-[1.35rem] font-bold leading-snug text-[var(--michio-navy)] md:text-2xl">Nguồn tham khảo</h2>);
      return;
    }
    paragraph.push(line);
  });
  flushParagraph();
  flushList();
  flushOrderedList();
  flushQuickAnswer();
  flushTable();

  return <div className="space-y-5 break-words text-[var(--michio-text-muted)] md:space-y-6">{blocks}</div>;
}
