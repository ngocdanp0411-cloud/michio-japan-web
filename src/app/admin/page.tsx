"use client";
import { useCallback, useEffect, useState } from "react";

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

const CATS = ["collagen", "cham-soc-da", "cham-soc-co-the", "cham-soc-suc-khoe", "me-va-be", "hang-tieu-dung"];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (search = "", category = "") => {
    const res = await fetch(`/api/admin/products?q=${encodeURIComponent(search)}&cat=${encodeURIComponent(category)}`);
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/products?q=");
    setAuthed(res.ok);
    if (res.ok) await load();
  }, [load]);

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
      await load(q, cat);
      setMsg("Đăng nhập thành công");
    } else setMsg(data.error || "Sai mật khẩu");
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  };

  useEffect(() => {
    if (!authed) return;
    const timer = window.setTimeout(() => void load(q, cat), 0);
    return () => window.clearTimeout(timer);
  }, [authed, q, cat, load]);

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
      load();
    } else setMsg(data.error || "Lỗi lưu sản phẩm");
    setSaving(false);
  };

  const del = async (slug: string) => {
    if (!confirm(`Xóa ${slug}?`)) return;
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setMsg("Đã xóa");
      load();
    } else setMsg("Lỗi xóa");
  };

  const startNew = () => {
    setEditing({
      slug: "",
      name: "",
      category: "cham-soc-da",
      price: 0,
      originalPrice: undefined,
      rating: 4.8,
      ratingCount: 0,
      image: "",
      gallery: [],
      excerpt: "",
      description: "",
      active: true,
    });
    setIsNew(true);
  };

  if (authed === null) return <div className="p-10 text-sm">Đang kiểm tra...</div>;
  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow">
          <h1 className="font-bold text-lg">Admin Michio Japan</h1>
            <p className="text-sm text-gray-500 mt-1">Đăng nhập để chỉnh giá, nội dung, trạng thái và sản phẩm</p>
            <input
              type="password"
              placeholder="Mật khẩu admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--michio-deep-rose)]/20"
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <button onClick={login} className="mt-3 w-full rounded-full bg-[var(--michio-deep-rose)] py-2.5 text-sm font-semibold text-white">
            Đăng nhập
          </button>
          {msg && <div className="mt-3 text-sm text-center text-[var(--michio-deep-rose)]">{msg}</div>}
          <div className="mt-4 text-xs text-gray-400">Đổi mật khẩu trong .env.local ADMIN_PASSWORD</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-bold text-xl">Admin — {products.length} sản phẩm</h1>
        <div className="flex gap-2">
          <button onClick={startNew} className="rounded-full bg-[var(--michio-deep-navy)] px-4 py-2 text-sm font-semibold text-white">
            + Thêm sản phẩm
          </button>
          <button onClick={logout} className="rounded-full border px-4 py-2 text-sm">
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          placeholder="Tìm tên, slug, excerpt..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 min-w-[220px] rounded-full border bg-white px-4 py-2.5 text-sm outline-none"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full border bg-white px-4 py-2.5 text-sm">
          <option value="">Tất cả danh mục</option>
          {CATS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
          <button onClick={() => void load(q, cat)} className="rounded-full border bg-white px-4 py-2.5 text-sm">
            Tải lại
          </button>
      </div>

      {msg && <div className="mt-3 text-sm bg-[var(--michio-soft-blush)] px-3 py-2 rounded">{msg}</div>}

      <div className="mt-6 grid gap-3">
        {products.map((p) => (
          <div key={p.slug} className="flex gap-3 rounded-xl border bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="h-16 w-16 rounded-lg object-cover border shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm leading-5 line-clamp-1">{p.name}</div>
              <div className="text-xs text-gray-500 line-clamp-1">
                {p.slug} • {p.category} • {new Intl.NumberFormat("vi-VN").format(p.price)}₫ • {p.active === false ? "Đang ẩn" : "Đang hiển thị"}
              </div>
              <div className="text-xs text-gray-400 line-clamp-1">{p.excerpt}</div>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button
                onClick={() => {
                  setEditing(p);
                  setIsNew(false);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold"
              >
                Sửa
              </button>
              <button onClick={() => del(p.slug)} className="rounded-full bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600">
                Xóa
              </button>
              <a href={`/san-pham/${p.slug}`} target="_blank" className="rounded-full bg-white border px-3 py-1.5 text-xs text-center">
                Xem
              </a>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl bg-white p-5">
            <h2 className="font-bold">{isNew ? "Thêm sản phẩm" : `Sửa ${editing.slug}`}</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <label>
                Slug *<input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" placeholder="vi-du-san-pham-120g" disabled={!isNew} />
              </label>
              <label>
                Tên *<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  Danh mục
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1 w-full rounded border px-3 py-2">
                    {CATS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Giá *<input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="mt-1 w-full rounded border px-3 py-2" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  Giá gốc<input type="number" value={editing.originalPrice || ""} onChange={(e) => setEditing({ ...editing, originalPrice: e.target.value ? Number(e.target.value) : undefined })} className="mt-1 w-full rounded border px-3 py-2" placeholder="để trống nếu không giảm" />
                </label>
                <label>
                  Ảnh chính<input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" placeholder="/products/slug/1.jpg" />
                </label>
              </div>
              <label>
                Gallery (cách nhau dấu phẩy)<input value={(editing.gallery || []).join(", ")} onChange={(e) => setEditing({ ...editing, gallery: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="mt-1 w-full rounded border px-3 py-2" placeholder="/products/slug/1.jpg, /products/slug/2.jpg" />
              </label>
              <label>
                Excerpt<input value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="mt-1 w-full rounded border px-3 py-2" />
              </label>
              <label>
                Mô tả (hỗ trợ **bold** và bullet - )<textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={10} className="mt-1 w-full rounded border px-3 py-2 font-mono text-xs" />
              </label>
              <label className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
                <input type="checkbox" checked={editing.active !== false} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="h-4 w-4 accent-[var(--michio-deep-rose)]" />
                <span>Hiển thị sản phẩm trên website</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  Rating<input type="number" step="0.1" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="mt-1 w-full rounded border px-3 py-2" />
                </label>
                <label>
                  Rating count<input type="number" value={editing.ratingCount} onChange={(e) => setEditing({ ...editing, ratingCount: Number(e.target.value) })} className="mt-1 w-full rounded border px-3 py-2" />
                </label>
              </div>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setEditing(null)} className="rounded-full border px-4 py-2 text-sm">
                Hủy
              </button>
              <button onClick={save} disabled={saving} className="rounded-full bg-[var(--michio-deep-rose)] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-400">Local sẽ ghi vào data/products.json. Trên Vercel, cần cấu hình GitHub persistence để thay đổi được commit và deploy tự động.</div>
          </div>
        </div>
      )}
    </div>
  );
}
