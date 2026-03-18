
import { MetadataRoute} from"next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl ="https://www.scripthuman.com";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency:"yearly",
            priority: 1,
       },
       // Add other pages here, like your specific web tools
        {
            url:`${baseUrl}/writing-room`,
            lastModified: new Date(),
            changeFrequency:"monthly",
            priority: 0.8,
       },
        {
            url:`${baseUrl}/style-studio`,
            lastModified: new Date(),
            changeFrequency:"monthly",
            priority: 0.8,
       },
        {
            url:`${baseUrl}/trust-hub`,
            lastModified: new Date(),
            changeFrequency:"weekly",
            priority: 0.9,
       },
        {
            url:`${baseUrl}/enterprise`,
            lastModified: new Date(),
            changeFrequency:"monthly",
            priority: 0.7,
       },
        {
            url:`${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency:"weekly",
            priority: 0.8,
       },
    ];
}
