import { NextPage } from 'next'
import Head from 'next/head'

const TestOG: NextPage = () => {
  const ogUrl = '/api/og?title=Test%20Title'

  return (
    <div>
      <Head>
        <title>Test OG Image</title>
        <meta property="og:image" content={ogUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      
      <h1>Test OG Image Generation</h1>
      <p>Check the console for any errors</p>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Direct OG Image URL:</h2>
        <a href={ogUrl} target="_blank" rel="noopener noreferrer">
          {ogUrl}
        </a>
      </div>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Preview:</h2>
        <img 
          src={ogUrl} 
          alt="OG Image Preview" 
          style={{ border: '1px solid #ccc', maxWidth: '100%' }}
          onError={(e) => {
            console.error('Image failed to load:', e)
            e.currentTarget.style.display = 'none'
            const nextElement = e.currentTarget.nextElementSibling as HTMLElement
            if (nextElement) {
              nextElement.style.display = 'block'
            }
          }}
        />
        <div style={{ display: 'none', color: 'red' }}>
          Image failed to load. Check the console for errors.
        </div>
      </div>
    </div>
  )
}

export default TestOG 