import { styled } from '@compiled/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

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
  background: '#0069ff', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#0057d6' },
  padding: '6px 12px', fontSize: '13px',
});
const PrimaryMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#0069ff', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#0057d6' },
  padding: '9px 18px', fontSize: '14px',
});
const PrimaryLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#0069ff', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#0057d6' },
  padding: '12px 22px', fontSize: '16px',
});
const SecondarySm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ffffff', color: '#0b1733', boxShadow: 'inset 0 0 0 1px #d6dbe6',
  '&:hover:not(:disabled)': { background: '#f5f7fb' },
  padding: '6px 12px', fontSize: '13px',
});
const SecondaryMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ffffff', color: '#0b1733', boxShadow: 'inset 0 0 0 1px #d6dbe6',
  '&:hover:not(:disabled)': { background: '#f5f7fb' },
  padding: '9px 18px', fontSize: '14px',
});
const SecondaryLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ffffff', color: '#0b1733', boxShadow: 'inset 0 0 0 1px #d6dbe6',
  '&:hover:not(:disabled)': { background: '#f5f7fb' },
  padding: '12px 22px', fontSize: '16px',
});
const GhostSm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: '#0b1733',
  '&:hover:not(:disabled)': { background: 'rgba(11, 23, 51, 0.06)' },
  padding: '6px 12px', fontSize: '13px',
});
const GhostMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: '#0b1733',
  '&:hover:not(:disabled)': { background: 'rgba(11, 23, 51, 0.06)' },
  padding: '9px 18px', fontSize: '14px',
});
const GhostLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: 'transparent', color: '#0b1733',
  '&:hover:not(:disabled)': { background: 'rgba(11, 23, 51, 0.06)' },
  padding: '12px 22px', fontSize: '16px',
});
const DangerSm = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ef4444', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#dc2626' },
  padding: '6px 12px', fontSize: '13px',
});
const DangerMd = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ef4444', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#dc2626' },
  padding: '9px 18px', fontSize: '14px',
});
const DangerLg = styled.button({
  appearance: 'none', border: 0, borderRadius: '999px', cursor: 'pointer', fontWeight: 600,
  transition: 'background 120ms ease, color 120ms ease, transform 60ms ease',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'nowrap',
  '&:disabled': { opacity: 0.45, cursor: 'not-allowed' },
  '&:active:not(:disabled)': { transform: 'translateY(1px)' },
  background: '#ef4444', color: '#ffffff',
  '&:hover:not(:disabled)': { background: '#dc2626' },
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
