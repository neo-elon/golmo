import React, { useState } from 'react';
import { X, Feather, MapPin, Mic, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CreatorStudioModal({ isOpen, onClose, lang }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [testTitle, setTestTitle] = useState('Secret Hanok Wine Cellar');
  const [testRadius, setTestRadius] = useState(25);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <Feather size={18} color="#ff7e36" />
            <span>GOLMO Creator Studio</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Revenue share highlight */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 126, 54, 0.15), rgba(245, 158, 11, 0.08))',
            border: '1px solid rgba(255, 126, 54, 0.3)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <DollarSign size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Turn your local alleys into global passive income
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Earn <b>70%</b> on every $4.99 ~ $9.99 tour sold. No need to walk with tour groups—your audio guide works 24/7.
              </p>
            </div>
          </div>

          {/* 3 Step Workflow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
              <div style={{ color: '#ea580c', fontWeight: 800, fontSize: '0.85rem' }}>01. Map</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Drop pins on your favorite alley spots & set 25m trigger radius.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
              <div style={{ color: '#d97706', fontWeight: 800, fontSize: '0.85rem' }}>02. Voice</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Record your voice or use AI voice cloning in 12 languages.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
              <div style={{ color: '#059669', fontWeight: 800, fontSize: '0.85rem' }}>03. Earn</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Publish on the GOLMO marketplace with instant Stripe payouts.
              </p>
            </div>
          </div>

          {/* Mini Interactive Editor Demo */}
          <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#ea580c" />
              <span>Interactive Geofence Stop Editor (Preview)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Stop Title</label>
                <input
                  type="text"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="chat-input"
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                  <span>Geofence Audio Trigger Radius</span>
                  <span style={{ color: '#ff7e36', fontWeight: 700 }}>{testRadius} meters</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={testRadius}
                  onChange={(e) => setTestRadius(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '6px', accentColor: '#ff7e36' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Coordinates: 37.5801° N, 126.9685° E (Auto-detected)
                </span>
                <button
                  className="play-stop-btn"
                  onClick={() => {
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 2000);
                  }}
                  style={{ padding: '6px 14px' }}
                >
                  {isSaved ? <CheckCircle2 size={13} /> : <Feather size={13} />}
                  <span>{isSaved ? 'Stop Saved!' : 'Save Stop'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
