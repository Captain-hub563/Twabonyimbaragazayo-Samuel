import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Initialize Gemini AI client if key is provided in server environment
  const geminiApiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (geminiApiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: geminiApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      console.log('Google GenAI client initialized with GEMINI_API_KEY');
    } catch (err) {
      console.error('Error initializing GoogleGenAI:', err);
    }
  } else {
    console.log('Notice: GEMINI_API_KEY is not set. Offline agronomic fallbacks will be used.');
  }

  // Health and capabilities route
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'operational',
      appName: 'Rwanda Smart Farming',
      aiVisionConfigured: !!ai,
      hardwareGatewayReady: true,
      supportedLanguages: ['en', 'rw', 'fr'],
      timestamp: new Date().toISOString(),
    });
  });

  // Genuine AI Soil Visual Analysis Endpoint
  app.post('/api/analyze-soil', async (req, res) => {
    const { imageBase64, mimeType = 'image/jpeg', district, province, crop, soilColor, topography } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body' });
    }

    if (!ai) {
      return res.json({
        isAIConnected: false,
        message: 'AI Service Offline: GEMINI_API_KEY is not configured on the server. Falling back to RAB agronomic guidelines.',
      });
    }

    try {
      // Clean base64 prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const promptText = `
You are an expert soil scientist and agronomist at the Rwanda Agriculture and Animal Resources Development Board (RAB).
A Rwandan farmer in ${district || 'Rwanda'} (${province || 'Rwanda'}) uploaded this soil photograph for planting ${crop || 'crops'}.
Reported visible color: ${soilColor || 'unspecified'}. Field topography: ${topography || 'unspecified'}.

Carefully analyze the image and return a clear JSON response:
1. Provide 2-3 specific visual observations about this soil (color consistency, surface aggregates/crumb structure, texture appearance, visible moisture or organic residues).
2. Explicitly explain that photograph visual analysis CANNOT reliably measure soil pH, chemical Nitrogen (N), Phosphorus (P), or Potassium (K), and strongly recommend physical laboratory testing at the nearest RAB station or University lab.
3. Provide 2-3 tailored soil conditioning recommendations for ${crop || 'crops'} in ${district || 'this region'} of Rwanda (such as Travertine agricultural lime for acidic highland soils, contour terracing, organic compost incorporation).

Respond in clean JSON format matching this structure:
{
  "observations": ["observation 1", "observation 2"],
  "colorAndTextureNotes": "brief summary",
  "potentialOrganicMatter": "low | moderate | high based on visual darkness and crumb structure",
  "labTestingAdvisory": "clear explanation why photos cannot measure pH/NPK and how to test at a RAB lab",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: cleanBase64,
                },
              },
              {
                text: promptText,
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      let parsed = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = { rawText: responseText };
      }

      return res.json({
        isAIConnected: true,
        ...parsed,
      });
    } catch (error: any) {
      console.warn('Gemini soil analysis service warning:', error?.message);
      return res.json({
        isAIConnected: false,
        temporaryServiceSpike: true,
        observations: [
          `Visual characteristics recorded for ${crop || 'crops'} in ${district || 'Rwanda'}: ${soilColor || 'standard coloration'}.`,
          'Surface aggregates indicate local topsoil structure suitable for tillage.',
        ],
        colorAndTextureNotes: `Soil indicates ${soilColor || 'local'} profile under ${topography || 'hillside'} cultivation.`,
        potentialOrganicMatter: 'Moderate (Standard regional baseline)',
        labTestingAdvisory:
          'Official RAB Standard: Visual inspection cannot quantify chemical pH, Nitrogen, Phosphorus or Potassium. Physical laboratory testing is mandatory for precise chemical diagnostics.',
        recommendations: [
          'Incorporate 15–20 tonnes/ha of well-rotted farmyard manure before planting.',
          province === 'Southern' || province === 'Western'
            ? 'Apply Travertine agricultural lime (2 t/ha) to counteract highland soil acidity.'
            : 'Construct radical or progressive contour bunds to safeguard topsoil from storm runoff.',
        ],
      });
    }
  });

  // Genuine AI Plant Pathology Diagnosis Endpoint
  app.post('/api/diagnose-plant', async (req, res) => {
    const { imageBase64, mimeType = 'image/jpeg', crop, district, symptoms, affectedPart, durationDays } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body' });
    }

    if (!ai) {
      return res.json({
        isAIConnected: false,
        message: 'AI Service Offline: GEMINI_API_KEY is not configured on the server. Using verified Rwandan plant pathology standards.',
      });
    }

    try {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const symptomsList = Array.isArray(symptoms) ? symptoms.join(', ') : (symptoms || 'None reported');

      const promptText = `
You are a senior plant pathologist working with the Rwanda Agriculture and Animal Resources Development Board (RAB) Plantwise clinics.
A Rwandan farmer in ${district || 'Rwanda'} has uploaded a photo of an affected ${crop || 'crop'}.
Affected part: ${affectedPart || 'foliage'}.
Observed symptoms: ${symptomsList}.
Duration observed: ${durationDays || 3} days.

Examine the image for signs of crop diseases common in Rwanda, such as:
- Potato Late Blight (Phytophthora infestans / Imvura)
- Maize Fall Armyworm (Spodoptera frugiperda / Nkongwa)
- Banana Bacterial Wilt (Xanthomonas vasicola / Kirabiranya)
- Cassava Mosaic Disease (CMD / Ububembe)
- Coffee Berry Disease (Colletotrichum kahawae)
- Bean Anthracnose (Colletotrichum lindemuthianum)
- Tomato Bacterial Wilt or Early Blight

Provide a professional, safe diagnosis in JSON format:
{
  "probableCondition": "Disease / pest name with scientific and Kinyarwanda name if applicable",
  "confidenceScore": "High (85-95%) | Moderate (60-80%) | Preliminary",
  "symptomConfirmation": ["visual evidence seen in image 1", "visual evidence 2"],
  "safePreventionSteps": ["cultural practice 1", "cultural practice 2"],
  "approvedTreatments": ["safe treatment / bio-pesticide / copper fungicide as permitted in Rwanda"],
  "rabHelplineReferral": "Contact your Sector Agronome or call RAB Toll-Free 4675 for verified field validation."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: cleanBase64,
                },
              },
              {
                text: promptText,
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      let parsed = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = { rawText: responseText };
      }

      return res.json({
        isAIConnected: true,
        ...parsed,
      });
    } catch (error: any) {
      console.warn('Gemini plant diagnosis service warning:', error?.message);
      return res.json({
        isAIConnected: false,
        temporaryServiceSpike: true,
        probableCondition: 'Agronomic Pathology Reference Standard',
        symptomConfirmation: Array.isArray(symptoms) ? symptoms : [symptoms || 'Observed leaf symptoms'],
        safePreventionSteps: [
          'Sanitize all pruning tools with fire or bleach solution before trimming adjacent bushes.',
          'Rogue and safely burn severely infected crop residue away from the field.',
        ],
        approvedTreatments: [
          'Consult your Sector Agronome or visit a RAB Plantwise clinic for certified treatment.',
        ],
        rabHelplineReferral: 'Contact your Sector Agronome or call RAB Toll-Free 4675.',
      });
    }
  });

  // Mount Vite or static server
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rwanda Smart Farming full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
