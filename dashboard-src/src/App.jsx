import { useEffect, useMemo, useState } from 'react';
import { STRINGS, makeFormatters } from './i18n.js';
import { PRODUCTS, PRICES, USD_RATE } from './data.js';
import TrendChart from './components/TrendChart.jsx';
import CompareChart from './components/CompareChart.jsx';
import './App.css';

const LATEST = 59; // December 2025
const YEAR_AGO = 47; // December 2024
const LATEST_DATE = new Date(2025, 11, 1);

export default function App() {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('CAD');

  const t = STRINGS[lang];
  const fmt = useMemo(() => makeFormatters(lang, currency), [lang, currency]);
  const rate = currency === 'USD' ? USD_RATE : 1;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.appTitle;
  }, [lang, t]);

  const kpis = useMemo(() => {
    const basketNow = PRODUCTS.reduce((s, p) => s + PRICES[p.id][LATEST], 0);
    const basketThen = PRODUCTS.reduce((s, p) => s + PRICES[p.id][YEAR_AGO], 0);
    let riser = PRODUCTS[0];
    let riserPct = -Infinity;
    for (const p of PRODUCTS) {
      const pct = PRICES[p.id][LATEST] / PRICES[p.id][YEAR_AGO] - 1;
      if (pct > riserPct) { riserPct = pct; riser = p; }
    }
    return {
      basketNow: basketNow * rate,
      changePct: basketNow / basketThen - 1,
      riserName: t.products[riser.id],
      riserPct,
    };
  }, [rate, t]);

  const monthLabel = fmt.monthLong.format(LATEST_DATE);
  const hint = (key) => t[key].replace('{month}', monthLabel);

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">🥕</span>
            <div>
              <h1>{t.appTitle}</h1>
              <p className="subtitle">{t.appSubtitle}</p>
            </div>
          </div>
          <div className="toggles">
            <div className="toggle-group" role="group" aria-label={t.language}>
              <span className="toggle-label">{t.language}</span>
              <button className={lang === 'en' ? 'on' : ''} lang="en" onClick={() => setLang('en')} aria-pressed={lang === 'en'}>English</button>
              <button className={lang === 'fr' ? 'on' : ''} lang="fr" onClick={() => setLang('fr')} aria-pressed={lang === 'fr'}>Français</button>
            </div>
            <div className="toggle-group" role="group" aria-label={t.currency}>
              <span className="toggle-label">{t.currency}</span>
              <button className={currency === 'CAD' ? 'on' : ''} onClick={() => setCurrency('CAD')} aria-pressed={currency === 'CAD'}>CAD $</button>
              <button className={currency === 'USD' ? 'on' : ''} onClick={() => setCurrency('USD')} aria-pressed={currency === 'USD'}>USD $</button>
            </div>
          </div>
        </div>
      </header>

      <div className="notice" role="note">
        <span aria-hidden="true">ⓘ</span> {t.syntheticNotice}
      </div>

      <main className="content">
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-label">{t.kpiBasket}</div>
            <div className="kpi-value">{fmt.money.format(kpis.basketNow)}</div>
            <div className="kpi-hint">{hint('kpiBasketHint')}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{t.kpiChange}</div>
            <div className={'kpi-value ' + (kpis.changePct > 0 ? 'up' : 'down')}>
              {kpis.changePct > 0 ? '↑' : '↓'} {fmt.percent.format(kpis.changePct)}
            </div>
            <div className="kpi-hint">{hint('kpiChangeHint')}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{t.kpiRiser}</div>
            <div className="kpi-value">
              {kpis.riserName} <span className="kpi-sub up">{fmt.percent.format(kpis.riserPct)}</span>
            </div>
            <div className="kpi-hint">{hint('kpiRiserHint')}</div>
          </div>
        </div>

        <div className="charts">
          <TrendChart t={t} fmt={fmt} rate={rate} />
          <CompareChart t={t} fmt={fmt} lang={lang} rate={rate} />
        </div>
      </main>

      <footer className="foot">
        <p>{t.footerCourse}</p>
        <p className="foot-src">{t.footerSource}</p>
        <a href="https://mahdihass28.github.io/design4.html">{t.backToPortfolio}</a>
      </footer>
    </div>
  );
}
