import { Helmet } from 'react-helmet-async'
import { GALLERY_IMAGES } from '../../data/gallery'
import './AboutPage.css'

const BOOKING_URL = 'https://cafezappa.booketbord.dk/onlinebooking'

function AboutPage() {
  const [hero, interior, food, bar, guests] = GALLERY_IMAGES

  return (
    <main className="about-page">
      <Helmet>
        <title>Om Os – Café Zappa Horsens</title>
        <meta
          name="description"
          content="Læs om Café Zappa – vores historie, mad og stemning i Horsens."
        />
      </Helmet>
      <section className="about-page__hero" aria-labelledby="about-hero-heading">
        <div className="about-page__hero-inner">
          <img
            className="about-page__hero-img about-img-placeholder"
            src={hero}
            alt=""
            data-label="hero-about.jpg"
            loading="eager"
            decoding="async"
          />
          <div className="about-page__hero-overlay" aria-hidden />
          <div className="about-page__hero-content">
            <p className="about-page__eyebrow">Vores historie</p>
            <h1 id="about-hero-heading" className="about-page__hero-title">
              Velkommen til hjertet af Café Zappa
            </h1>
          </div>
        </div>
      </section>

      <section className="about-page__opening" aria-labelledby="about-opening-heading">
        <h2 id="about-opening-heading" className="visually-hidden">
          Om Café Zappa
        </h2>
        <p className="about-page__lead">
          Vores rejse er en fortælling om passion og dedikation til det gode håndværk.
        </p>
        <p className="about-page__body">
          Grundlagt på en drøm om at skabe et samlingspunkt for livsnydere, har vi siddet ved
          tegnebrættet med én vision i tankerne: At skabe et sted, hvor kvalitet og hygge mødes.
        </p>
      </section>

      <section className="about-page__image-break about-page__full-bleed" aria-hidden="true">
        <img
          className="about-page__image-break-img about-img-placeholder"
          src={interior}
          alt=""
          data-label="about-interior.jpg"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="about-page__split-wrap" aria-labelledby="about-split-heading">
        <div className="about-page__split">
          <div className="about-page__split-media">
            <img
              className="about-page__split-img about-img-placeholder"
              src={food}
              alt=""
              data-label="about-food.jpg"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-page__split-body">
            <h2 id="about-split-heading" className="about-page__section-heading">
              Fra morgen til aften
            </h2>
            <p className="about-page__body">
              Fra morgendagens første brunch til aftenens sidste tapas, byder vi på en palette af
              smagsoplevelser. Her finder du alt fra hjertevarmende burgere til pastaretter, der tager
              dig tilbage til det autentiske Italien.
            </p>
          </div>
        </div>
      </section>

      <figure className="about-page__pullquote">
        <blockquote className="about-page__pullquote-inner">
          <p className="about-page__pullquote-text">Café Zappa er ikke blot et spisested</p>
        </blockquote>
      </figure>

      <section className="about-page__closing" aria-labelledby="about-closing-heading">
        <div className="about-page__closing-inner">
          <h2 id="about-closing-heading" className="visually-hidden">
            Afslutning
          </h2>
          <p className="about-page__body">
            Det er et sted for fællesskab og samvær, hvor familier og venner kan samles og dele måltider
            tilberedt med omtanke og serveret med varme.
          </p>
          <p className="about-page__closing-script">
            Café Zappa – Hvor maden er hjemmelavet, og hver bid er en del af vores historie.
          </p>
          <a
            className="about-page__cta about-page__cta--on-band"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book et bord
          </a>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
