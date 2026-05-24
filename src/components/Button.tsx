import { styled } from '@compiled/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from '../tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

const PrimarySm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.primary, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.primaryHover },
  padding: '6px 12px', fontSize: '13px',
});
const PrimaryMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.primary, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.primaryHover },
  padding: '9px 18px', fontSize: '14px',
});
const PrimaryLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.primary, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.primaryHover },
  padding: '12px 22px', fontSize: '16px',
});
const SecondarySm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.bgCard, color: colors.textPrimary, boxShadow: `inset 0 0 0 1px ${colors.borderStrong}`,
  '&:hover:not(:disabled)': { background: colors.bgSurfaceAlt },
  padding: '6px 12px', fontSize: '13px',
});
const SecondaryMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.bgCard, color: colors.textPrimary, boxShadow: `inset 0 0 0 1px ${colors.borderStrong}`,
  '&:hover:not(:disabled)': { background: colors.bgSurfaceAlt },
  padding: '9px 18px', fontSize: '14px',
});
const SecondaryLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.bgCard, color: colors.textPrimary, boxShadow: `inset 0 0 0 1px ${colors.borderStrong}`,
  '&:hover:not(:disabled)': { background: colors.bgSurfaceAlt },
  padding: '12px 22px', fontSize: '16px',
});
const GhostSm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: colors.textPrimary,
  '&:hover:not(:disabled)': { background: colors.ghostHover },
  padding: '6px 12px', fontSize: '13px',
});
const GhostMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: colors.textPrimary,
  '&:hover:not(:disabled)': { background: colors.ghostHover },
  padding: '9px 18px', fontSize: '14px',
});
const GhostLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: colors.textPrimary,
  '&:hover:not(:disabled)': { background: colors.ghostHover },
  padding: '12px 22px', fontSize: '16px',
});
const DangerSm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.danger, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.dangerHover },
  padding: '6px 12px', fontSize: '13px',
});
const DangerMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.danger, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.dangerHover },
  padding: '9px 18px', fontSize: '14px',
});
const DangerLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: colors.danger, color: colors.textOnPrimary,
  '&:hover:not(:disabled)': { background: colors.dangerHover },
  padding: '12px 22px', fontSize: '16px',
});

const matrix = {
  primary: { sm: PrimarySm, md: PrimaryMd, lg: PrimaryLg },
  secondary: { sm: SecondarySm, md: SecondaryMd, lg: SecondaryLg },
  ghost: { sm: GhostSm, md: GhostMd, lg: GhostLg },
  danger: { sm: DangerSm, md: DangerMd, lg: DangerLg },
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...rest
}: ButtonProps) {
  const Component = matrix[variant][size];
  return <Component {...rest}>{children}</Component>;
}
