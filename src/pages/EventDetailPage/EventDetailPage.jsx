import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { getEventBySlug, getOtherEvents } from '../../data/events'
import './EventDetailPage.css'

function EventDetailPage() {
  const { slug } = useParams()
  const event = slug ? getEventBySlug(slug) : undefined
  const others = event ? getOtherEvents(event.slug) : []
  const showSidebar = others.length > 0

  if (!event) {
    return (
      <main className="event-detail-page event-detail-page--not-found">
        <Helmet>
          <title>Event ikke fundet – Café Zappa</title>
          <meta name="description" content="Dette event findes ikke på Café Zappa i Horsens." />
        </Helmet>
        <div className="event-detail-page__not-found-inner">
          <h1 className="event-detail-page__not-found-title">Event ikke fundet</h1>
          <p className="event-detail-page__not-found-text">
            Vi kunne ikke finde dette event. Det er måske blevet aflyst, eller linket er forkert.
          </p>
          <Link className="event-detail-page__not-found-link" to="/events">
            ← Tilbage til alle events
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="event-detail-page">
      <Helmet>
        <title>{`${event.title} – Café Zappa`}</title>
        <meta
          name="description"
          content={event.teaser || (event.description && event.description[0]) || ''}
        />
      </Helmet>
      <div
        className={`event-detail-page__layout${showSidebar ? '' : ' event-detail-page__layout--solo'}`}
      >
        {showSidebar && (
          <aside className="event-detail-page__sidebar" aria-labelledby="event-detail-sidebar-heading">
            <div className="event-detail-page__sidebar-sticky">
              <h2 id="event-detail-sidebar-heading" className="event-detail-page__sidebar-heading">
                Andre events
              </h2>
              <ul className="event-detail-page__sidebar-list">
                {others.map((item) => (
                  <li key={item.id}>
                    <Link className="event-detail-page__sidebar-card" to={`/events/${item.slug}`}>
                      <img
                        className="event-detail-page__sidebar-thumb"
                        src={item.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="event-detail-page__sidebar-card-body">
                        <span className="event-detail-page__sidebar-card-title">{item.title}</span>
                        <span className="event-detail-page__sidebar-card-meta">
                          {item.date} · {item.time}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        <article className="event-detail-page__main">
          <figure className="event-detail-page__figure">
            <img
              className="event-detail-page__hero-img"
              src={event.image}
              alt={event.imageAlt}
              loading="eager"
              decoding="async"
            />
          </figure>

          <h1 className="event-detail-page__title">{event.title}</h1>

          <p className="event-detail-page__meta">
            {event.date} · {event.time} · {event.location}
          </p>

          <div className="event-detail-page__body">
            {event.description.map((paragraph, i) => (
              <p key={i} className="event-detail-page__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <section className="event-detail-page__highlights-block" aria-labelledby="highlights-heading">
            <h2 id="highlights-heading" className="event-detail-page__highlights-heading">
              Hvad får du?
            </h2>
            <ul className="event-detail-page__highlights">
              {event.highlights.map((line, i) => (
                <li key={i} className="event-detail-page__highlight-item">
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <a
            className="event-detail-page__book"
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book bord
          </a>

          <p className="event-detail-page__back-wrap">
            <Link className="event-detail-page__back" to="/events">
              ← Se alle events
            </Link>
          </p>
        </article>
      </div>
    </main>
  )
}

export default EventDetailPage
