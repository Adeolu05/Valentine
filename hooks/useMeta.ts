import { useEffect } from 'react';

interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const useMeta = (data: MetaData) => {
    useEffect(() => {
        const defaultTitle = "Forever Yours - Premium Valentine Storytelling";
        const defaultDesc = "Craft personalized proposals & digital keepsakes. Use AI-generated vows and prismatic aesthetics to express your love.";

        // Update Title
        document.title = data.title ? `${data.title} | Forever Yours` : defaultTitle;

        // Update Meta Tags
        const updateMeta = (selector: string, content?: string) => {
            const el = document.querySelector(selector);
            if (el && content) {
                el.setAttribute('content', content);
            }
        };

        updateMeta('meta[name="description"]', data.description || defaultDesc);
        updateMeta('meta[property="og:title"]', data.title || defaultTitle);
        updateMeta('meta[property="og:description"]', data.description || defaultDesc);
        updateMeta('meta[property="og:image"]', data.image);
        updateMeta('meta[property="og:url"]', data.url || window.location.href);

        updateMeta('meta[property="twitter:title"]', data.title || defaultTitle);
        updateMeta('meta[property="twitter:description"]', data.description || defaultDesc);
        updateMeta('meta[property="twitter:image"]', data.image);

        return () => {
            // Revert to defaults on unmount if needed
            document.title = defaultTitle;
            updateMeta('meta[name="description"]', defaultDesc);
        };
    }, [data]);
};
