import { styled } from '@compiled/react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { Dashboard } from './routes/Dashboard';
import { Book } from './routes/Book';
import { BookingDetail } from './routes/BookingDetail';
import { Availability } from './routes/Availability';
import { EventTypeFormRoute } from './routes/EventTypeFormRoute';
import { resetToSeed } from './store/yamlStore';
import { Avatar } from './components/Avatar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { colors } from './tokens';

const Shell = styled.div({
  minHeight: '100vh',
  background: colors.bgCard,
  display: 'flex',
  flexDirection: 'column',
});

const Topbar = styled.header({
  borderBottom: `1px solid ${colors.border}`,
  background: colors.bgCard,
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

const TopbarInner = styled.div({
  maxWidth: '1080px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 24px',
  gap: '16px',
});

const Brand = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontWeight: 700,
  fontSize: '16px',
  color: colors.textPrimary,
});

const BrandIcon = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  background: colors.primary,
  color: '#ffffff',
  borderRadius: '8px',
});

const Nav = styled.nav({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

const NavItemDefault = styled.span({
  padding: '8px 14px',
  borderRadius: '999px',
  fontSize: '13.5px',
  fontWeight: 600,
  color: colors.textMuted,
  display: 'inline-block',
});

const NavItemActive = styled.span({
  padding: '8px 14px',
  borderRadius: '999px',
  fontSize: '13.5px',
  fontWeight: 600,
  color: colors.textPrimary,
  background: colors.bgSubtle,
  display: 'inline-block',
});

const ResetBtn = styled.button({
  appearance: 'none',
  border: `1px solid ${colors.borderStrong}`,
  background: colors.bgCard,
  borderRadius: '999px',
  padding: '6px 14px',
  fontSize: '12px',
  fontWeight: 600,
  color: colors.textMuted,
  cursor: 'pointer',
  '&:hover': { background: colors.bgSurfaceAlt, color: colors.textPrimary },
});

const Right = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const Main = styled.main({
  flex: 1,
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <Topbar>
        <TopbarInner>
          <Link to="/">
            <Brand>
              <BrandIcon>
                <CalendarIcon size={18} />
              </BrandIcon>
              Compiled Bookings
            </Brand>
          </Link>
          <Nav>
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <NavItemActive>Event types</NavItemActive>
                ) : (
                  <NavItemDefault>Event types</NavItemDefault>
                )
              }
            </NavLink>
            <NavLink to="/availability">
              {({ isActive }) =>
                isActive ? (
                  <NavItemActive>Availability</NavItemActive>
                ) : (
                  <NavItemDefault>Availability</NavItemDefault>
                )
              }
            </NavLink>
          </Nav>
          <Right>
            <ResetBtn
              type="button"
              onClick={() => {
                if (window.confirm('Reset all data back to the seed?')) {
                  resetToSeed();
                }
              }}
            >
              Reset data
            </ResetBtn>
            <Avatar name="Demo Owner" size="sm" />
          </Right>
        </TopbarInner>
      </Topbar>
      <Main>{children}</Main>
    </Shell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/event-types/new" element={<EventTypeFormRoute />} />
          <Route path="/event-types/:id/edit" element={<EventTypeFormRoute />} />
          <Route path="/book/:slug" element={<Book />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/availability" element={<Availability />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
