// ═══════════════════════════════════════════════════════
// Shared constants for i18n support
// CV data is now loaded via Astro content collections
// (see src/content.config.ts)
// ═══════════════════════════════════════════════════════

export const SUPPORTED_LANGUAGES = ['es', 'en', 'gl'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];
