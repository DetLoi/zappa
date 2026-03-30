import { Helmet } from 'react-helmet-async'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <main className="not-found">
      <Helmet>
        <title>Side ikke fundet – Café Zappa</title>
        <meta name="description" content="404 – siden findes ikke. Gå tilbage til Café Zappa." />
      </Helmet>
      <section className="not-found__hero">
        <div className="not-found__inner">
          <h1 className="not-found__title">404: Siden blev ikke fundet</h1>
          <p className="not-found__description">
            Den side du leder efter findes ikke (eller er flyttet).
          </p>
          <a className="not-found__link" href="/">
            Gå til forsiden
          </a>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
