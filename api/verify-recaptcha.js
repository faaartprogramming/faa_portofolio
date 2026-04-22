// api/verify-recaptcha.js
export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ 
      success: false, 
      error: 'Token missing' 
    });
  }

  // Ambil secret key dari environment variable Vercel
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not set in environment');
    return res.status(500).json({ 
      success: false, 
      error: 'Server configuration error' 
    });
  }

  try {
    // Verifikasi ke Google
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ 
        success: true, 
        score: data.score 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: 'reCAPTCHA verification failed',
        details: data['error-codes'] 
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}