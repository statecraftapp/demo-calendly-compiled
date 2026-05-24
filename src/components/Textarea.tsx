import { styled } from '@compiled/react';
import type { TextareaHTMLAttributes } from 'react';
import { colors } from '../tokens';

const StyledTextarea = styled.textarea({
  display: 'block',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: 'inherit',
  color: colors.textPrimary,
  background: colors.bgCard,
  border: `1px solid ${colors.borderStrong}`,
  borderRadius: '10px',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  outline: 'none',
  resize: 'vertical',
  minHeight: '80px',
  '&:focus': {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primaryTintStrong}`,
  },
  '&::placeholder': { color: colors.textFaint },
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return <StyledTextarea {...props} />;
}
