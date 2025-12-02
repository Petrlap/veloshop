import { useEffect, useState, createContext, ReactNode } from "react";
import axios from "axios";

export interface SiteData {
  id: number;
  name_site: string;
  url_site: string;
  description_site: string;
}

export const SeoContext = createContext<SiteData | null>(null);

interface SeoProviderProps {
  children: ReactNode;
}

export default function SeoProvider({ children }: SeoProviderProps) {
  const [site, setSite] = useState<SiteData | null>(null);

  useEffect(() => {
    axios
      .get("https://admin.sw-testsite2.ru/api/app/site")
      .then((res) => {
        const s = res.data?.site;
        setSite(s);

        if (s) {
          document.title = s.name_site;

          const metaDesc = document.querySelector("meta[name='description']");
          if (metaDesc) {
            metaDesc.setAttribute("content", s.description_site);
          } else {
            const meta = document.createElement("meta");
            meta.name = "description";
            meta.content = s.description_site;
            document.head.appendChild(meta);
          }
        }
      })
      .catch((err) => console.error("SEO API error:", err));
  }, []);

  return <SeoContext.Provider value={site}>{children}</SeoContext.Provider>;
}
