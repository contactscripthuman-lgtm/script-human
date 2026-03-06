
import { MetadataRoute} from"next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl ="https://scripthuman.ai";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency:"daily",
            priority: 1,
       },
        {
            url:`${baseUrl}/writing-room`,
            lastModified: new Date(),
            changeFrequency:"weekly",
            priority: 0.8,
       },
        {
            url:`${baseUrl}/style-studio`,
            lastModified: new Date(),
            changeFrequency:"weekly",
            priority: 0.8,
       },
        {
            url:`${baseUrl}/trust-hub`,
            lastModified: new Date(),
            changeFrequency:"daily",
            priority: 0.9,
       },
        {
            url:`${baseUrl}/enterprise`,
            lastModified: new Date(),
            changeFrequency:"monthly",
            priority: 0.7,
       },
        {
            url:`${baseUrl}/documentation`,
            lastModified: new Date(),
            changeFrequency:"weekly",
            priority: 0.6,
       },
    ];
}
