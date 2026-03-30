import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Container from '../../components/Container/Container'
import { GALLERY_IMAGES } from '../../data/gallery'
import { EVENTS } from '../../data/events'
import { FEEDBACKS } from '../../data/feedbacks'
import placeholderVid from '../../assets/placerholdervid.mp4'
import rightArrow from '../../assets/right-arrow.png'
import './HomePage.css'

function HomePage() {
  const greenSectionRef = useRef(null)
  const greenSectionBottomRef = useRef(null)
  const eventsSectionRef = useRef(null)
  const midBridgeWrapRef = useRef(null)
  const artworkGalleryRef = useRef(null)
  const [greenBgReveal, setGreenBgReveal] = useState(false)
  const [eventsContentVisible, setEventsContentVisible] = useState(false)
  const [midBridgeVisible, setMidBridgeVisible] = useState(false)
  const [galleryVisible, setGalleryVisible] = useState(false)

  useEffect(() => {
    const section = greenSectionRef.current
    const sentinel = greenSectionBottomRef.current
    if (!section || !sentinel) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setGreenBgReveal(true)
      return
    }

    const ioReveal = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGreenBgReveal(true)
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )
    const ioReset = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setGreenBgReveal(false)
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )
    ioReveal.observe(sentinel)
    ioReset.observe(section)
    return () => {
      ioReveal.disconnect()
      ioReset.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = eventsSectionRef.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setEventsContentVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEventsContentVisible(true)
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    )
    io.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      setEventsContentVisible(true)
    }

    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = midBridgeWrapRef.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setMidBridgeVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMidBridgeVisible(true)
      },
      { root: null, rootMargin: '0px 0px -4% 0px', threshold: 0.12 }
    )
    io.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setMidBridgeVisible(true)
    }

    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = artworkGalleryRef.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setGalleryVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGalleryVisible(true)
      },
      { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.1 }
    )
    io.observe(el)

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setGalleryVisible(true)
    }

    return () => io.disconnect()
  }, [])

  return (
    <main className="home-page">
      <Helmet>
        <title>Café Zappa – Restaurant &amp; Cocktailbar i Horsens</title>
        <meta
          name="description"
          content="Restaurant og cocktailbar i Horsens. Hjemmelavet mad, tapas, brunch og cocktails. Book bord online."
        />
      </Helmet>
      <section className="hero-section">
        <div className="hero-section__overlay" />
        <Container>
          <div className="hero-section__content">
            <h1 className="hero-section__title">Restaurant & Cocktailbar i hjertet af Horsens</h1>
            <p className="hero-section__subtitle">
            Vi tror på kvalitet, samvær og de små øjeblikke af lykke. Vores historie begyndte med et ønske om at skabe et hyggeligt sted for alle.
            </p>
            <div className="hero-section__actions">
              <a
                className="hero-section__cta"
                href="https://cafezappa.booketbord.dk/onlinebooking"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK BORD
              </a>
              <Link className="hero-section__cta" to="/menukort">
                SE VORES MENUKORT
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section
        ref={greenSectionRef}
        className={`home-section home-section--green${greenBgReveal ? ' home-section--green--bg-in' : ''}`}
      >
        <Container>
          <div
            ref={eventsSectionRef}
            className={`events-section${eventsContentVisible ? ' events-section--visible' : ''}`}
          >
            <div className="events-section__information">
              <div className="events-section__information-text">
                <h2 className="events-section__title">Events</h2>
                <p className="events-section__description">
                  Vores eventkalender opdateres løbende med alt fra DJ-aftener til vinsmagninger,
                  som løbende vil blive annonceret her.
                </p>
              </div>
              <div className="events-section__cta-wrap">
                <img
                  src={rightArrow}
                  alt=""
                  className="events-section__cta-arrow"
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
                <Link className="hero-section__cta" to="/selskaber">
                  SELSKABER
                </Link>
              </div>
            </div>
            <ul className="events-cards">
              {EVENTS.map((event) => (
                <li key={event.id}>
                  <article className="event-card">
                    <Link
                      className="event-card__cover"
                      to={`/events/${event.slug}`}
                      aria-label={`Læs mere om ${event.title}`}
                    />
                    <div className="event-card__frame">
                      <span className="event-card__date">{event.date}</span>
                      <div className="event-card__media">
                        <img
                          className="event-card__img"
                          src={event.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <h3 className="event-card__title" aria-hidden="true">
                      {event.title}
                    </h3>
                    <span className="event-card__more" aria-hidden="true">
                      LÆS MERE
                    </span>
                  </article>
                </li>
              ))}
            </ul>
            <p className="events-section__see-all-wrap">
              <Link className="events-section__see-all" to="/events">
                Se alle events →
              </Link>
            </p>
          </div>
        </Container>
        <div
          ref={greenSectionBottomRef}
          className="home-section--green__bottom-sentinel"
          aria-hidden
        />
      </section>
      <section className="home-section home-section--feedback" aria-label="Gæsteanmeldelser">
        <Container>
          <div className="feedback-section">
            <div className="feedback-carousel" aria-label="Gæsteanmeldelser">
              <div className="feedback-carousel__viewport">
                <div className="feedback-carousel__track" aria-hidden="true">
                  {[...FEEDBACKS, ...FEEDBACKS].map((item, index) => (
                    <article
                      key={`${item.id}-${index}`}
                      className="feedback-card"
                    >
                      <div className="feedback-card__stars" aria-label={`${item.stars} ud af 5 stjerner`}>
                        {'★'.repeat(item.stars)}
                        <span className="feedback-card__stars-muted">
                          {'★'.repeat(5 - item.stars)}
                        </span>
                      </div>
                      <p className="feedback-card__text">“{item.text}”</p>
                      <p className="feedback-card__name">— {item.name}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="home-section home-section--video" aria-label="Video">
        <video
          className="home-section__video"
          src={placeholderVid}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div
          ref={midBridgeWrapRef}
          className={`mid-bridge__wrap${midBridgeVisible ? ' mid-bridge__wrap--visible' : ''}`}
        >
          <Container>
            <a
              className="mid-bridge__panel mid-bridge__panel--link"
              href="https://cafezappa.nemtakeaway.dk/order.php"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bestil takeaway med 10% rabat (åbner i nyt vindue)"
            >
              <div className="mid-bridge__panel-inner">
                <div className="mid-bridge__copy">
                  <p className="mid-bridge__line--sub">
                    BESTIL TAKE AWAY TIL DINE FAMILIEMEDLEMMER
                  </p>
                  <p className="mid-bridge__line">
                    FÅ 10% RABAT PÅ DIN TAKEAWAY ORDRE:
                  </p>
                </div>
                <span className="mid-bridge__cta">BESTIL NU</span>
              </div>
            </a>
          </Container>
        </div>
      </section>
      <section className="home-section home-section--artwork" aria-label="Galleri">
        <div
          ref={artworkGalleryRef}
          className={`artwork-gallery${galleryVisible ? ' artwork-gallery--visible' : ''}`}
        >
          <div className="artwork-gallery__viewport">
            <div className="artwork-gallery__track" aria-hidden="true">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, index) => (
                <figure
                  key={`${src}-${index}`}
                  className="artwork-gallery__frame"
                  style={{ '--gallery-stagger': index }}
                >
                  <img
                    className="artwork-gallery__img"
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
