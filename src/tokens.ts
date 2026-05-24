// All design tokens resolve from CSS custom properties defined in
// src/styles/globals.css. Editing the :root block there cascades to
// every component automatically — no rebuild of token references needed.

export const colors = {
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  primaryTint: 'var(--color-primary-tint)',
  primaryTintSubtle: 'var(--color-primary-tint-subtle)',
  primaryTintMid: 'var(--color-primary-tint-mid)',
  primaryTintStrong: 'var(--color-primary-tint-strong)',
  primaryGradientEnd: 'var(--color-primary-gradient-end)',
  danger: 'var(--color-danger)',
  dangerHover: 'var(--color-danger-hover)',
  success: 'var(--color-success)',
  successTint: 'var(--color-success-tint)',
  textPrimary: 'var(--color-text-primary)',
  textMuted: 'var(--color-text-muted)',
  textFaint: 'var(--color-text-faint)',
  textDisabled: 'var(--color-text-disabled)',
  textOnPrimary: 'var(--color-text-on-primary)',
  bgPage: 'var(--color-bg-page)',
  bgCard: 'var(--color-bg-card)',
  bgSurface: 'var(--color-bg-surface)',
  bgSurfaceAlt: 'var(--color-bg-surface-alt)',
  bgSubtle: 'var(--color-bg-subtle)',
  border: 'var(--color-border)',
  borderStrong: 'var(--color-border-strong)',
  borderHover: 'var(--color-border-hover)',
  ghostHover: 'var(--color-ghost-hover)',
  shadowCard: 'var(--color-shadow-card)',
  shadowCardHover: 'var(--color-shadow-card-hover)',
};

export const font = {
  body: 'var(--font-body)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
};
