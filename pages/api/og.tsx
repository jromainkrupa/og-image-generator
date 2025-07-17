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

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 20) return "Poor";
  return "Very Poor";
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
          padding: '80px',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
          color: 'white',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(40px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            filter: 'blur(30px)'
          }}
        />

        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          {logo && (
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.95)',
                padding: 12,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <img
                src={logo}
                alt="Logo"
                width={64}
                height={64}
                style={{ borderRadius: 12 }}
              />
            </div>
          )}
          <div>
            <h1 style={{ 
              fontSize: 56, 
              fontWeight: '700',
              margin: 0,
              lineHeight: 1.1,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              letterSpacing: '-0.02em'
            }}>
              {title}
            </h1>
            <div style={{
              fontSize: 20,
              opacity: 0.9,
              marginTop: 8,
              fontWeight: '400'
            }}>
              Comprehensive SEO Analysis Report
            </div>
          </div>
        </div>

        {/* Scores */}
        <div style={{ 
          display: 'flex', 
          gap: '40px', 
          marginTop: '60px',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            { label: "Technical SEO", score: technical, icon: "⚙️" },
            { label: "AI Visibility", score: ai, icon: "🤖" },
            { label: "Keyword Ranking", score: keywords, icon: "🎯" }
          ].map(({ label, score, icon }) => (
            <div
              key={label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: `8px solid ${getColor(score / 100)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1f2937',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: 14,
                  position: 'absolute',
                  top: '16px',
                  opacity: 0.7
                }}>
                  {icon}
                </div>
                <div style={{
                  fontSize: 48,
                  fontWeight: '700',
                  lineHeight: 1,
                  color: getColor(score / 100)
                }}>
                  {score}
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: '500',
                  opacity: 0.6,
                  marginTop: 4
                }}>
                  /100
                </div>
                <div style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginTop: 8,
                  textAlign: 'center',
                  lineHeight: 1.2
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: getColor(score / 100),
                  marginTop: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {getScoreLabel(score)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '40px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            fontSize: 16,
            opacity: 0.8,
            fontWeight: '500'
          }}>
            Generated with AI-Powered SEO Tools
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}