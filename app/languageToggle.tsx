'use client';
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/app/langContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (y <= 50) {
        setVisible(true);
      } else if (y < lastY - 10) {
        setVisible(true);
      } else if (y > lastY + 10) {
        setVisible(false);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-250 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        aria-label="Cambiar idioma"
        title={lang === "es" ? "Cambiar a EN" : "Cambiar a ES"}
        className="bg-white border rounded-md px-3 py-1 shadow-md hover:shadow-lg focus:outline-none"
      >
        {lang === "es" ? "ES" : "EN"}
      </button>
    </div>
  );
}
