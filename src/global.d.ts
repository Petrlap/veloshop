// src/global.d.ts
// Универсальные декларации для ассетов и CSS-модулей

// === Стили ===
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
declare module "*.styl";
declare module "swiper/react";
declare module "swiper/modules";
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "react-helmet";

// === CSS Modules ===
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

// === Изображения ===
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.avif" {
  const src: string;
  export default src;
}

// === Медиа ===
declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.webm" {
  const src: string;
  export default src;
}
declare module "*.mp3" {
  const src: string;
  export default src;
}
declare module "*.wav" {
  const src: string;
  export default src;
}

// === Шрифты ===
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.eot";

// === JSON ===
declare module "*.json" {
  const value: any;
  export default value;
}

// === Веб-манифест / данные ===
declare module "*.webmanifest" {
  const src: string;
  export default src;
}
