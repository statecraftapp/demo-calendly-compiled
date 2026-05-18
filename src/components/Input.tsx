import { styled } from '@compiled/react';
import type { InputHTMLAttributes } from 'react';

const StyledInput = styled.input({
  display: 'block',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.4,
  color: '#0b1733',
  background: '#ffffff',
  border: '1px solid #d6dbe6',
  borderRadius: '10px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  outline: 'none',
  '&:focus': {
    borderColor: '#0069ff',
    boxShadow: '0 0 0 3px rgba(0, 105, 255, 0.15)',
  },
  '&::placeholder': { color: '#9aa3b7' },
  '&:disabled': { background: '#f5f7fb', cursor: 'not-allowed' },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
