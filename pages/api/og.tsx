import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

function getColor(score: number): string {
  if (score >= 80) return '#10B981'
  if (score >= 60) return '#3B82F6'
  if (score >= 40) return '#F59E0B'
  if (score >= 20) return '#F97316'
  return '#EF4444'
}

function getLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score >= 20) return 'Poor'
  return 'Very Poor'
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') || 'AI SEO Audit'
  const logo = searchParams.get('logo') || ''
  const technical = parseInt(searchParams.get('technical') || '0', 10)
  const ai = parseInt(searchParams.get('ai') || '0', 10)
  const keywords = parseInt(searchParams.get('keywords') || '0', 10)

  // Load Poppins font
  const poppinsFont = await loadGoogleFont('Poppins:wght@400;500;600;700;800;900', title)

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 50%, #3B82F6 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: 80,
          color: '#1F2937',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            opacity: 0.2,
            display: 'flex',
          }}
        />

        {/* Title Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 60,
            gap: 24,
          }}
        >
          {/* Logo */}
          {logo && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: '#ffffff',
                padding: 16,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={logo}
                width={48}
                height={48}
                style={{
                  display: 'flex',
                  borderRadius: 8,
                }}
              />
            </div>
          )}

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                fontFamily: 'Poppins',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                marginBottom: 8,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#E0E7FF',
                fontFamily: 'Poppins',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              SEO Performance Analysis by rankfirst.so
            </div>
          </div>
        </div>

        {/* Scores Grid */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Score label="Technical" score={technical} color={getColor(technical)} />
          <Score label="AI Visibility" score={ai} color={getColor(ai)} />
          <Score label="Top Keywords" score={keywords} color={getColor(keywords)} />
        </div>
      </div>
    ),
    { 
      width: 1200, 
      height: 630,
      fonts: [
        {
          name: 'Poppins',
          data: poppinsFont,
          style: 'normal',
        },
      ],
    }
  )
}

function Score({
  label,
  score,
  color,
}: {
  label: string
  score: number
  color: string
}) {
  const radius = 70
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - progress

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        border: `3px solid ${color}30`,
        minWidth: 220,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 160,
          height: 160,
          position: 'relative',
          marginBottom: 20,
        }}
      >
        {/* Background circle */}
        <svg
          width={160}
          height={160}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <circle
            cx={80}
            cy={80}
            r={radius}
            fill="none"
            stroke={`${color}20`}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={80}
            cy={80}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        </svg>
        
        {/* Score text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: 42,
            fontWeight: 900,
            fontFamily: 'Poppins',
            zIndex: 1,
          }}
        >
          {score}%
        </div>
      </div>
      
      <div 
        style={{ 
          fontSize: 24, 
          fontWeight: 700,
          color: '#1F2937',
          fontFamily: 'Poppins',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
      
      <div 
        style={{ 
          fontSize: 16, 
          fontWeight: 800, 
          color: color,
          fontFamily: 'Poppins',
          padding: '8px 20px',
          backgroundColor: `${color}15`,
          borderRadius: 16,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {getLabel(score)}
      </div>
    </div>
  )
}