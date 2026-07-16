export interface DisplayMeta {
    label?: string;
    value: string;
    datetime?: string;
}

export interface DisplayLink {
    href: string;
    label: string;
}

export interface ListingItem {
    title: string;
    description?: string;
    date?: string;
    authors?: string;
    extraInput?: string;
    paperReference?: string;
    paperUrl?: string;
    tags: string[];
    externalUrl?: string;
    externalLabel?: string;
    image?: string;
}

export interface DetailItem extends ListingItem {
    backHref: string;
}
