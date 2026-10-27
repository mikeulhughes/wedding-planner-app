import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDirectory = path.join(__dirname, '..', 'data');

fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(path.join(dbDirectory, 'wedding.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS weddings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    name TEXT DEFAULT 'My Wedding',
    date TEXT,
    style TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS venues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    guests INTEGER NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    guest_group TEXT NOT NULL,
    rsvp TEXT NOT NULL,
    meal TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    vendor_type TEXT NOT NULL,
    package_name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS decorations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

export { db };

export function createUser({ name, email, passwordHash }) {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
  `);

  const info = stmt.run(name, email.toLowerCase(), passwordHash);

  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(info.lastInsertRowid);

  db.prepare(`
    INSERT INTO weddings (user_id, name, date, style, notes)
    VALUES (?, 'My Wedding', '', '', '')
  `).run(user.id);

  return user;
}

export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
}

export function getUserById(id) {
  return db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(id);
}

export function getWeddingByUserId(userId) {
  return db.prepare('SELECT * FROM weddings WHERE user_id = ?').get(userId);
}

export function upsertWedding(userId, weddingData) {
  const existing = getWeddingByUserId(userId);
  const { name = 'My Wedding', date = '', style = '', notes = '' } = weddingData;

  if (existing) {
    db.prepare(`
      UPDATE weddings
      SET name = ?, date = ?, style = ?, notes = ?
      WHERE user_id = ?
    `).run(name, date, style, notes, userId);
  } else {
    db.prepare(`
      INSERT INTO weddings (user_id, name, date, style, notes)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, name, date, style, notes);
  }

  return db.prepare('SELECT * FROM weddings WHERE user_id = ?').get(userId);
}

export function getVenuesByUser(userId) {
  return db.prepare('SELECT * FROM venues WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addVenue(userId, { name, category, location, guests, price, description }) {
  const result = db.prepare(`
    INSERT INTO venues (user_id, name, category, location, guests, price, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, name, category, location, Number(guests), price, description);

  return db.prepare('SELECT * FROM venues WHERE id = ?').get(result.lastInsertRowid);
}

export function updateVenue(id, userId, data) {
  db.prepare(`
    UPDATE venues
    SET name = ?, category = ?, location = ?, guests = ?, price = ?, description = ?
    WHERE id = ? AND user_id = ?
  `).run(data.name, data.category, data.location, Number(data.guests), data.price, data.description, id, userId);

  return db.prepare('SELECT * FROM venues WHERE id = ? AND user_id = ?').get(id, userId);
}

export function deleteVenue(id, userId) {
  return db.prepare('DELETE FROM venues WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
}

export function getGuestsByUser(userId) {
  return db.prepare('SELECT * FROM guests WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addGuest(userId, guestData) {
  const { name, guest_group, rsvp, meal } = guestData;
  const result = db.prepare(`
    INSERT INTO guests (user_id, name, guest_group, rsvp, meal)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId, name, guest_group, rsvp, meal);

  return db.prepare('SELECT * FROM guests WHERE id = ?').get(result.lastInsertRowid);
}

export function updateGuest(id, userId, guestData) {
  const { name, guest_group, rsvp, meal } = guestData;
  db.prepare(`
    UPDATE guests
    SET name = ?, guest_group = ?, rsvp = ?, meal = ?
    WHERE id = ? AND user_id = ?
  `).run(name, guest_group, rsvp, meal, id, userId);

  return db.prepare('SELECT * FROM guests WHERE id = ? AND user_id = ?').get(id, userId);
}

export function deleteGuest(id, userId) {
  return db.prepare('DELETE FROM guests WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
}

export function getVendorsByUser(userId) {
  return db.prepare('SELECT * FROM vendors WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addVendor(userId, data) {
  const { name, vendor_type, package_name, price, description } = data;
  const result = db.prepare(`
    INSERT INTO vendors (user_id, name, vendor_type, package_name, price, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, name, vendor_type, package_name, price, description);

  return db.prepare('SELECT * FROM vendors WHERE id = ?').get(result.lastInsertRowid);
}

export function updateVendor(id, userId, data) {
  const { name, vendor_type, package_name, price, description } = data;
  db.prepare(`
    UPDATE vendors
    SET name = ?, vendor_type = ?, package_name = ?, price = ?, description = ?
    WHERE id = ? AND user_id = ?
  `).run(name, vendor_type, package_name, price, description, id, userId);

  return db.prepare('SELECT * FROM vendors WHERE id = ? AND user_id = ?').get(id, userId);
}

export function deleteVendor(id, userId) {
  return db.prepare('DELETE FROM vendors WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
}

export function getDecorationsByUser(userId) {
  return db.prepare('SELECT * FROM decorations WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addDecoration(userId, data) {
  const { title, notes } = data;
  const result = db.prepare(`
    INSERT INTO decorations (user_id, title, notes)
    VALUES (?, ?, ?)
  `).run(userId, title, notes || '');

  return db.prepare('SELECT * FROM decorations WHERE id = ?').get(result.lastInsertRowid);
}

export function updateDecoration(id, userId, data) {
  const { title, notes } = data;
  db.prepare(`
    UPDATE decorations
    SET title = ?, notes = ?
    WHERE id = ? AND user_id = ?
  `).run(title, notes || '', id, userId);

  return db.prepare('SELECT * FROM decorations WHERE id = ? AND user_id = ?').get(id, userId);
}

export function deleteDecoration(id, userId) {
  return db.prepare('DELETE FROM decorations WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
}
