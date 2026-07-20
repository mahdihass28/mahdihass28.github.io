import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { PRODUCTS, PRICES, YEARS, monthIndex } from '../data.js';

const BAR = '#2a78d6';
const BAR_DIM = '#9ec5f4';

function CompareTooltip({ active, payload, fmt, t }) {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;
  return (
    <div className="viz-tooltip">
      <div className="viz-tooltip-title">{row.name}</div>
      <div className="viz-tooltip-row">
        <span className="viz-tooltip-val">{fmt.money.format(row.price)}</span>
        <span className="viz-tooltip-unit">{t.perUnit[row.unit]}</span>
      </div>
    </div>
  );
}

export default function CompareChart({ t, fmt, lang, rate }) {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(11);
  const [focus, setFocus] = useState(null);

  const data = useMemo(() => {
    const i = monthIndex(year, month);
    return PRODUCTS
      .map((p) => ({ id: p.id, unit: p.unit, name: t.products[p.id], price: PRICES[p.id][i] * rate }))
      .sort((a, b) => b.price - a.price);
  }, [year, month, rate, t]);

  const monthNames = useMemo(
    () => Array.from({ length: 12 }, (_, m) => fmt.monthOnly.format(new Date(2025, m, 1))),
    [fmt],
  );

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2>{t.compareTitle}</h2>
          <p className="card-desc">{t.compareDesc}</p>
        </div>
      </div>

      <div className="controls" role="group" aria-label={t.compareTitle}>
        <label>
          <span>{t.month}</span>
          <select value={month} onChange={(e) => setMonth(+e.target.value)}>
            {monthNames.map((name, m) => <option key={m} value={m}>{name}</option>)}
          </select>
        </label>
        <label>
          <span>{t.year}</span>
          <select value={year} onChange={(e) => setYear(+e.target.value)}>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={344}>
          <BarChart
            data={data} layout="vertical"
            margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
            onMouseLeave={() => setFocus(null)}
          >
            <CartesianGrid stroke="#e1e0d9" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => fmt.moneyShort.format(v)}
              tick={{ fill: '#898781', fontSize: 12 }}
              axisLine={{ stroke: '#c3c2b7' }}
              tickLine={false}
            />
            <YAxis
              type="category" dataKey="name"
              width={lang === 'fr' ? 150 : 130}
              tick={{ fill: '#52514e', fontSize: 12.5 }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CompareTooltip fmt={fmt} t={t} />} cursor={{ fill: 'rgba(42,120,214,0.06)' }} />
            <Bar
              dataKey="price" barSize={18} radius={[0, 4, 4, 0]} isAnimationActive={false}
              onMouseEnter={(_, idx) => setFocus(idx)}
            >
              {data.map((row, idx) => (
                <Cell key={row.id} fill={focus === null || focus === idx ? BAR : BAR_DIM} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
