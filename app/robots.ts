
import { MetadataRoute} from"next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/private/", "/api/", "/dashboard/", "/verify/"],
            },
            {
                userAgent: ["GPTBot", "OAI-SearchBot", "Google-Extended", "PerplexityBot"],
                allow: "/",
            }
        ],
        sitemap:"https://www.scripthuman.com/sitemap.xml",
   };
}
