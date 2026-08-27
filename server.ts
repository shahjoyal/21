import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

import { connectDB } from './server/config/db.js';
import { seedAdmin } from './server/seed/adminSeed.js';
import authRoutes from './server/routes/authRoutes.js';
import productRoutes from './server/routes/productRoutes.js';
import orderRoutes from './server/routes/orderRoutes.js';
import paymentRoutes from './server/routes/paymentRoutes.js';
import settingsRoutes from './server/routes/settingsRoutes.js';
import Product from './server/models/Product.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: '२१ कळ्या Modak & Workshop Studio API',
    motto: 'स्वादः परमानन्दः',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', settingsRoutes); // exposes /api/settings and /api/slots

// -------------------------------------------------------------
// OPTIONAL: Helper AI Concierge (Gemini) — unrelated to store/auth backend.
// Works only if GEMINI_API_KEY is configured; otherwise falls back to a
// simple canned response so the chat widget never breaks.
// -------------------------------------------------------------

let genAIClient: InstanceType<typeof GoogleGenAI> | null = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

const HELPER_SYSTEM_INSTRUCTION = `You are "Helper", the warm, expert, and delightful AI Culinary Concierge for "२१ कळ्या Modak & Culinary Studio" (Motto: "स्वादः परमानन्दः"). You have deep knowledge of Maharashtrian culinary traditions, particularly the royal craft of 21-pleated (२१ कळ्या) Ukadiche Modaks. Speak in English and Marathi as appropriate, keep answers concise and friendly.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage, modelChoice } = req.body;

    let messageList: Array<{ role: string; content: string }> = [];
    if (Array.isArray(messages) && messages.length > 0) {
      messageList = messages;
    } else if (userMessage) {
      messageList = [{ role: 'user', content: userMessage }];
    }

    if (messageList.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    let selectedModel = 'gemini-2.5-flash';
    if (modelChoice === 'pro') selectedModel = 'gemini-2.5-pro';

    const products = await Product.find().limit(50);
    const productSummary = products
      .map((p) => `- ${p.name}: ${p.tagline} Prices: ${p.priceTiers.map((t) => `${t.label} ₹${t.price}`).join(', ')}`)
      .join('\n');

    const dynamicInstruction = `${HELPER_SYSTEM_INSTRUCTION}\n\nCurrent Menu:\n${productSummary}`;

    const gemini = getGeminiClient();
    if (!gemini) {
      return res.json({
        reply:
          'नमस्कार! I am Helper, your culinary assistant at २१ कळ्या Modak Studio. I can help with our 21-pleated Ukadiche Modaks, masterclasses, and orders. How may I assist you today?',
        model: 'offline-assist',
        role: 'assistant',
      });
    }

    const contents = messageList.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await gemini.models.generateContent({
      model: selectedModel,
      contents,
      config: { systemInstruction: dynamicInstruction, temperature: 0.7, topP: 0.95 },
    });

    res.json({ reply: response.text || 'I am ready to help with our modaks and masterclasses.', model: selectedModel, role: 'assistant' });
  } catch (error: any) {
    console.error('Error in Helper /api/chat:', error);
    res.status(500).json({ error: 'Failed to generate AI response', details: error?.message || String(error) });
  }
});

// -------------------------------------------------------------
// VITE INTEGRATION & PRODUCTION ASSET SERVING
// -------------------------------------------------------------

async function startServer() {
  await connectDB();
  await seedAdmin().catch((err) => console.error('Admin seed error:', err));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌺 २१ कळ्या Modak & Workshop Studio Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
