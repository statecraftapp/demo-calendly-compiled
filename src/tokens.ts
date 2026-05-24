// All design tokens resolve from CSS custom properties defined in
// src/styles/globals.css :root, AND from the `tokens:` block in
// statecraft.yaml (the Statecraft editor injects matching :root vars
// into each state-frame iframe). Variable names are camelCase to
// match Statecraft's `colors.foo` → `--color-foo` mapping convention.

export const colors = {
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primaryHover)',
  primaryTint: 'var(--color-primaryTint)',
  primaryTintSubtle: 'var(--color-primaryTintSubtle)',
  primaryTintMid: 'var(--color-primaryTintMid)',
  primaryTintStrong: 'var(--color-primaryTintStrong)',
  primaryGradientEnd: 'var(--color-primaryGradientEnd)',
  danger: 'var(--color-danger)',
  dangerHover: 'var(--color-dangerHover)',
  success: 'var(--color-success)',
  successTint: 'var(--color-successTint)',
  textPrimary: 'var(--color-textPrimary)',
  textMuted: 'var(--color-textMuted)',
  textFaint: 'var(--color-textFaint)',
  textDisabled: 'var(--color-textDisabled)',
  textOnPrimary: 'var(--color-textOnPrimary)',
  bgPage: 'var(--color-bgPage)',
  bgCard: 'var(--color-bgCard)',
  bgSurface: 'var(--color-bgSurface)',
  bgSurfaceAlt: 'var(--color-bgSurfaceAlt)',
  bgSubtle: 'var(--color-bgSubtle)',
  border: 'var(--color-border)',
  borderStrong: 'var(--color-borderStrong)',
  borderHover: 'var(--color-borderHover)',
  ghostHover: 'var(--color-ghostHover)',
  shadowCard: 'var(--color-shadowCard)',
  shadowCardHover: 'var(--color-shadowCardHover)',
};

export const font = {
  body: 'var(--font-family-body)',
  display: 'var(--font-family-display)',
  mono: 'var(--font-family-mono)',
};
