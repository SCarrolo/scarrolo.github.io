import type { ListingItem, DetailItem } from "../types";

function formatDate(dateValue: string | Date | undefined, showDay = false): string | undefined {
    if (!dateValue) return undefined;
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) return undefined;
    const hasFullDate = typeof dateValue !== 'string' || /^\d{4}-\d{2}-\d{2}$/.test(dateValue);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: showDay && hasFullDate ? 'numeric' : undefined,
        timeZone: 'UTC',
    });
}

export function getListingItem(entry: any, collection?: string): ListingItem {
    const d = entry.data;
    const isTalk = collection === "talks";
    const externalUrl = isTalk ? (d.video_url || d.slides_url || d.external_url) : d.external_url;
    const externalLabel = isTalk
        ? (d.video_url ? "Watch talk" : d.slides_url ? "View slides" : "External link")
        : collection === "publications"
            ? "arXiv link"
            : "View external";
    
    return {
        title: d.title,
        description: d.description,
        date: formatDate(d.date, isTalk),
        authors: d.author,
        extraInput: d.journal || d.event || d.institution,
        paperReference: d.paper_reference,
        paperUrl: d.paper_slug ? `/publications/${d.paper_slug}` : d.paper_url,
        tags: d.tags || [],
        externalUrl,
        externalLabel,
        image: d.image,
    };
}

export function getDetailItem(entry: any, collection: string): DetailItem {
    const listing = getListingItem(entry, collection);
    
    return {
        ...listing,
        backHref: collection === 'posts' ? '/posts' : `/${collection}`,
    };
}
