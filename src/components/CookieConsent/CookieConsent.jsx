import { useState, useEffect } from 'react'
import './CookieConsent.css'

const COOKIE_KEY = 'zappa-cookie-consent'

const CATEGORIES = [
  { id: 'necessary', label: 'Absolut nødvendige', required: true },
  { id: 'performance', label: 'Ydeevne', required: false },
  { id: 'targeting', label: 'Målretning', required: false },
  { id: 'functionality', label: 'Funktionalitet', required: false },
]

function loadStoredPreferences() {
  try {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (_) {}
  return Object.fromEntries(CATEGORIES.map((c) => [c.id, true]))
}

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasConsent, setHasConsent] = useState(() => !!localStorage.getItem(COOKIE_KEY))
  const [preferences, setPreferences] = useState(loadStoredPreferences)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!hasConsent) setIsVisible(true)
  }, [hasConsent])

  const closeModal = () => {
    setHasConsent(true)
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const all = Object.fromEntries(CATEGORIES.map((c) => [c.id, true]))
    localStorage.setItem(COOKIE_KEY, JSON.stringify(all))
    closeModal()
  }

  const handleAcceptSelected = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(preferences))
    closeModal()
  }

  const handleRejectOptional = () => {
    const onlyNecessary = Object.fromEntries(
      CATEGORIES.map((c) => [c.id, c.required])
    )
    localStorage.setItem(COOKIE_KEY, JSON.stringify(onlyNecessary))
    closeModal()
  }

  const openModal = () => {
    setPreferences(loadStoredPreferences())
    setIsVisible(true)
  }

  const togglePreference = (id) => {
    const cat = CATEGORIES.find((c) => c.id === id)
    if (cat?.required) return
    setPreferences((p) => ({ ...p, [id]: !p[id] }))
  }

  return (
    <>
      {hasConsent && !isVisible && (
        <button
          type="button"
          className="cookie-settings-trigger"
          onClick={openModal}
          aria-label="Åbn cookie-indstillinger"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M8 0a7.96 7.96 0 0 0-4.075 1.114q-.245.102-.437.28A8 8 0 1 0 8 0m3.25 14.201a1.5 1.5 0 0 0-2.13.71A7 7 0 0 1 8 15a6.97 6.97 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.97 6.97 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A7 7 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.97 6.97 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7 7 0 0 1-2.51 2.224Z" />
          </svg>
        </button>
      )}

      {isVisible && (
    <div className="cookie-consent-backdrop" role="dialog" aria-label="Cookie-indstillinger">
      <div className="cookie-consent">
        <div className="cookie-consent__content">
          <h3 className="cookie-consent__title">Denne hjemmeside bruger cookies</h3>
          <p className="cookie-consent__text">
            Denne hjemmeside bruger cookies til at forbedre brugeroplevelsen. Ved at
            bruge vores hjemmeside giver du samtykke til alle cookies i overensstemmelse
            med vores cookiepolitik.{' '}
            <button type="button" className="cookie-consent__link">
              Læs mere
            </button>
          </p>

          {showDetails && (
          <div className="cookie-consent__options">
            {CATEGORIES.map(({ id, label, required }) => (
              <label key={id} className="cookie-consent__option">
                <input
                  type="checkbox"
                  checked={preferences[id]}
                  disabled={required}
                  onChange={() => togglePreference(id)}
                />
                <span>{label}</span>
                {required && (
                  <span className="cookie-consent__required">(påkrævet)</span>
                )}
              </label>
            ))}
          </div>
          )}
        </div>

        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={handleAcceptAll}
          >
            Accepter alle
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--secondary"
            onClick={handleAcceptSelected}
          >
            Gem valg
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--outline"
            onClick={handleRejectOptional}
          >
            Kun nødvendige
          </button>
          <button
            type="button"
            className="cookie-consent__details-trigger"
            onClick={() => setShowDetails((d) => !d)}
          >
            <SettingsIcon />
            <span>{showDetails ? 'Skjul detaljer' : 'Vis detaljer'}</span>
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  )
}

export default CookieConsent
