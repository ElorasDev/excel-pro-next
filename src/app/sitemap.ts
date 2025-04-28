import { MetadataRoute } from "next";
import { programs } from "@/components/organisms/Programs/data";


export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://excel-pro-next.vercel.app";
  
    const normalize = (str: string): string =>
      str
        .toLowerCase()
        .replace(/\s*–\s*/g, '-')
        .replace(/\s*-\s*/g, '-')
        .replace(/\s+/g, '');
  
    const staticRoutes = [
      "/",
      "/program",
      "/about-us",
      "/matchday",
      "/contact-us",
    ];
  
    const programRoutes = programs.map((program) => {
      const slug = normalize(program.ageGroup);
      return `/program/${slug}`;
    });
  
    const allRoutes = [...staticRoutes, ...programRoutes];
  
    return allRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
    }));
  }