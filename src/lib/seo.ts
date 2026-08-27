export const SITE_URL = "https://michio-japan-web.vercel.app";
export const SITE_NAME = "Michio Japan";
export const DEFAULT_OG_IMAGE = "/images/brand/michio-authentic-logo.jpg";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function limitTitle(value: string, max = 48) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function limitDescription(value: string, max = 155) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}
