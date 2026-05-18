import { styled } from '@compiled/react';
import type { TextareaHTMLAttributes } from 'react';

const StyledTextarea = styled.textarea({
  display: 'block',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: 'inherit',
  color: '#0b1733',
  background: '#ffffff',
  border: '1px solid #d6dbe6',
  borderRadius: '10px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  outline: 'none',
  resize: 'vertical',
  minHeight: '80px',
  '&:focus': {
    borderColor: '#0069ff',
    boxShadow: '0 0 0 3px rgba(0, 105, 255, 0.15)',
  },
  '&::placeholder': { color: '#9aa3b7' },
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return <StyledTextarea {...props} />;
}
