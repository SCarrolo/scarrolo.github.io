import { SITE } from "../config";

const normalize = (value: string) =>
    value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Author list as HTML, with the site owner's name in bold (accent-insensitive match). */
export function highlightAuthor(authors: string, owner = SITE.author): string {
    const ownerKey = normalize(owner);
    return authors
        .split(",")
        .map((name) => {
            const safe = escapeHtml(name.trim());
            return normalize(name) === ownerKey ? `<strong class="author-self">${safe}</strong>` : safe;
        })
        .join(", ");
}

/** "Phys. Rev. Lett. 136, 181602 (2026)" -> "Phys. Rev. Lett." */
export function shortVenue(journal?: string): string | undefined {
    if (!journal) return undefined;
    const match = journal.match(/^[^\d]+/);
    return (match ? match[0] : journal).replace(/[\s,]+$/, "").trim() || journal;
}

/** "https://arxiv.org/abs/2510.20565" -> "2510.20565" */
export function arxivId(url?: string): string | undefined {
    return url?.match(/arxiv\.org\/(?:abs|pdf)\/([^\s?#/]+?)(?:v\d+)?(?:\.pdf)?$/i)?.[1];
}

export function inspireUrl(url?: string): string | undefined {
    const id = arxivId(url);
    return id ? `https://inspirehep.net/literature?q=arxiv%3A${id}` : undefined;
}

export function getYear(date?: string): string {
    return date?.slice(0, 4) || "Undated";
}

export function formatMonthYear(date?: string): string | undefined {
    if (!date) return undefined;
    const parsed = new Date(date.length === 7 ? `${date}-01` : date);
    if (isNaN(parsed.getTime())) return undefined;
    return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export const byDateDesc = (a: any, b: any) =>
    new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime();
