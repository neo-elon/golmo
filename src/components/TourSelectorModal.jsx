import React from 'react';
import { X, Star, Clock, Footprints, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { TOURS } from '../data/toursData';

export default function TourSelectorModal({
  isOpen,
  onClose,
  activeTourId,
  onSelectTour,
  lang
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <span>{lang === 'kr' ? '서울 골목 오디오 투어 컬렉션' : 'Seoul Alleyway Audio Tours'}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {TOURS.map((tour) => {
              const isSelected = tour.id === activeTourId;
              const isAvailable = tour.stops && tour.stops.length > 0;

              return (
                <div
                  key={tour.id}
                  style={{
                    background: isSelected ? 'rgba(234, 88, 12, 0.06)' : '#f8fafc',
                    border: `1px solid ${isSelected ? 'var(--accent-amber)' : 'rgba(15, 23, 42, 0.08)'}`,
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    cursor: isAvailable ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 16px rgba(234, 88, 12, 0.12)' : 'none'
                  }}
                  onClick={() => isAvailable && onSelectTour(tour)}
                >
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                          {tour.district}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706' }}>
                          ${tour.price}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '3px' }}>
                        {lang === 'kr' ? tour.titleKr : tour.title}
                      </h3>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                        {lang === 'kr' ? tour.taglineKr : tour.tagline}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={12} color="#d97706" fill="#d97706" />
                          <b>{tour.rating}</b> ({tour.reviewsCount})
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} />
                          {tour.durationMinutes} mins
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Footprints size={12} />
                          {tour.distanceKm} km
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Creator info snippet */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(15, 23, 42, 0.06)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={tour.creator.avatar}
                        alt={tour.creator.name}
                        style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Guided by <b>{tour.creator.name}</b> ({tour.creator.role})
                      </span>
                    </div>

                    {isSelected ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', color: '#10b981', fontWeight: 700 }}>
                        <Check size={14} /> Active Tour
                      </span>
                    ) : isAvailable ? (
                      <button className="play-stop-btn" style={{ padding: '4px 12px', fontSize: '0.72rem' }}>
                        <span>Explore</span>
                        <ArrowRight size={12} />
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                        Launching Soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.08)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <ShieldCheck size={20} color="#10b981" />
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              <b style={{ color: '#fff' }}>GOLMO Creator Guarantee:</b> 70% of tour purchases go directly to local independent guides and story archivists.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
