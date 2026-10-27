import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  addDecoration,
  addGuest,
  addVenue,
  addVendor,
  createUser,
  deleteDecoration,
  deleteGuest,
  deleteVenue,
  deleteVendor,
  getDecorationsByUser,
  getGuestsByUser,
  getUserByEmail,
  getUserById,
  getVenuesByUser,
  getVendorsByUser,
  getWeddingByUserId,
  updateDecoration,
  updateGuest,
  updateVenue,
  updateVendor,
  upsertWedding
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token.' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = getUserById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid.' });
  }
}

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = getUserByEmail(email);

  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ name, email, passwordHash });
  const token = signToken(user);

  return res.status(201).json({ user, token });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const safeUser = { id: user.id, name: user.name, email: user.email };
  const token = signToken(safeUser);

  return res.json({ user: safeUser, token });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  const wedding = getWeddingByUserId(req.user.id);
  const counts = {
    venues: getVenuesByUser(req.user.id).length,
    guests: getGuestsByUser(req.user.id).length,
    vendors: getVendorsByUser(req.user.id).length,
    decorations: getDecorationsByUser(req.user.id).length
  };

  return res.json({ wedding, counts });
});

app.put('/api/wedding', authMiddleware, (req, res) => {
  const wedding = upsertWedding(req.user.id, req.body || {});
  return res.json({ wedding });
});

app.get('/api/venues', authMiddleware, (req, res) => {
  return res.json(getVenuesByUser(req.user.id));
});

app.post('/api/venues', authMiddleware, (req, res) => {
  const venue = addVenue(req.user.id, req.body || {});
  return res.status(201).json(venue);
});

app.put('/api/venues/:id', authMiddleware, (req, res) => {
  const venue = updateVenue(Number(req.params.id), req.user.id, req.body || {});
  if (!venue) {
    return res.status(404).json({ message: 'Venue not found.' });
  }

  return res.json(venue);
});

app.delete('/api/venues/:id', authMiddleware, (req, res) => {
  const deleted = deleteVenue(Number(req.params.id), req.user.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Venue not found.' });
  }

  return res.status(204).send();
});

app.get('/api/guests', authMiddleware, (req, res) => {
  return res.json(getGuestsByUser(req.user.id));
});

app.post('/api/guests', authMiddleware, (req, res) => {
  const guest = addGuest(req.user.id, req.body || {});
  return res.status(201).json(guest);
});

app.put('/api/guests/:id', authMiddleware, (req, res) => {
  const guest = updateGuest(Number(req.params.id), req.user.id, req.body || {});
  if (!guest) {
    return res.status(404).json({ message: 'Guest not found.' });
  }

  return res.json(guest);
});

app.delete('/api/guests/:id', authMiddleware, (req, res) => {
  const deleted = deleteGuest(Number(req.params.id), req.user.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Guest not found.' });
  }

  return res.status(204).send();
});

app.get('/api/vendors', authMiddleware, (req, res) => {
  return res.json(getVendorsByUser(req.user.id));
});

app.post('/api/vendors', authMiddleware, (req, res) => {
  const vendor = addVendor(req.user.id, req.body || {});
  return res.status(201).json(vendor);
});

app.put('/api/vendors/:id', authMiddleware, (req, res) => {
  const vendor = updateVendor(Number(req.params.id), req.user.id, req.body || {});
  if (!vendor) {
    return res.status(404).json({ message: 'Vendor not found.' });
  }

  return res.json(vendor);
});

app.delete('/api/vendors/:id', authMiddleware, (req, res) => {
  const deleted = deleteVendor(Number(req.params.id), req.user.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Vendor not found.' });
  }

  return res.status(204).send();
});

app.get('/api/decorations', authMiddleware, (req, res) => {
  return res.json(getDecorationsByUser(req.user.id));
});

app.post('/api/decorations', authMiddleware, (req, res) => {
  const decoration = addDecoration(req.user.id, req.body || {});
  return res.status(201).json(decoration);
});

app.put('/api/decorations/:id', authMiddleware, (req, res) => {
  const decoration = updateDecoration(Number(req.params.id), req.user.id, req.body || {});
  if (!decoration) {
    return res.status(404).json({ message: 'Decoration idea not found.' });
  }

  return res.json(decoration);
});

app.delete('/api/decorations/:id', authMiddleware, (req, res) => {
  const deleted = deleteDecoration(Number(req.params.id), req.user.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Decoration idea not found.' });
  }

  return res.status(204).send();
});

const distPath = path.join(__dirname, '..', 'dist');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
