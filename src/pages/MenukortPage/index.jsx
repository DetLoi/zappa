import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useOutletContext } from 'react-router-dom'
import menuBrunch1 from '../../assets/menu/menu-brunch-1.png'
import menuFavoritter1 from '../../assets/menu/menu-favoritter-1.png'
import menuFavoritter2 from '../../assets/menu/menu-favoritter-2.png'
import menuSocial1 from '../../assets/menu/menu-social-dining-1.png'
import menuDrikke1 from '../../assets/menu/menu-drikke-1.png'
import menuDrikke2 from '../../assets/menu/menu-drikke-2.png'
import menuDrikke3 from '../../assets/menu/menu-drikke-3.png'
import menuDrikke4 from '../../assets/menu/menu-drikke-4.png'
import menuDrikke5 from '../../assets/menu/menu-drikke-5.png'
import rightArrow from '../../assets/right-arrow.png'
import './MenukortPage.css'

const LAPTOP_MIN = '(min-width: 921px)'

const TABS = [
  { id: 'brunch', label: 'Brunch' },
  { id: 'favoritter', label: 'Favoritter' },
  { id: 'social', label: 'Social Dining' },
  { id: 'drikke', label: 'Drikkevarer' },
]

const MENU_PAGES = {
  brunch: [{ src: menuBrunch1, caption: 'Brunch menu – side 1 af 1' }],
  favoritter: [
    { src: menuFavoritter1, caption: 'Favoritter menu – side 1 af 2' },
    { src: menuFavoritter2, caption: 'Favoritter menu – side 2 af 2' },
  ],
  social: [{ src: menuSocial1, caption: 'Social Dining menu – side 1 af 1' }],
  drikke: [
    { src: menuDrikke1, caption: 'Drikkevarer menu – side 1 af 5' },
    { src: menuDrikke2, caption: 'Drikkevarer menu – side 2 af 5' },
    { src: menuDrikke3, caption: 'Drikkevarer menu – side 3 af 5' },
    { src: menuDrikke4, caption: 'Drikkevarer menu – side 4 af 5' },
    { src: menuDrikke5, caption: 'Drikkevarer menu – side 5 af 5' },
  ],
}

function useIsLaptopMenukort() {
  const [isLaptop, setIsLaptop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(LAPTOP_MIN).matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia(LAPTOP_MIN)
    const onChange = () => setIsLaptop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isLaptop
}

function MenukortCarousel({ pages, tabId, showDots = true, edgeClickNav = false }) {
  const n = pages.length
  const extendedPages = useMemo(
    () => (n <= 1 ? pages : [pages[n - 1], ...pages, pages[0]]),
    [pages, n]
  )
  const lastExt = extendedPages.length - 1

  const viewportRef = useRef(null)
  const extIndexRef = useRef(1)
  const [viewportW, setViewportW] = useState(0)
  const [extIndex, setExtIndex] = useState(1)
  const [skipTransition, setSkipTransition] = useState(false)

  useEffect(() => {
    extIndexRef.current = extIndex
  }, [extIndex])

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setViewportW(el.clientWidth)
    })
    ro.observe(el)
    setViewportW(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    setExtIndex(1)
    extIndexRef.current = 1
  }, [tabId, n])

  const slideW = viewportW > 0 ? viewportW * 0.5 : 0
  const translateX =
    viewportW > 0 ? -extIndex * slideW + (viewportW - slideW) / 2 : 0

  const realIndex =
    extIndex === 0 ? n - 1 : extIndex === lastExt ? 0 : extIndex - 1

  const leftPeekIndex = extIndex === 0 ? lastExt : extIndex - 1
  const rightPeekIndex = extIndex === lastExt ? 0 : extIndex + 1

  const go = useCallback((delta) => {
    setExtIndex((i) => i + delta)
  }, [])

  const goToReal = useCallback((realIdx) => {
    setExtIndex(realIdx + 1)
  }, [])

  const onTrackTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
      const prev = extIndexRef.current
      if (prev === 0) {
        setSkipTransition(true)
        setExtIndex(n)
      } else if (prev === lastExt) {
        setSkipTransition(true)
        setExtIndex(1)
      }
    },
    [lastExt, n]
  )

  useLayoutEffect(() => {
    if (!skipTransition) return
    const id = requestAnimationFrame(() => {
      setSkipTransition(false)
    })
    return () => cancelAnimationFrame(id)
  }, [skipTransition, extIndex])

  return (
    <div
      className="menukort-page__carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Menu billeder"
    >
      <div className="menukort-page__carousel-row">
        <button
          type="button"
          className="menukort-page__carousel-btn--side"
          onClick={() => go(-1)}
          aria-label="Forrige menu-side"
        >
          <img
            src={rightArrow}
            alt=""
            className="menukort-page__carousel-arrow menukort-page__carousel-arrow--flip"
            width={40}
            height={40}
            decoding="async"
          />
        </button>
        <div className="menukort-page__carousel-main">
          <div className="menukort-page__carousel-viewport" ref={viewportRef}>
            <div
              className={`menukort-page__carousel-track${skipTransition ? ' menukort-page__carousel-track--no-tx' : ''}`}
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
              onTransitionEnd={onTrackTransitionEnd}
            >
              {extendedPages.map((page, i) => {
                const slideMod =
                  i === extIndex
                    ? ' menukort-page__carousel-slide--active'
                    : i === leftPeekIndex
                      ? ' menukort-page__carousel-slide--peek-left'
                      : i === rightPeekIndex
                        ? ' menukort-page__carousel-slide--peek-right'
                        : ''
                return (
                  <div
                    key={`${tabId}-ext-${i}`}
                    className={`menukort-page__carousel-slide${slideMod}`}
                    style={slideW > 0 ? { flex: `0 0 ${slideW}px`, width: slideW, minWidth: slideW } : undefined}
                    aria-hidden={i !== extIndex}
                  >
                    <img
                      className="menukort-page__image menukort-page__image--carousel"
                      src={page.src}
                      alt=""
                      loading={i === 1 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                )
              })}
            </div>
            {edgeClickNav && (
              <div className="menukort-page__carousel-edge-hits" aria-hidden="true">
                <button
                  type="button"
                  className="menukort-page__carousel-hit menukort-page__carousel-hit--prev"
                  tabIndex={-1}
                  onClick={() => go(-1)}
                />
                <button
                  type="button"
                  className="menukort-page__carousel-hit menukort-page__carousel-hit--next"
                  tabIndex={-1}
                  onClick={() => go(1)}
                />
              </div>
            )}
          </div>
          {showDots && (
            <div className="menukort-page__carousel-dots-wrap" role="group" aria-label="Vælg side">
              <div className="menukort-page__carousel-dots">
                {pages.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    aria-label={`Side ${i + 1} af ${pages.length}`}
                    aria-current={realIndex === i ? 'true' : undefined}
                    className={`menukort-page__carousel-dot${realIndex === i ? ' menukort-page__carousel-dot--active' : ''}`}
                    onClick={() => goToReal(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="menukort-page__carousel-btn--side"
          onClick={() => go(1)}
          aria-label="Næste menu-side"
        >
          <img
            src={rightArrow}
            alt=""
            className="menukort-page__carousel-arrow"
            width={40}
            height={40}
            decoding="async"
          />
        </button>
      </div>
    </div>
  )
}

function MenukortPanelContent({ tabId, pages, isLaptop }) {
  const count = pages.length

  if (!isLaptop) {
    return (
      <ul className="menukort-page__list">
        {pages.map((page, index) => (
          <li key={`${tabId}-${index}`} className="menukort-page__item">
            <img
              className="menukort-page__image"
              src={page.src}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </li>
        ))}
      </ul>
    )
  }

  if (count > 2) {
    return (
      <MenukortCarousel
        pages={pages}
        tabId={tabId}
        showDots={tabId !== 'drikke'}
        edgeClickNav={tabId === 'drikke'}
      />
    )
  }

  const listClass =
    count === 1
      ? 'menukort-page__list menukort-page__list--laptop-grid menukort-page__list--laptop-single'
      : 'menukort-page__list menukort-page__list--laptop-grid'

  return (
    <ul className={listClass}>
      {pages.map((page, index) => (
        <li key={`${tabId}-${index}`} className="menukort-page__item">
          <img
            className="menukort-page__image"
            src={page.src}
            alt=""
            loading="eager"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  )
}

function MenukortTabList({ activeTab, onTabChange, variant }) {
  const tabsClass =
    variant === 'header'
      ? 'menukort-page__tabs menukort-page__tabs--header'
      : 'menukort-page__tabs'
  return (
    <div className={tabsClass} role="tablist" aria-label="Menukort sektioner">
      {TABS.map((tab) => {
        const selected = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`menukort-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`menukort-panel-${tab.id}`}
            className={`menukort-page__tab${selected ? ' menukort-page__tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function MenukortPage() {
  const outlet = useOutletContext()
  const setMenukortHeaderCenter = outlet?.setMenukortHeaderCenter
  const isLaptop = useIsLaptopMenukort()
  const [activeTab, setActiveTab] = useState('brunch')

  useEffect(() => {
    if (!setMenukortHeaderCenter) return
    if (!isLaptop) {
      setMenukortHeaderCenter(null)
      return
    }
    setMenukortHeaderCenter(
      <div className="header__menukort-tabs-wrap">
        <MenukortTabList activeTab={activeTab} onTabChange={setActiveTab} variant="header" />
      </div>
    )
  }, [isLaptop, activeTab, setMenukortHeaderCenter])

  useEffect(() => {
    return () => {
      setMenukortHeaderCenter?.(null)
    }
  }, [setMenukortHeaderCenter])

  return (
    <main className={`menukort-page${isLaptop ? ' menukort-page--laptop' : ''}`}>
      <Helmet>
        <title>Menukort – Café Zappa Horsens</title>
        <meta
          name="description"
          content="Se menukort: brunch, favoritter, social dining og drikkevarer hos Café Zappa i Horsens."
        />
      </Helmet>
      {!isLaptop && (
        <div className="menukort-page__tabs-sticky">
          <div className="menukort-page__tabs-inner">
            <MenukortTabList activeTab={activeTab} onTabChange={setActiveTab} variant="page" />
          </div>
        </div>
      )}

      <section className="menukort-page__panels" aria-label="Menu indhold">
        <div className="menukort-page__content-inner">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              id={`menukort-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`menukort-tab-${tab.id}`}
              hidden={activeTab !== tab.id}
              className="menukort-page__panel"
            >
              {activeTab === tab.id && (
                <MenukortPanelContent tabId={tab.id} pages={MENU_PAGES[tab.id]} isLaptop={isLaptop} />
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default MenukortPage
