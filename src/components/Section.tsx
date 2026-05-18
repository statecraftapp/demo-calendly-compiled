import { styled } from '@compiled/react';
import type { ReactNode } from 'react';

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
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: '#0b1733',
});

const Subtitle = styled.p({
  fontSize: '14px',
  color: '#5b6478',
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
