import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import AboutPage from './pages/AboutPage'
import GavekortPage from './pages/GavekortPage'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import MenukortPage from './pages/MenukortPage'
import EventsPage from './pages/EventsPage/EventsPage'
import EventDetailPage from './pages/EventDetailPage/EventDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import SelskaberPage from './pages/SelskaberPage'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/om-os" element={<AboutPage />} />
          <Route path="/menukort" element={<MenukortPage />} />
          <Route path="/gavekort" element={<GavekortPage />} />
          <Route path="/selskaber" element={<SelskaberPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
