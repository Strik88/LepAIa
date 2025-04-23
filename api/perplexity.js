// api/perplexity.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Forward the request to Perplexity API
    const PERPLEXITY_API_KEY = "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";
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
} 