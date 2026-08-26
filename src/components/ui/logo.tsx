import Image from "next/image";

const LOGO_SRC = "/images/brand/michio-authentic-logo.jpg";

export function Logo({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "vertical" | "icon";
  className?: string;
}) {
  if (variant === "icon") {
    return (
      <span className={`inline-flex items-center ${className}`} aria-label="Michio Japan">
        <Image src={LOGO_SRC} alt="Michio Japan — Authentic From Japan, Hàng Nhật nội địa" width={52} height={52} className="h-11 w-11 object-contain" />
      </span>
    );
  }

  if (variant === "vertical") {
    return (
      <span className={`inline-flex flex-col items-center text-center ${className}`}>
        <Image src={LOGO_SRC} alt="Michio Japan — Authentic From Japan, Hàng Nhật nội địa" width={180} height={180} className="h-[112px] w-[112px] object-contain md:h-[128px] md:w-[128px]" />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image src={LOGO_SRC} alt="Michio Japan — Authentic From Japan, Hàng Nhật nội địa" width={180} height={180} className="h-[58px] w-[58px] object-contain md:h-[66px] md:w-[66px]" priority />
    </span>
  );
}
