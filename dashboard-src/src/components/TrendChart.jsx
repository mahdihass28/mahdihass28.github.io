import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { PRODUCTS, PRICES, YEARS, monthIndex } from '../data.js';

const SERIES_1 = '#2a78d6';
const SERIES_2 = '#008300';

function TrendTooltip({ active, payload, fmt, names }) {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;
  return (
    <div className="viz-tooltip">
      <div className="viz-tooltip-title">{fmt.monthLong.format(row.date)}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="viz-tooltip-row">
          <span className="viz-chip" style={{ background: p.stroke }} />
          <span className="viz-tooltip-name">{names[p.dataKey]}</span>
          <span className="viz-tooltip-val">{fmt.money.format(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart({ t, fmt, rate }) {
  const [productA, setProductA] = useState('tomatoes');
  const [productB, setProductB] = useState('none');
  const [fromYear, setFromYear] = useState(2021);
  const [toYear, setToYear] = useState(2025);

  const from = Math.min(fromYear, toYear);
  const to = Math.max(fromYear, toYear);

  const data = useMemo(() => {
    const rows = [];
    for (let y = from; y <= to; y++) {
      for (let m = 0; m < 12; m++) {
        const i = monthIndex(y, m);
        const row = { i, date: new Date(y, m, 1), a: PRICES[productA][i] * rate };
        if (productB !== 'none') row.b = PRICES[productB][i] * rate;
        rows.push(row);
      }
    }
    return rows;
  }, [productA, productB, from, to, rate]);

  const names = { a: t.products[productA], b: productB !== 'none' ? t.products[productB] : '' };
  const twoSeries = productB !== 'none';
  const nMonths = data.length;

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2>{t.trendTitle}</h2>
          <p className="card-desc">{t.trendDesc}</p>
        </div>
      </div>

      <div className="controls" role="group" aria-label={t.trendTitle}>
        <label>
          <span>{t.product}</span>
          <select value={productA} onChange={(e) => setProductA(e.target.value)}>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>{t.products[p.id]}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.compareWith}</span>
          <select value={productB} onChange={(e) => setProductB(e.target.value)}>
            <option value="none">{t.none}</option>
            {PRODUCTS.filter((p) => p.id !== productA).map((p) => (
              <option key={p.id} value={p.id}>{t.products[p.id]}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.from}</span>
          <select value={fromYear} onChange={(e) => setFromYear(+e.target.value)}>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label>
          <span>{t.to}</span>
          <select value={toYear} onChange={(e) => setToYear(+e.target.value)}>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>

      {twoSeries && (
        <div className="legend">
          <span className="legend-item">
            <span className="viz-chip" style={{ background: SERIES_1 }} />{names.a}
          </span>
          <span className="legend-item">
            <span className="viz-chip" style={{ background: SERIES_2 }} />{names.b}
          </span>
        </div>
      )}

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 4 }}>
            <CartesianGrid stroke="#e1e0d9" vertical={false} />
            <XAxis
              dataKey="i"
              tickFormatter={(i) => fmt.monthShort.format(data.find((d) => d.i === i)?.date ?? new Date())}
              ticks={data.filter((_, idx) => idx % Math.ceil(nMonths / 8) === 0).map((d) => d.i)}
              tick={{ fill: '#898781', fontSize: 12 }}
              axisLine={{ stroke: '#c3c2b7' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => fmt.money.format(v)}
              tick={{ fill: '#898781', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={66}
              domain={['auto', 'auto']}
            />
            <Tooltip
              content={<TrendTooltip fmt={fmt} names={names} />}
              cursor={{ stroke: '#c3c2b7', strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone" dataKey="a" stroke={SERIES_1} strokeWidth={2}
              dot={false} activeDot={{ r: 4 }} isAnimationActive={false}
            />
            {twoSeries && (
              <Line
                type="monotone" dataKey="b" stroke={SERIES_2} strokeWidth={2}
                dot={false} activeDot={{ r: 4 }} isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
