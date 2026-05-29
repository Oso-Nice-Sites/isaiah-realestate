import { useState, useMemo } from 'react';

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function MortgageCalc({ initialPrice = 500000, initialDown = 20, standalone = false }) {
  const [price, setPrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(initialDown);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);

  const results = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const monthly_r = rate / 100 / 12;
    const n = term * 12;
    const monthlyP_I =
      monthly_r === 0
        ? principal / n
        : (principal * (monthly_r * Math.pow(1 + monthly_r, n))) /
          (Math.pow(1 + monthly_r, n) - 1);
    const estTax = (price * 0.012) / 12;
    const estInsurance = (price * 0.005) / 12;
    const total = monthlyP_I + estTax + estInsurance;
    const totalInterest = monthlyP_I * n - principal;
    return {
      principal: Math.round(principal),
      monthlyPI: Math.round(monthlyP_I),
      estTax: Math.round(estTax),
      estInsurance: Math.round(estInsurance),
      total: Math.round(total),
      totalInterest: Math.round(totalInterest),
      downAmount: Math.round(price * downPct / 100),
    };
  }, [price, downPct, rate, term]);

  const inputStyle = {
    padding: '11px 14px',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    background: 'var(--white)',
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
  };

  return (
    <div style={{ background: standalone ? 'var(--cream)' : 'transparent' }}>
      {standalone && (
        <>
          <p className="section-subtitle">Tools</p>
          <h2 className="section-title">Mortgage Calculator</h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--text-muted)', maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
            Estimate your monthly payment with the inputs below. This is for illustrative purposes — connect with a licensed lender for a formal quote.
          </p>
        </>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: standalone ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Home Price ($)</label>
              <input
                type="number"
                value={price}
                min={50000}
                max={10000000}
                step={5000}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label>Down Payment (%)</label>
              <input
                type="number"
                value={downPct}
                min={3}
                max={99}
                step={1}
                onChange={(e) => setDownPct(Number(e.target.value))}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                min={1}
                max={20}
                step={0.125}
                onChange={(e) => setRate(Number(e.target.value))}
                style={inputStyle}
              />
            </div>
            <div className="form-group">
              <label>Loan Term</label>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                style={inputStyle}
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>

          {/* Rate slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Rate: {rate.toFixed(3)}%</span>
              <span>Down: {fmt(results.downAmount)}</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={0.125}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--forest)' }}
            />
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            background: 'var(--forest)',
            color: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 28px 24px',
          }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 8 }}>
            Estimated Monthly Payment
          </p>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            {fmt(results.total)}
            <span style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)', marginLeft: 6 }}>/mo</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 20 }}>
            {[
              { l: 'Principal & Interest', v: fmt(results.monthlyPI) },
              { l: 'Est. Property Tax', v: fmt(results.estTax) },
              { l: 'Est. Home Insurance', v: fmt(results.estInsurance) },
            ].map((row) => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{row.l}</span>
                <span style={{ fontWeight: 500 }}>{row.v}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { l: 'Loan Amount', v: fmt(results.principal) },
              { l: 'Total Interest Paid', v: fmt(results.totalInterest) },
            ].map((row) => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{row.l}</span>
                <span style={{ color: 'var(--gold-light)' }}>{row.v}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: 20, lineHeight: 1.5 }}>
            Estimates only. Actual payments vary by lender, credit score, and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
