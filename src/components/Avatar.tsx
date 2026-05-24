import { styled } from '@compiled/react';
import { colors } from '../tokens';

const GRADIENT = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryGradientEnd} 100%)`;

const Sm = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  background: GRADIENT,
  color: colors.textOnPrimary,
  fontWeight: 600,
  letterSpacing: '0.02em',
  flexShrink: 0,
  width: '28px',
  height: '28px',
  fontSize: '11px',
});

const Md = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  background: GRADIENT,
  color: colors.textOnPrimary,
  fontWeight: 600,
  letterSpacing: '0.02em',
  flexShrink: 0,
  width: '40px',
  height: '40px',
  fontSize: '14px',
});

const Lg = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  background: GRADIENT,
  color: colors.textOnPrimary,
  fontWeight: 600,
  letterSpacing: '0.02em',
  flexShrink: 0,
  width: '64px',
  height: '64px',
  fontSize: '22px',
});

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '?';
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const Component = size === 'sm' ? Sm : size === 'lg' ? Lg : Md;
  return <Component aria-label={name}>{initialsOf(name)}</Component>;
}
