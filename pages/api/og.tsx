import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

function getColor(score: number): string {
  if (score >= 80) return "#10B981" // Green
  if (score >= 60) return "#3B82F6" // Blue
  if (score >= 40) return "#F59E0B" // Yellow
  if (score >= 20) return "#F97316" // Orange
  return "#EF4444" // Red
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const technical = parseInt(searchParams.get('technical') || '0', 10)
  const ai = parseInt(searchParams.get('ai') || '0', 10)
  const keywords = parseInt(searchParams.get('keywords') || '0', 10)

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1e3a8a',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 60,
        }}
      >
        <h1 style={{ fontSize: 60, marginBottom: 40 }}>{title}</h1>

        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { label: 'Technical SEO', score: technical },
            { label: 'AI Visibility', score: ai },
            { label: 'Keyword Rank', score: keywords },
          ].map(({ label, score }) => (
            <div
              key={label}
              style={{
                background: 'white',
                color: '#111',
                borderRadius: 20,
                padding: '40px 32px',
                width: 280,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: `6px solid ${getColor(score)}`,
              }}
            >
              <div style={{ fontSize: 50, fontWeight: 700 }}>{score}/100</div>
              <div style={{ fontSize: 20, fontWeight: 500, marginTop: 12 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}