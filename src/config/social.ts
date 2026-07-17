import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "INSPIRE",
        href: "https://inspirehep.net/authors/2107182?ui-citation-summary=true",
        linkTitle: `Sérgio Carrôlo on INSPIRE`,
        isActive: true,
    },
    {
        name: "Github",
        href: "#",
        linkTitle: `Follow Sérgio Carrôlo on Github`,
        isActive: false,
    },
    {
        name: "Mail",
        href: "mailto:sergio.carrolo@mpp.mpg.de",
        linkTitle: `Send an email to Sérgio Carrôlo`,
        isActive: true,
    },
    {
        name: "Google Scholar",
        href: "#",
        linkTitle: `Sérgio Carrôlo on Google Scholar`,
        isActive: false,
    },
    {
        name: "ORCID",
        href: "#",
        linkTitle: `Sérgio Carrôlo on ORCID`,
        isActive: false,
    },
    {
        name: "LinkedIn",
        href: "#",
        linkTitle: `Sérgio Carrôlo on LinkedIn`,
        isActive: false,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    INSPIRE: "INSPIRE",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    RSS: "RSS",
};
