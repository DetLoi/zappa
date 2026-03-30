import { useCallback, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { JOBS, UNPOSTED_LABEL } from '../../data/jobs'
import './JobsPage.css'

function buildPositionOptions() {
  const titles = JOBS.map((j) => j.title)
  return [...titles, UNPOSTED_LABEL]
}

function JobsPage() {
  const kontaktRef = useRef(null)
  const [openJobId, setOpenJobId] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [stilling, setStilling] = useState(() => (JOBS.length > 0 ? '' : UNPOSTED_LABEL))

  const positionOptions = useMemo(() => buildPositionOptions(), [])

  const toggleCard = useCallback((id) => {
    setOpenJobId((prev) => (prev === id ? null : id))
  }, [])

  const scrollToKontakt = useCallback((jobTitle) => {
    setStilling(jobTitle)
    window.requestAnimationFrame(() => {
      kontaktRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const hasJobs = JOBS.length > 0

  return (
    <main className="jobs-page">
      <Helmet>
        <title>Job hos Café Zappa – Horsens</title>
        <meta
          name="description"
          content="Ledige stillinger og job hos Café Zappa i Horsens."
        />
      </Helmet>
      <header className="jobs-page__hero">
        <h1 className="jobs-page__hero-title">Job hos Café Zappa</h1>
        <p className="jobs-page__hero-subtitle">Bliv en del af holdet</p>
      </header>

      <div className="jobs-page__intro">
        <p className="jobs-page__intro-text">
          Nedenunder finder du vores ledige stillinger. Du har også mulighed for at søge uopfordret.
        </p>
      </div>

      <div className="jobs-page__list-wrap">
        {hasJobs ? (
          <ul className="jobs-page__list">
            {JOBS.map((job) => {
              const isOpen = openJobId === job.id
              return (
                <li key={job.id}>
                  <article className={`jobs-page__card${isOpen ? ' jobs-page__card--open' : ''}`}>
                    <div className="jobs-page__card-header">
                      <div>
                        <h2 className="jobs-page__card-title">{job.title}</h2>
                        <div className="jobs-page__card-meta">
                          <span className="jobs-page__badge">{job.type}</span>
                          <span className="jobs-page__dept">{job.department}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="jobs-page__toggle"
                        aria-expanded={isOpen}
                        aria-controls={`job-panel-${job.id}`}
                        id={`job-toggle-${job.id}`}
                        onClick={() => toggleCard(job.id)}
                      >
                        {isOpen ? 'Skjul stillingsopslag ↑' : 'Se stillingsopslag ↓'}
                      </button>
                    </div>
                    <div
                      className="jobs-page__card-expand"
                      id={`job-panel-${job.id}`}
                      role="region"
                      aria-hidden={!isOpen}
                      aria-labelledby={`job-toggle-${job.id}`}
                    >
                      <div className="jobs-page__card-expand-inner">
                        <div className="jobs-page__card-detail">
                          <p className="jobs-page__card-desc">{job.description}</p>

                          <h3 className="jobs-page__card-subheading">Ansvarsområder</h3>
                          <ul className="jobs-page__card-list">
                            {job.responsibilities.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>

                          <h3 className="jobs-page__card-subheading">Kvalifikationer</h3>
                          <ul className="jobs-page__card-list">
                            {job.qualifications.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>

                          <div className="jobs-page__card-meta-row">
                            <p className="jobs-page__card-meta-item">
                              <strong>Ansøgningsfrist:</strong> {job.deadline}
                            </p>
                            <p className="jobs-page__card-meta-item">
                              <strong>Start:</strong> {job.startDate}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="jobs-page__apply"
                            onClick={() => scrollToKontakt(job.title)}
                          >
                            Søg denne stilling
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="jobs-page__empty">
            <h2 className="jobs-page__empty-title">Ingen ledige stillinger</h2>
            <p className="jobs-page__empty-text">
              Men du er velkommen til at kontakte os med en uopfordret ansøgning i formularen herunder.
            </p>
          </div>
        )}
      </div>

      <div className="jobs-page__divider-wrap">
        <hr className="jobs-page__divider" />
      </div>

      <section
        ref={kontaktRef}
        id="kontakt"
        className="jobs-page__form-section"
        aria-labelledby="jobs-kontakt-heading"
      >
        <div className="jobs-page__form-inner">
          <h2 id="jobs-kontakt-heading" className="jobs-page__form-title">
            Søg en stilling
          </h2>
          <p className="jobs-page__form-intro">Udfyld formularen — vi læser alle ansøgninger</p>

          {submitted ? (
            <p className="jobs-page__success" role="status">
              Tak for din ansøgning! Vi vender tilbage hurtigst muligt.
            </p>
          ) : (
            <form className="jobs-page__form" onSubmit={handleSubmit}>
              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-navn">
                  Navn
                </label>
                <input
                  id="jobs-navn"
                  name="navn"
                  className="jobs-page__input"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-email">
                  E-mail
                </label>
                <input
                  id="jobs-email"
                  name="email"
                  className="jobs-page__input"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-telefon">
                  Telefon <span className="jobs-page__optional">(valgfrit)</span>
                </label>
                <input
                  id="jobs-telefon"
                  name="telefon"
                  className="jobs-page__input"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-stilling">
                  Stilling
                </label>
                <select
                  id="jobs-stilling"
                  name="stilling"
                  className="jobs-page__select"
                  value={stilling}
                  onChange={(e) => setStilling(e.target.value)}
                  required
                >
                  {hasJobs ? (
                    <>
                      <option value="" disabled>
                        Vælg stilling
                      </option>
                      {positionOptions.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value={UNPOSTED_LABEL}>{UNPOSTED_LABEL}</option>
                  )}
                </select>
              </div>

              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-cv">
                  Vedhæft CV
                </label>
                <input
                  id="jobs-cv"
                  name="cv"
                  className="jobs-page__file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </div>

              <div className="jobs-page__field">
                <label className="jobs-page__label" htmlFor="jobs-besked">
                  Besked / ansøgning
                </label>
                <textarea
                  id="jobs-besked"
                  name="besked"
                  className="jobs-page__textarea"
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="jobs-page__submit">
                Send ansøgning
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default JobsPage
