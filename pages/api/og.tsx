import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

function getColor(score: number | null): string {
  if (score === null || score === undefined) return "#EF4444";
  if (score >= 0.8) return "#10B981"; // Green
  if (score >= 0.6) return "#3B82F6"; // Blue
  if (score >= 0.4) return "#F59E0B"; // Yellow
  if (score >= 0.2) return "#F97316"; // Orange
  return "#EF4444"; // Red
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const logo = searchParams.get('logo')
  const technical = parseInt(searchParams.get('technical') || '0', 10)
  const ai = parseInt(searchParams.get('ai') || '0', 10)
  const keywords = parseInt(searchParams.get('keywords') || '0', 10)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          justifyContent: 'space-between',
          background: `
          radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent),
          linear-gradient(to bottom right, #1D4ED8, #1E40AF)
        `,    
         color: 'white',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              width={80}
              height={80}
              style={{ borderRadius: 16, background: 'white', padding: 8 }}
            />
          )}
          <h1 style={{ fontSize: 54 }}>{title}</h1>
        </div>

        {/* Scores */}
        <div style={{ display: 'flex', gap: '60px', marginTop: '40px' }}>
          {[{ label: "Technical SEO", score: technical },
            { label: "OpenAI Visibility", score: ai },
            { label: "Top 10 Keywords", score: keywords }]
            .map(({ label, score }) => (
              <div
                key={label}
                style={{
                  width: 240,
                  height: 240,
                  borderRadius: 120,
                  border: `12px solid ${getColor(score / 100)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 32,
                  fontWeight: 'bold',
                  background: 'white',
                  color: '#111'
                }}
              >
                <div>{score} <span style={{ fontSize: 16, color: '' }}>/100</span></div>
                <div style={{ fontSize: 20, marginTop: 8 }}>{label}</div>
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