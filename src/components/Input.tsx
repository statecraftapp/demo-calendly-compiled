import { styled } from '@compiled/react';
import type { InputHTMLAttributes } from 'react';
import { colors } from '../tokens';

const StyledInput = styled.input({
  display: 'block',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.4,
  color: colors.textPrimary,
  background: colors.bgCard,
  border: `1px solid ${colors.borderStrong}`,
  borderRadius: '10px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  outline: 'none',
  '&:focus': {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primaryTintStrong}`,
  },
  '&::placeholder': { color: colors.textFaint },
  '&:disabled': { background: colors.bgSurfaceAlt, cursor: 'not-allowed' },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
