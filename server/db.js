* {
  box-sizing: border-box;
}

:root {
  --bg: #fffaf9;
  --panel: #ffffff;
  --panel-soft: #fff5f4;
  --border: #f0d7d4;
  --text: #2c1f22;
  --muted: #6b5458;
  --rose: #d57b7b;
  --rose-deep: #b55d59;
  --blush: #f8d9d5;
  --sage: #e0e8df;
  --gold: #ebd7a4;
  --danger: #b6494b;
  --success: #2d7d4f;
  --shadow: 0 22px 60px rgba(82, 48, 58, 0.08);
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #fffaf9 0%, #fff7f5 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
}

p {
  margin: 0;
}

.app-shell {
  max-width: 1260px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0 1.4rem;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-mark {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  font-weight: 700;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--rose), #efb39f);
  color: white;
  box-shadow: var(--shadow);
}

.eyebrow {
  margin-bottom: 0.25rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rose-deep);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-indicator {
  font-weight: 600;
  color: var(--muted);
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.8rem 0 1.25rem;
  border-bottom: 1px solid var(--border);
}

.nav-link {
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav-link.active {
  background: var(--panel-soft);
  border: 1px solid var(--border);
  color: var(--text);
}

.content-wrap {
  padding-top: 1.5rem;
}

.content-area {
  display: grid;
  gap: 1.2rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.page-header h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.2rem 1rem;
  border-radius: 20px;
  background: white;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.stat-card span {
  color: var(--muted);
  font-weight: 600;
}

.stat-card strong {
  font-size: 2.1rem;
}

.accent-one { background: linear-gradient(180deg, #fff 0%, #fff3f1 100%); }
.accent-two { background: linear-gradient(180deg, #fff 0%, #edf7ef 100%); }
.accent-three { background: linear-gradient(180deg, #fff 0%, #fffaf0 100%); }
.accent-four { background: linear-gradient(180deg, #fff 0%, #f3f0ff 100%); }

.panel-grid {
  display: grid;
  gap: 1.1rem;
}

.two-column {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.panel {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  padding: 1.4rem;
}

.panel h2 {
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.stacked-form {
  display: grid;
  gap: 1rem;
}

.stacked-form label {
  display: grid;
  gap: 0.45rem;
  font-weight: 600;
  color: var(--muted);
}

.stacked-form input,
.stacked-form textarea,
.stacked-form select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.8rem 0.9rem;
  background: white;
  color: var(--text);
}

textarea {
  resize: vertical;
}

.primary-btn,
.soft-btn,
.danger-btn {
  border-radius: 999px;
  border: none;
  padding: 0.8rem 1.1rem;
  font-weight: 700;
}

.primary-btn {
  background: linear-gradient(135deg, var(--rose), var(--rose-deep));
  color: white;
}

.soft-btn {
  background: #f7efef;
  color: var(--text);
  border: 1px solid var(--border);
}

.danger-btn {
  background: #fee9e9;
  color: var(--danger);
  border: 1px solid #f3d4d4;
}

.card-list {
  display: grid;
  gap: 0.9rem;
}

.record-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, #fff 0%, #fff9f8 100%);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.record-card p {
  color: var(--muted);
  line-height: 1.55;
}

.inline-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  color: var(--muted);
  font-weight: 600;
}

.badge {
  padding: 0.34rem 0.6rem;
  border-radius: 999px;
  background: #fef1f0;
  color: var(--rose-deep);
  font-size: 0.74rem;
  font-weight: 700;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 0.2rem;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-confirmed {
  background: #e7f7ec;
  color: var(--success);
}

.status-pending {
  background: #fff6e0;
  color: #9b6b00;
}

.status-declined {
  background: #fde8e8;
  color: var(--danger);
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.detail-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--border);
}

.detail-list span {
  color: var(--muted);
}

.auth-shell {
  min-height: 70vh;
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(100%, 480px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  border-radius: 28px;
  padding: 2rem;
}

.auth-card h1 {
  margin-bottom: 1rem;
  font-size: 2.25rem;
}

.auth-switch {
  margin-top: 1rem;
  text-align: center;
  color: var(--muted);
}

.auth-switch a {
  color: var(--rose-deep);
  font-weight: 700;
}

.error-text,
.info-text {
  font-weight: 600;
  color: var(--danger);
}

.info-text {
  color: var(--success);
}

@media (max-width: 860px) {
  .two-column,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 540px) {
  .app-shell {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .main-nav {
    overflow-x: auto;
    white-space: nowrap;
  }
}
