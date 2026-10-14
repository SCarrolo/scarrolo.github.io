export interface ThemeColors {
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    border: string;
    surface: string;
    /** Optional sidebar panel colours; default to background/foreground. */
    sidebar?: string;
    sidebarText?: string;
}

export interface Theme extends ThemeColors {
    isDark: boolean;
}

export type ThemeName = string;