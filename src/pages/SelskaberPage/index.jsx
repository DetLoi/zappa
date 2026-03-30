import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GALLERY_IMAGES } from '../../data/gallery'
import './SelskaberPage.css'

const SELSKABER_IMAGES = [
  GALLERY_IMAGES[0],
  GALLERY_IMAGES[4],
  GALLERY_IMAGES[7],
]

function SelskaberPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="selskaber-page">
      <Helmet>
        <title>Selskaber &amp; Catering – Café Zappa Horsens</title>
        <meta
          name="description"
          content="Selskaber, erhverv og catering. Kontakt Café Zappa i Horsens."
        />
      </Helmet>
      <header className="selskaber-page__hero">
        <h1 className="selskaber-page__hero-title">Selskaber &amp; Erhverv</h1>
        <p className="selskaber-page__hero-subtitle">
          Atmosfæren er vores gave, selskabet er dit
        </p>
      </header>

      <section
        className="selskaber-page__split selskaber-page__split--text-left"
        aria-labelledby="selskaber-heading"
      >
        <div className="selskaber-page__split-body">
          <h2 id="selskaber-heading" className="selskaber-page__split-heading">
            Selskaber
          </h2>
          <p className="selskaber-page__split-text">
            Søger du et hyggeligt sted til din næste intime fest? Café Zappa er det ideelle valg for
            mindre selskaber. Vi tilbyder personlig service og skræddersyede menuer, der passer perfekt
            til din specielle lejlighed. Lad os være rammen om dit næste mindeværdige arrangement.
          </p>
          <a className="selskaber-page__split-cta" href="#kontakt">
            Send os en forespørgsel ↓
          </a>
        </div>
        <figure className="selskaber-page__split-media">
          <img
            className="selskaber-page__split-img"
            src={SELSKABER_IMAGES[0]}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section
        className="selskaber-page__split selskaber-page__split--text-right selskaber-page__split--alt"
        aria-labelledby="catering-heading"
      >
        <div className="selskaber-page__split-body">
          <h2 id="catering-heading" className="selskaber-page__split-heading">
            Catering
          </h2>
          <p className="selskaber-page__split-text">
            Hos Café Zappa er vi dedikerede til at levere enestående madoplevelser, uanset hvor du
            ønsker at nyde dem. Vi ønsker at bringe smagen af vores café direkte til dit næste event
            — fødselsdagsfejring, bryllup, firmafest eller en anden særlig lejlighed. Vi kan måske
            ikke stå for selskabet, men vi kan garantere for maden.
          </p>
          <a className="selskaber-page__split-cta" href="#kontakt">
            Få et uforpligtende tilbud ↓
          </a>
        </div>
        <figure className="selskaber-page__split-media">
          <img
            className="selskaber-page__split-img"
            src={SELSKABER_IMAGES[1]}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section
        className="selskaber-page__split selskaber-page__split--text-left"
        aria-labelledby="erhverv-heading"
      >
        <div className="selskaber-page__split-body">
          <h2 id="erhverv-heading" className="selskaber-page__split-heading">
            Frokostordning til din virksomhed
          </h2>
          <p className="selskaber-page__split-text">
            Giv dine kolleger en smagsoplevelse ud over det sædvanlige. Vi tilbyder en varieret og
            fleksibel frokostløsning til virksomheder i Horsens og omegn. Fra hjertevarmende
            klassikere til nyskabende retter — alt tilpasset jeres behov.
          </p>
          <a className="selskaber-page__split-cta" href="#kontakt">
            Hør mere om frokostordning ↓
          </a>
        </div>
        <figure className="selskaber-page__split-media">
          <img
            className="selskaber-page__split-img"
            src={SELSKABER_IMAGES[2]}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <div className="selskaber-page__divider-wrap">
        <hr className="selskaber-page__divider" />
      </div>

      <section id="kontakt" className="selskaber-page__form-section" aria-labelledby="kontakt-heading">
        <div className="selskaber-page__form-inner">
          <h2 id="kontakt-heading" className="selskaber-page__form-title">
            Lad os høre fra dig
          </h2>
          <p className="selskaber-page__form-intro">
            Udfyld formularen og vi vender tilbage hurtigst muligt
          </p>

          {submitted ? (
            <p className="selskaber-page__success" role="status">
              Tak! Vi har modtaget din besked og vender tilbage hurtigst muligt.
            </p>
          ) : (
            <form className="selskaber-page__form" onSubmit={handleSubmit}>
              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-navn">
                  Navn
                </label>
                <input
                  id="selskaber-navn"
                  name="navn"
                  className="selskaber-page__input"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-virksomhed">
                  Virksomhed <span className="selskaber-page__optional">(valgfrit)</span>
                </label>
                <input
                  id="selskaber-virksomhed"
                  name="virksomhed"
                  className="selskaber-page__input"
                  type="text"
                  autoComplete="organization"
                />
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-email">
                  E-mail
                </label>
                <input
                  id="selskaber-email"
                  name="email"
                  className="selskaber-page__input"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-telefon">
                  Telefon <span className="selskaber-page__optional">(valgfrit)</span>
                </label>
                <input
                  id="selskaber-telefon"
                  name="telefon"
                  className="selskaber-page__input"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-anledning">
                  Anledning
                </label>
                <select
                  id="selskaber-anledning"
                  name="anledning"
                  className="selskaber-page__select"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Vælg anledning
                  </option>
                  <option value="selskab">Selskab</option>
                  <option value="catering">Catering</option>
                  <option value="frokostordning">Frokostordning</option>
                  <option value="andet">Andet</option>
                </select>
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-guests">
                  Antal gæster <span className="selskaber-page__optional">(valgfrit)</span>
                </label>
                <input
                  id="selskaber-guests"
                  name="antal_gaester"
                  className="selskaber-page__input"
                  type="number"
                  min={1}
                  inputMode="numeric"
                />
              </div>

              <div className="selskaber-page__field">
                <label className="selskaber-page__label" htmlFor="selskaber-besked">
                  Besked
                </label>
                <textarea
                  id="selskaber-besked"
                  name="besked"
                  className="selskaber-page__textarea"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="selskaber-page__submit">
                Send forespørgsel
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default SelskaberPage
