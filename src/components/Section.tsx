import { styled } from '@compiled/react';
import type { ReactNode } from 'react';
import { colors, font } from '../tokens';

const Outer = styled.section({
  maxWidth: '960px',
  margin: '0 auto',
  padding: '32px 24px',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '16px',
  marginBottom: '24px',
});

const Titles = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const Title = styled.h1({
  fontFamily: font.display,
  fontSize: '30px',
  fontWeight: 700,
  letterSpacing: '-0.015em',
  color: colors.textPrimary,
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: colors.textMuted,
});

const Actions = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export interface SectionProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function Section({ title, subtitle, actions, children }: SectionProps) {
  return (
    <Outer>
      <Header>
        <Titles>
          <Title>{title}</Title>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </Titles>
        {actions ? <Actions>{actions}</Actions> : null}
      </Header>
      {children}
    </Outer>
  );
}
