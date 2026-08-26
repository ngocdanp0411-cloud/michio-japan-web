"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Admin supports user-provided GitHub/CDN image URLs, so next/image cannot optimize every source. */
/* eslint-disable @next/next/no-img-element */

type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  image: string;
  gallery?: string[];
  badge?: string;
  excerpt: string;
  description: string;
  active?: boolean;
};

type Category = {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  active?: boolean;
};

function DescriptionPreview({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return (
    <div className="space-y-3 text-sm leading-6 text-[var(--michio-deep-navy)]/80">
      {blocks.length === 0 ? <p className="text-gray-400">Nội dung xem trước sẽ hiển thị ở đây.</p> : blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        if (lines.every((line) => line.startsWith("- "))) {
          return <ul key={index} className="list-disc space-y-1 pl-5">{lines.map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
        }
        return <div key={index}>{lines.map((line) => line.startsWith("**") && line.endsWith("**") ? <h4 key={line} className="font-semibold">{line.slice(2, -2)}</h4> : <p key={line}>{line}</p>)}</div>;
      })}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [section, setSection] = useState<"products" | "categories">("products");
  const [editing, setEditing] = useState<Product | null>(null);
  const [categoryEditing, setCategoryEditing] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (search = "", category = "") => {
    const res = await fetch(`/api/admin/products?q=${encodeURIComponent(search)}&cat=${encodeURIComponent(category)}`, { cache: "no-store" });
    if (res.ok) setProducts((await res.json()).products);
  }, []);

  const loadCategories = useCallback(async () => {
    const res = await fetch("/api/admin/categories", { cache: "no-store" });
    if (res.ok) setCategories((await res.json()).categories);
  }, []);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/products?q=", { cache: "no-store" });
    setAuthed(res.ok);
    if (res.ok) await Promise.all([load(), loadCategories()]);
  }, [load, loadCategories]);

  useEffect(() => {
    const timer = window.setTimeout(() => void checkAuth(), 0);
    return () => window.clearTimeout(timer);
  }, [checkAuth]);

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      setAuthed(true);
      await Promise.all([load(q, cat), loadCategories()]);
      setMsg("Đăng nhập thành công");
    } else setMsg(data.error || "Sai mật khẩu");
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  };

  useEffect(() => {
    if (!authed || section !== "products") return;
    const timer = window.setTimeout(() => void load(q, cat), 180);
    return () => window.clearTimeout(timer);
  }, [authed, q, cat, section, load]);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/admin/products" : `/api/admin/products/${editing.slug}`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (res.ok) {
      const storageMessage = data.storage === "github" ? " Đã commit lên GitHub, Vercel sẽ tự deploy." : " Đang lưu local; production cần cấu hình GITHUB_TOKEN/GITHUB_REPO.";
      setMsg((isNew ? "Đã thêm sản phẩm." : "Đã lưu sản phẩm.") + storageMessage);
      setEditing(null);
      setIsNew(false);
      await load(q, cat);
    } else setMsg(data.error || "Lỗi lưu sản phẩm");
    setSaving(false);
  };

  const del = async (slug: string) => {
    if (!confirm(`Xóa ${slug}?`)) return;
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setMsg("Đã xóa sản phẩm");
      await load(q, cat);
    } else setMsg((await res.json().catch(() => ({}))).error || "Lỗi xóa sản phẩm");
  };

  const startNew = () => {
    const defaultCategory = categories.find((category) => category.active !== false)?.slug || categories[0]?.slug || "cham-soc-da";
    setEditing({ slug: "", name: "", category: defaultCategory, price: 0, originalPrice: undefined, rating: 4.8, ratingCount: 0, image: "", gallery: [], excerpt: "", description: "", active: true });
    setIsNew(true);
  };

  const uploadImages = async (files: FileList | null) => {
    if (!editing || !files?.length) return;
    if (!editing.slug) {
      setMsg("Hãy nhập slug trước khi upload ảnh.");
      if (imageInputRef.current) imageInputRef.current.value = "";
      return;
    }
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files).slice(0, 8)) {
      const body = new FormData();
      body.append("slug", editing.slug);
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) uploaded.push(data.url);
      else setMsg(data.error || `Không thể upload ${file.name}`);
    }
    if (uploaded.length) {
      setEditing((current) => current ? { ...current, image: current.image || uploaded[0], gallery: Array.from(new Set([...(current.gallery || []), ...uploaded])) } : current);
      setMsg(`Đã upload ${uploaded.length} ảnh. Hãy bấm Lưu để gắn vào sản phẩm.`);
    }
    setUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const updateDescription = (value: string) => setEditing((current) => current ? { ...current, description: value } : current);
  const insertDescription = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea || !editing) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = `${editing.description.slice(0, start)}${snippet}${editing.description.slice(end)}`;
    updateDescription(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    });
  };

  const saveCategory = async () => {
    if (!categoryEditing) return;
    setSaving(true);
    const method = isNewCategory ? "POST" : "PUT";
    const url = isNewCategory ? "/api/admin/categories" : `/api/admin/categories/${categoryEditing.slug}`;
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(categoryEditing) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMsg((isNewCategory ? "Đã thêm danh mục." : "Đã lưu danh mục.") + (data.storage === "github" ? " Đã commit lên GitHub." : " Đang lưu local."));
      setCategoryEditing(null);
      setIsNewCategory(false);
      await loadCategories();
    } else setMsg(data.error || "Lỗi lưu danh mục");
    setSaving(false);
  };

  const deleteCategory = async (slug: string) => {
    if (!confirm(`Xóa danh mục ${slug}?`)) return;
    const res = await fetch(`/api/admin/categories/${slug}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMsg("Đã xóa danh mục");
      await loadCategories();
    } else setMsg(data.error || "Không thể xóa danh mục");
  };

  if (authed === null) return <div className="p-10 text-sm">Đang kiểm tra...</div>;
  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow">
          <h1 className="font-bold text-lg">Admin Michio Japan</h1>
          <p className="text-sm text-[var(--michio-text-muted)] mt-1">Đăng nhập để chỉnh sản phẩm, danh mục và nội dung</p>
          <input type="password" placeholder="Mật khẩu admin" value={password} onChange={(e) => setPassword(e.target.value)} className="michio-input mt-4 w-full rounded-full px-4 py-2.5 text-sm outline-none" onKeyDown={(e) => e.key === "Enter" && login()} />
          <button onClick={login} className="michio-btn-primary mt-3 w-full rounded-full py-2.5 text-sm">Đăng nhập</button>
          {msg && <div className="mt-3 text-sm text-center text-[var(--michio-deep-rose)]">{msg}</div>}
          <div className="mt-4 text-xs text-gray-400">Đổi mật khẩu trong .env.local ADMIN_PASSWORD</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="michio-eyebrow">Michio Japan</p><h1 className="michio-h1 text-[2rem]">Admin quản lý nội dung</h1></div>
        <div className="flex gap-2"><button onClick={section === "products" ? startNew : () => { setCategoryEditing({ slug: "", name: "", shortName: "", color: "#B83B68", icon: "sparkle", active: true }); setIsNewCategory(true); }} className="michio-btn-navy rounded-full px-4 py-2 text-sm">+ {section === "products" ? "Thêm sản phẩm" : "Thêm danh mục"}</button><button onClick={logout} className="michio-btn-secondary rounded-full px-4 py-2 text-sm">Đăng xuất</button></div>
      </div>

      <div className="mt-5 flex gap-2 border-b"><button onClick={() => setSection("products")} className={`px-4 py-2 text-sm font-semibold ${section === "products" ? "border-b-2 border-[var(--michio-primary)] text-[var(--michio-primary)]" : "text-[var(--michio-text-muted)]"}`}>Sản phẩm ({products.length})</button><button onClick={() => setSection("categories")} className={`px-4 py-2 text-sm font-semibold ${section === "categories" ? "border-b-2 border-[var(--michio-primary)] text-[var(--michio-primary)]" : "text-[var(--michio-text-muted)]"}`}>Danh mục ({categories.length})</button></div>
      {msg && <div className="mt-3 rounded-lg border border-[var(--michio-primary-soft)] bg-[var(--michio-surface-warm)] px-3 py-2 text-sm text-[var(--michio-navy)]">{msg}</div>}

      {section === "products" ? <>
        <div className="mt-4 flex flex-wrap gap-2"><input placeholder="Tìm tên, slug, excerpt..." value={q} onChange={(e) => setQ(e.target.value)} className="michio-input min-w-[220px] flex-1 rounded-full px-4 py-2.5 text-sm leading-5 outline-none" /><select value={cat} onChange={(e) => setCat(e.target.value)} className="michio-btn-secondary rounded-full px-4 py-2.5 text-sm leading-5"><option value="">Tất cả danh mục</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}{c.active === false ? " (ẩn)" : ""}</option>)}</select><button onClick={() => void load(q, cat)} className="michio-btn-secondary rounded-full px-4 py-2.5 text-sm leading-5">Tải lại</button></div>
        <div className="mt-6 grid gap-3">{products.map((p) => <div key={p.slug} className="flex gap-3 rounded-xl border bg-white p-3"><img src={p.image || "/vercel.svg"} alt={p.name} className="h-16 w-16 shrink-0 rounded-lg border object-cover" /><div className="min-w-0 flex-1"><div className="line-clamp-1 text-sm font-medium leading-5">{p.name}</div><div className="line-clamp-1 text-xs text-[var(--michio-text-muted)]">{p.slug} • {categories.find((c) => c.slug === p.category)?.shortName || p.category} • {new Intl.NumberFormat("vi-VN").format(p.price)}₫ • {p.active === false ? "Đang ẩn" : "Đang hiển thị"}</div><div className="line-clamp-1 text-xs text-gray-400">{p.excerpt}</div></div><div className="flex shrink-0 flex-col gap-1"><button onClick={() => { setEditing(p); setIsNew(false); }} className="michio-btn-secondary rounded-full px-3 py-1.5 text-xs">Sửa</button><button onClick={() => del(p.slug)} className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-[var(--michio-danger)] transition-colors duration-200 hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">Xóa</button><a href={`/san-pham/${p.slug}`} target="_blank" rel="noreferrer" className="michio-btn-secondary rounded-full px-3 py-1.5 text-center text-xs">Xem</a></div></div>)}</div>
        {products.length === 0 && <div className="mt-8 rounded-xl border border-dashed border-[var(--michio-border-strong)] bg-[var(--michio-surface-muted)] p-8 text-center text-sm text-[var(--michio-text-muted)]">Không tìm thấy sản phẩm phù hợp.</div>}
      </> : <div className="mt-6 grid gap-3 md:grid-cols-2">{categories.map((category) => <div key={category.slug} className="flex items-start gap-3 rounded-xl border bg-white p-4"><div className="h-10 w-10 shrink-0 rounded-xl" style={{ backgroundColor: category.color }} /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h2 className="font-semibold">{category.name}</h2>{category.active === false && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-[var(--michio-text-muted)]">Đang ẩn</span>}</div><p className="mt-1 text-xs text-[var(--michio-text-muted)]">{category.slug} · {category.shortName} · icon: {category.icon}</p></div><div className="flex gap-1"><button onClick={() => { setCategoryEditing(category); setIsNewCategory(false); }} className="michio-btn-secondary rounded-full px-3 py-1.5 text-xs">Sửa</button><button onClick={() => deleteCategory(category.slug)} className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-[var(--michio-danger)] transition-colors duration-200 hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">Xóa</button></div></div>)}</div>}

      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-bold">{isNew ? "Thêm sản phẩm" : `Sửa ${editing.slug}`}</h2><button onClick={() => setEditing(null)} className="michio-btn-secondary rounded-full px-3 py-1 text-sm">Đóng</button></div><div className="mt-4 grid gap-3 text-sm"><label>Slug *<input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" placeholder="vi-du-san-pham-120g" disabled={!isNew} /></label><label>Tên *<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><div className="grid grid-cols-1 gap-3 md:grid-cols-2"><label>Danh mục<select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2">{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}{c.active === false ? " (ẩn)" : ""}</option>)}</select></label><label>Giá *<input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2"><label>Giá gốc<input type="number" value={editing.originalPrice || ""} onChange={(e) => setEditing({ ...editing, originalPrice: e.target.value ? Number(e.target.value) : undefined })} className="michio-input mt-1 w-full rounded border px-3 py-2" placeholder="Để trống nếu không giảm" /></label><label>Ảnh chính<input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" placeholder="/products/slug/image.webp" /></label></div><div className="rounded-lg border bg-gray-50 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-medium">Upload ảnh sản phẩm</span><span className="text-xs text-[var(--michio-text-muted)]">JPG, PNG, WebP, GIF, AVIF · tối đa 5 MB/ảnh</span></div><div className="mt-2 flex flex-wrap items-center gap-2"><input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple onChange={(e) => void uploadImages(e.target.files)} disabled={uploading || !editing.slug} className="block max-w-full text-xs" />{uploading && <span className="text-xs text-[var(--michio-deep-rose)]">Đang upload...</span>}</div>{!editing.slug && <p className="mt-1 text-xs text-amber-700">Nhập slug trước để tạo đúng thư mục ảnh.</p>}<div className="mt-2 flex flex-wrap gap-2">{[editing.image, ...(editing.gallery || [])].filter(Boolean).map((image) => <span key={image} className="max-w-full truncate rounded bg-white px-2 py-1 text-xs text-gray-600">{image}</span>)}</div></div><label>Gallery (cách nhau dấu phẩy)<input value={(editing.gallery || []).join(", ")} onChange={(e) => setEditing({ ...editing, gallery: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="michio-input mt-1 w-full rounded border px-3 py-2" placeholder="/products/slug/1.webp, /products/slug/2.webp" /></label><label>Excerpt<input value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><div className="rounded-lg border p-3"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-medium">Mô tả sản phẩm</span><span className="text-xs text-gray-400">{editing.description.length}/12.000 ký tự</span></div><div className="mt-2 flex flex-wrap gap-1"><button type="button" onClick={() => insertDescription("**Tiêu đề**\n\n")} className="rounded border px-2 py-1 text-xs font-semibold">Tiêu đề</button><button type="button" onClick={() => insertDescription("**chữ đậm**")} className="rounded border px-2 py-1 text-xs font-semibold">B</button><button type="button" onClick={() => insertDescription("- Nội dung mới\n")} className="rounded border px-2 py-1 text-xs">• Danh sách</button></div><textarea ref={textareaRef} value={editing.description} onChange={(e) => updateDescription(e.target.value)} rows={10} className="michio-input mt-2 w-full rounded border px-3 py-2 font-mono text-xs" placeholder="**Điểm nổi bật**\n\n- Thành phần...\n- Cách dùng..." /><div className="mt-3 rounded border bg-[var(--michio-soft-blush)]/30 p-3"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--michio-text-muted)]">Xem trước storefront</p><DescriptionPreview text={editing.description} /></div></div><label className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2"><input type="checkbox" checked={editing.active !== false} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="h-4 w-4 accent-[var(--michio-deep-rose)]" /><span>Hiển thị sản phẩm trên website</span></label><div className="grid grid-cols-2 gap-3"><label>Rating<input type="number" min="0" max="5" step="0.1" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><label>Rating count<input type="number" min="0" value={editing.ratingCount} onChange={(e) => setEditing({ ...editing, ratingCount: Number(e.target.value) })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label></div></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setEditing(null)} className="michio-btn-secondary rounded-full px-4 py-2 text-sm">Hủy</button><button onClick={save} disabled={saving || uploading} className="michio-btn-primary rounded-full px-5 py-2 text-sm disabled:cursor-not-allowed">{saving ? "Đang lưu..." : "Lưu sản phẩm"}</button></div></div></div>}

      {categoryEditing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-lg rounded-xl bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-bold">{isNewCategory ? "Thêm danh mục" : `Sửa ${categoryEditing.name}`}</h2><button onClick={() => setCategoryEditing(null)} className="michio-btn-secondary rounded-full px-3 py-1 text-sm">Đóng</button></div><div className="mt-4 grid gap-3 text-sm"><label>Slug *<input value={categoryEditing.slug} onChange={(e) => setCategoryEditing({ ...categoryEditing, slug: e.target.value })} disabled={!isNewCategory} placeholder="cham-soc-da" className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><label>Tên danh mục *<input value={categoryEditing.name} onChange={(e) => setCategoryEditing({ ...categoryEditing, name: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><label>Tên ngắn *<input value={categoryEditing.shortName} onChange={(e) => setCategoryEditing({ ...categoryEditing, shortName: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><div className="grid grid-cols-2 gap-3"><label>Màu HEX<input value={categoryEditing.color} onChange={(e) => setCategoryEditing({ ...categoryEditing, color: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label><label>Icon key<input value={categoryEditing.icon} onChange={(e) => setCategoryEditing({ ...categoryEditing, icon: e.target.value })} className="michio-input mt-1 w-full rounded border px-3 py-2" /></label></div><label className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2"><input type="checkbox" checked={categoryEditing.active !== false} onChange={(e) => setCategoryEditing({ ...categoryEditing, active: e.target.checked })} className="h-4 w-4 accent-[var(--michio-deep-rose)]" /><span>Hiển thị danh mục trên điều hướng website</span></label><p className="text-xs text-[var(--michio-text-muted)]">Slug được giữ nguyên khi chỉnh sửa để không làm hỏng các đường dẫn hiện có.</p></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setCategoryEditing(null)} className="michio-btn-secondary rounded-full px-4 py-2 text-sm">Hủy</button><button onClick={saveCategory} disabled={saving} className="michio-btn-primary rounded-full px-5 py-2 text-sm disabled:cursor-not-allowed">{saving ? "Đang lưu..." : "Lưu danh mục"}</button></div></div></div>}
    </div>
  );
}
