import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

function getColor(score: number): string {
  if (score >= 80) return '#10B981' // green
  if (score >= 60) return '#3B82F6' // blue
  if (score >= 40) return '#F59E0B' // yellow
  if (score >= 20) return '#F97316' // orange
  return '#EF4444' // red
}

function getLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score >= 20) return 'Poor'
  return 'Very Poor'
}

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const logo = searchParams.get('logo') || ''
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
          padding: 60,
          background: 'linear-gradient(to bottom right, #2B7FFF, #1E3A8A)',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          {logo && (
            <div
              style={{
                backgroundColor: '#fff',
                padding: 8,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={logo} width={64} height={64} style={{ borderRadius: 8 }} />
            </div>
          )}
          <div style={{ fontSize: 48, fontWeight: 700, marginLeft: 24 }}>{title}</div>
        </div>

        {/* Scores Row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {[{ label: 'Technical', score: technical }, { label: 'AI Visibility', score: ai }, { label: 'Top Keywords', score: keywords }].map(({ label, score }) => {
            const borderColor = getColor(score)
            const textColor = borderColor
            return (
              <div
                key={label}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: 32,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `8px solid ${borderColor}`,
                  }}
                >
                  {score}%
                </div>
                <div style={{ marginTop: 12, fontSize: 24 }}>{label}</div>
                <div style={{ marginTop: 4, fontSize: 16, color: textColor }}>{getLabel(score)}</div>
              </div>
            )
          })}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}