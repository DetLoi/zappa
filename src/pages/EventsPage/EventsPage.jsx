import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Container from '../../components/Container/Container'
import { EVENTS } from '../../data/events'
import '../HomePage/HomePage.css'
import './EventsPage.css'

function EventsPage() {
  const hasEvents = EVENTS.length > 0

  return (
    <main className="events-page">
      <Helmet>
        <title>Events – Café Zappa Horsens</title>
        <meta
          name="description"
          content="Kommende events og arrangementer hos Café Zappa i Horsens."
        />
      </Helmet>
      <header className="events-page__hero">
        <h1 className="events-page__hero-title">Events</h1>
      </header>

      <div className="events-page__body">
        <Container>
          {!hasEvents ? (
            <p className="events-page__empty">
              Ingen kommende events – følg med her eller på vores sociale medier.
            </p>
          ) : (
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
          )}
        </Container>
      </div>
    </main>
  )
}

export default EventsPage
