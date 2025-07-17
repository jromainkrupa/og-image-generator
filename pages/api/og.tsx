import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const logo = searchParams.get('logo') || 'https://rankfirst.so/logo.png'
  const score1 = searchParams.get('technical') || '92'
  const score2 = searchParams.get('ai') || '100'
  const score3 = searchParams.get('keywords') || '29'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '60px',
          background: '#0f172a',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <img src={logo} width="80" height="80" style={{ borderRadius: 12, marginRight: 24 }} />
          <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}>{title}</h1>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          <Score label="Technical SEO" score={score1} />
          <Score label="OpenAI Visibility" score={score2} />
          <Score label="Top Keywords" score={score3} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

function Score({ label, score }: { label: string; score: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          border: '12px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          fontWeight: 'bold',
        }}
      >
        {score}
      </div>
      <p style={{ marginTop: 16, fontSize: 28 }}>{label}</p>
    </div>
  )
}