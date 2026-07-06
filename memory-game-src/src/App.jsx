import { useState } from 'react'
import SetupScreen from './components/SetupScreen'
import GameBoard from './components/GameBoard'
import EndScreen from './components/EndScreen'
import { t } from './i18n'
import './App.css'

export default function App() {
  const [screen,  setScreen]  = useState('setup')
  const [config,  setConfig]  = useState({ theme: 'espace', level: 'facile' })
  const [result,  setResult]  = useState(null)
  const [gameKey, setGameKey] = useState(0)
  const [lang,    setLang]    = useState('fr')

  const strings = t[lang]

  function handleStart(cfg) {
    setConfig(cfg)
    setGameKey(k => k + 1)
    setScreen('game')
  }

  function handleWin(res) {
    setResult(res)
    setScreen('end')
  }

  function handleReplay() {
    setGameKey(k => k + 1)
    setScreen('game')
  }

  return (
    <div className="app">
      <nav className="game-nav">
        <a href="../index.html" className="nav-brand">{strings.nav.back}</a>
        <span className="nav-title">{strings.nav.title}</span>
        <button
          className="lang-toggle"
          onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
          aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </nav>

      {screen === 'setup' && (
        <SetupScreen lang={lang} strings={strings.setup} onStart={handleStart} />
      )}
      {screen === 'game' && (
        <GameBoard key={gameKey} config={config} strings={strings.game} onWin={handleWin} />
      )}
      {screen === 'end' && (
        <EndScreen
          result={result}
          config={config}
          strings={strings.end}
          onReplay={handleReplay}
          onMenu={() => setScreen('setup')}
        />
      )}
    </div>
  )
}
