import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const logo = searchParams.get('logo')
  const technical = searchParams.get('technical') || '0'
  const ai = searchParams.get('ai') || '0'
  const keywords = searchParams.get('keywords') || '0'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#1E3A8A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          gap: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              width={72}
              height={72}
              style={{ backgroundColor: '#fff', borderRadius: 12 }}
            />
          )}
          <h1 style={{ fontSize: 48, margin: 0 }}>{title}</h1>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          {[['Technical SEO', technical], ['AI Visibility', ai], ['Top Keywords', keywords]].map(
            ([label, value]) => (
              <div
                key={label}
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  color: '#111',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                }}
              >
                <div style={{ fontSize: 32 }}>{value}%</div>
                <div style={{ fontSize: 16, marginTop: 8 }}>{label}</div>
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}