// api/perplexity.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    console.log('Received request to Perplexity proxy');
    
    // Forward the request to Perplexity API
    const PERPLEXITY_API_KEY = "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";
    
    console.log('Sending request to Perplexity API');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    console.log('Received response from Perplexity API:', response.status);
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Perplexity API error: ${response.status}`,
        details: errorText
      });
    }
    
    // Get the response data
    const data = await response.json();
    console.log('Successfully parsed response data');
    
    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack
    });
  }
} 