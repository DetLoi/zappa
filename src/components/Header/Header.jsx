import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Container from '../Container/Container'
import './Header.css'

function Header({ bannerHidden = false, onMenuOpenChange, menukortHeaderCenter = null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)
  const drawerClosingRef = useRef(false)
  const closeFallbackTimerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    drawerClosingRef.current = drawerClosing
  }, [drawerClosing])

  useEffect(() => {
    onMenuOpenChange?.(menuOpen)
  }, [menuOpen, onMenuOpenChange])

  const headerClass = [
    bannerHidden ? 'header header--banner-hidden' : 'header',
    menuOpen ? 'header--menu-open' : '',
    menukortHeaderCenter ? 'header--menukort-tabs' : '',
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    setMenuOpen(false)
    setDrawerClosing(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const startClose = useCallback(() => {
    if (!menuOpen || drawerClosing) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMenuOpen(false)
      return
    }
    setDrawerClosing(true)
  }, [menuOpen, drawerClosing])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') startClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, startClose])

  useEffect(() => {
    if (!drawerClosing) return
    closeFallbackTimerRef.current = window.setTimeout(() => {
      closeFallbackTimerRef.current = null
      setMenuOpen(false)
      setDrawerClosing(false)
    }, 520)
    return () => {
      if (closeFallbackTimerRef.current != null) {
        window.clearTimeout(closeFallbackTimerRef.current)
        closeFallbackTimerRef.current = null
      }
    }
  }, [drawerClosing])

  const handleDrawerAnimationEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return
    const names = String(e.animationName || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
    if (!names.some((n) => n.includes('header-drawer-out'))) return
    if (!drawerClosingRef.current) return
    if (closeFallbackTimerRef.current != null) {
      window.clearTimeout(closeFallbackTimerRef.current)
      closeFallbackTimerRef.current = null
    }
    setMenuOpen(false)
    setDrawerClosing(false)
  }, [])

  const closeMenu = () => startClose()

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    closeMenu()
  }

  return (
    <header className={headerClass}>
      <Container>
        <div className="header__inner">
          <div className="header__start">
            <button
              type="button"
              className={`header__menu-toggle${menuOpen && !drawerClosing ? ' header__menu-toggle--open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
              onClick={() => {
                if (drawerClosing) return
                if (menuOpen) {
                  startClose()
                } else {
                  setMenuOpen(true)
                  setDrawerClosing(false)
                }
              }}
            >
              <span className="header__burger-line" aria-hidden />
              <span className="header__burger-line" aria-hidden />
              <span className="header__burger-line" aria-hidden />
            </button>
            <NavLink to="/" className="header__brand-link" aria-label="Go to homepage" onClick={handleLogoClick}>
              <img src="/zappalogo.png" alt="Zappa logo" className="header__logo" />
            </NavLink>
          </div>

          <div className="header__center">{menukortHeaderCenter}</div>

          <div className="header__actions">
            <div className="header__actions-desktop">
              <div className="header__socials">
                <a href="https://www.facebook.com/cafezappa.dk" className="header__social" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/cafe_zappa/" className="header__social" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tripadvisor.com/Restaurant_Review-g227593-d25302689-Reviews-Cafe_Zappa-Horsens_East_Jutland_Jutland.html" className="header__social" aria-label="TripAdvisor" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.976 5.976 0 0 0 4.075 1.6 5.997 5.997 0 0 0 4.04-10.43L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 2.775 1.244 2.775 2.775 0 1.531-1.244 2.775-2.775 2.775a2.778 2.778 0 0 1-2.775-2.775c0-1.531 1.244-2.775 2.775-2.775z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@cafe_zappa" className="header__social" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
              </div>
              <a
                className="header__cta"
                href="https://cafezappa.booketbord.dk/onlinebooking"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK BORD
              </a>
              <a
                className="header__cta header__cta--outline"
                href="https://cafezappa.nemtakeaway.dk/order.php?_gl=1*851z9o*_gcl_au*MjA2NTQ1NzQ2OC4xNzcxODY2OTcw*_ga*MTEzMzk0OTE2NS4xNzcxODY2OTA4*_ga_FKRQZ5G8M1*czE3NzQ3OTIxMzYkbzUkZzEkdDE3NzQ3OTQxOTQkajYwJGwwJGgxMDQ2MzgyNDAx"
                target="_blank"
                rel="noopener noreferrer"
              >
                TAKE AWAY
              </a>
            </div>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <>
          <button
            type="button"
            className={`header__backdrop${drawerClosing ? ' header__backdrop--closing' : ''}`}
            aria-label="Luk menu"
            onClick={closeMenu}
          />
          <div className="header__drawer-shell">
            <nav
              id="primary-navigation"
              className={`header__drawer${drawerClosing ? ' header__drawer--closing' : ''}`}
              aria-label="Hovednavigation"
              onAnimationEnd={handleDrawerAnimationEnd}
            >
              <ul className="header__drawer-list">
                <li>
                  <NavLink to="/" className="header__drawer-link" end onClick={closeMenu}>
                    HJEM
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/menukort" className="header__drawer-link" onClick={closeMenu}>
                    MENUKORT
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events" className="header__drawer-link" onClick={closeMenu}>
                    Events
                  </NavLink>
                </li>
                <li>
                  <a
                    className="header__drawer-link"
                    href="https://cafezappa.nemgavekort.dk/index.php?"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    GAVEKORT
                  </a>
                </li>
                <li>
                  <NavLink to="/selskaber" className="header__drawer-link" onClick={closeMenu}>
                    SELSKABER
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/om-os" className="header__drawer-link" onClick={closeMenu}>
                    OM OS
                  </NavLink>
                </li>
              </ul>
              <div className="header__drawer-mobile-extras">
                <div className="header__drawer-socials" role="group" aria-label="Sociale medier">
                  <a href="https://www.facebook.com/cafezappa.dk" className="header__drawer-social" aria-label="Facebook" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/cafe_zappa/" className="header__drawer-social" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.tripadvisor.com/Restaurant_Review-g227593-d25302689-Reviews-Cafe_Zappa-Horsens_East_Jutland_Jutland.html" className="header__drawer-social" aria-label="TripAdvisor" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.976 5.976 0 0 0 4.075 1.6 5.997 5.997 0 0 0 4.04-10.43L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 2.775 1.244 2.775 2.775 0 1.531-1.244 2.775-2.775 2.775a2.778 2.778 0 0 1-2.775-2.775c0-1.531 1.244-2.775 2.775-2.775z"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@cafe_zappa" className="header__drawer-social" aria-label="TikTok" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  </a>
                </div>
                <div className="header__drawer-ctas">
                  <a
                    className="header__drawer-cta"
                    href="https://cafezappa.booketbord.dk/onlinebooking"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    BOOK BORD
                  </a>
                  <a
                    className="header__drawer-cta header__drawer-cta--outline"
                    href="https://cafezappa.nemtakeaway.dk/order.php?_gl=1*851z9o*_gcl_au*MjA2NTQ1NzQ2OC4xNzcxODY2OTcw*_ga*MTEzMzk0OTE2NS4xNzcxODY2OTA4*_ga_FKRQZ5G8M1*czE3NzQ3OTIxMzYkbzUkZzEkdDE3NzQ3OTQxOTQkajYwJGwwJGgxMDQ2MzgyNDAx"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    TAKE AWAY
                  </a>
                </div>
              </div>
            </nav>
            <aside
              className={`header__drawer-aside${drawerClosing ? ' header__drawer-aside--closing' : ''}`}
              aria-label="Sidepanel"
            >
              <div className="header__drawer-aside-inner">
                <img
                  src="/zappalogo.png"
                  alt="Zappa"
                  className="header__logo header__drawer-aside-logo"
                  decoding="async"
                />
                <div className="header__drawer-aside-hours">
                  <p>Åbningstider</p>
                  <p>Mandag: Lukket</p>
                  <p>Tirsdag – Torsdag: 10:00 – 22:00</p>
                  <p>Fredag – Lørdag: 10:00 – 02:00</p>
                  <p>Søndag: 10:00 – 20:00</p>
                  <p className="header__drawer-aside-hours-note">
                    Køkkenet lukker kl. 21.00 Man.–Lør. & kl. 19:30 Søn.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
