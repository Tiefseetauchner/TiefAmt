export default function Home() {
  const pages = [
    { href: '/base', label: 'Base (no preset)', description: 'govamt.css only — no national identity' },
    { href: '/austria', label: 'Austria', description: 'Pantone 186 C red, warm serif, Republik Österreich' },
    { href: '/eu', label: 'European Union', description: 'Pantone 286 C blue, Pantone 116 C gold accent' },
    { href: '/neutral', label: 'Neutral', description: 'Desaturated government navy, system font stack' },
  ]

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>TiefAmt</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        React UI component library — government/bureaucratic aesthetic
      </p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pages.map(({ href, label, description }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  border: '2px solid #c8c8c8',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{label}</strong>
                <span style={{ fontSize: '0.875rem', color: '#555' }}>{description}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
