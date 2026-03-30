import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactInfo from '../ContactInfo/ContactInfo'
import BackToTop from '../BackToTop/BackToTop'
import CookieConsent from '../CookieConsent/CookieConsent'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import arrowDown from '../../assets/arrowdown.png'
import './Layout.css'

function TopBanner({ hidden, expanded, onToggle, bannerRef }) {
  const panelId = 'top-banner-contact-panel'

  return (
    <div
      ref={bannerRef}
      className={`top-banner${hidden ? ' top-banner--hidden' : ''}${expanded ? ' top-banner--expanded' : ''}`}
    >
      <button
        type="button"
        className="top-banner__strip"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="top-banner__inner">
          <span className="top-banner__text">
            Åbent i påsken – se vores åbningstider.
          </span>
          <img
            className="top-banner__arrow"
            src={arrowDown}
            alt=""
            width={14}
            height={14}
            aria-hidden={true}
          />
        </div>
      </button>
      <div
        id={panelId}
        className="top-banner__drawer"
        aria-hidden={!expanded}
      >
        <div className="top-banner__drawer-inner">
          <div className="top-banner-panel">
            <ContactInfo idPrefix="top-banner" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Layout() {
  const [isBannerHidden, setIsBannerHidden] = useState(false)
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const [menukortHeaderCenter, setMenukortHeaderCenter] = useState(null)
  const [bannerExpanded, setBannerExpanded] = useState(false)
  const topBannerRef = useRef(null)
  const [bannerOffsetPx, setBannerOffsetPx] = useState(() =>
    typeof document !== 'undefined'
      ? parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--banner-height')
        ) || 40
      : 40
  )

  const syncBannerOffset = () => {
    const el = topBannerRef.current
    if (!el) return
    setBannerOffsetPx(el.offsetHeight)
  }

  useLayoutEffect(() => {
    syncBannerOffset()
  }, [bannerExpanded])

  useEffect(() => {
    const el = topBannerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      syncBannerOffset()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [bannerExpanded])

  useEffect(() => {
    const threshold = 40

    const handleScroll = () => {
      setIsBannerHidden(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isBannerHidden) setBannerExpanded(false)
  }, [isBannerHidden])

  useEffect(() => {
    if (navMenuOpen) setBannerExpanded(false)
  }, [navMenuOpen])

  const bannerHidden = isBannerHidden || navMenuOpen

  useEffect(() => {
    if (!bannerExpanded) return
    const onKey = (e) => {
      if (e.key === 'Escape') setBannerExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bannerExpanded])

  return (
    <div
      className="layout"
      style={{ '--layout-banner-offset': `${bannerOffsetPx}px` }}
    >
      <div
        className={`top-banner-backdrop${bannerHidden ? ' top-banner-backdrop--hidden' : ''}`}
        aria-hidden
      />
      <TopBanner
        bannerRef={topBannerRef}
        hidden={bannerHidden}
        expanded={bannerExpanded}
        onToggle={() => setBannerExpanded((v) => !v)}
      />
      <Header
        bannerHidden={bannerHidden}
        topBannerExpanded={bannerExpanded}
        onMenuOpenChange={setNavMenuOpen}
        menukortHeaderCenter={menukortHeaderCenter}
      />
      <div className="layout__main">
        <Outlet context={{ setMenukortHeaderCenter }} />
      </div>
      <Footer />
      <CookieConsent />
      <BackToTop />
    </div>
  )
}

export default Layout
