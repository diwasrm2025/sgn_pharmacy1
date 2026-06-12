import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

const articles = [
  { id: 1, category: 'Nutrition', title: 'What Is a Calorie Deficit? A Beginner\'s Guide', excerpt: 'Understanding how calorie deficits work can help you make better dietary decisions and achieve your weight goals effectively.', readTime: '5 min read', date: 'Jun 8, 2026', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', tag: 'NEW' },
  { id: 2, category: 'Monsoon Health', title: 'Staying Safe from Water-Borne Diseases This Season', excerpt: 'Monsoon brings relief from heat but also risks of dengue, malaria, and typhoid. Here\'s how to protect your family.', readTime: '7 min read', date: 'Jun 6, 2026', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tag: 'TRENDING' },
  { id: 3, category: 'Fitness', title: 'Safety for Babies with High Fever: What Parents Need to Know', excerpt: 'When your baby has a fever, it can be frightening. This guide explains warning signs and when to call your doctor.', readTime: '6 min read', date: 'Jun 5, 2026', img: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=600&q=80', tag: null },
  { id: 4, category: 'Women Health', title: 'Sending a Child to School with Cough, Cold, or Flu', excerpt: 'A common dilemma every parent faces — here are the guidelines to help you decide wisely.', readTime: '4 min read', date: 'Jun 3, 2026', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', tag: null },
  { id: 5, category: 'Diabetes', title: 'Baby Exam Bottle Guide — A Step-by-Step Tutorial', excerpt: 'Switching from breast to bottle can be stressful. This step-by-step guide will make the transition smooth.', readTime: '8 min read', date: 'Jun 1, 2026', img: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80', tag: null },
  { id: 6, category: 'Oral Care', title: 'Oral Thrush in Children: Causes and Home Remedies', excerpt: 'White patches in your child\'s mouth can indicate oral thrush. Learn the causes, prevention, and treatment options.', readTime: '5 min read', date: 'May 30, 2026', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80', tag: null },
];

const categories = ['All', 'Nutrition', 'Monsoon Health', 'Fitness', 'Women Health', 'Diabetes', 'Oral Care'];

const HealthBlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <div className="App">
      <SiteHeader searchQuery="" setSearchQuery={() => {}} onSearchSubmit={() => {}} onOpenCart={() => {}} cartCount={0} onOpenPrescription={() => {}} />

      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '56px 24px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 42, fontWeight: 800, marginBottom: 12 }}>
          Health <span style={{ color: '#90cdf4' }}>Articles & Tips</span>
        </h1>
        <p style={{ color: '#cbd5e0', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>Expert-backed health advice, wellness tips, and medicine guides from verified doctors.</p>
      </section>

      {/* Categories */}
      <section style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 24px', position: 'sticky', top: 58, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(cat => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 18px', borderRadius: 20, border: `1px solid ${activeCategory === cat ? '#e53e3e' : '#e0e0e0'}`, background: activeCategory === cat ? '#e53e3e' : 'white', color: activeCategory === cat ? 'white' : '#444', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section style={{ background: '#f8faff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Featured - first article */}
          {filtered.length > 0 && activeCategory === 'All' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40, background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <img src={filtered[0].img} alt={filtered[0].title} style={{ width: '100%', height: 360, objectFit: 'cover' }} />
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span style={{ background: '#e53e3e', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{filtered[0].category}</span>
                  {filtered[0].tag && <span style={{ background: '#fbd38d', color: '#744210', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{filtered[0].tag}</span>}
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, lineHeight: 1.3, fontFamily: 'Space Grotesk' }}>{filtered[0].title}</h2>
                <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{filtered[0].excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#888', fontSize: 13 }}>
                  <span><i className="ti ti-clock" style={{ marginRight: 4 }}></i>{filtered[0].readTime}</span>
                  <span><i className="ti ti-calendar" style={{ marginRight: 4 }}></i>{filtered[0].date}</span>
                </div>
                <button style={{ marginTop: 24, background: '#e53e3e', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', width: 'fit-content' }}>
                  Read Full Article →
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {(activeCategory === 'All' ? filtered.slice(1) : filtered).map(article => (
              <div key={article.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'}>
                <div style={{ position: 'relative' }}>
                  <img src={article.img} alt={article.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                  {article.tag && (
                    <span style={{ position: 'absolute', top: 12, left: 12, background: '#e53e3e', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{article.tag}</span>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{ background: '#f0f4ff', color: '#3182ce', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{article.category}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '12px 0 8px', lineHeight: 1.4 }}>{article.title}</h3>
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: 12 }}>
                    <span><i className="ti ti-clock" style={{ marginRight: 4 }}></i>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onOpenPrescription={() => {}} />
    </div>
  );
};

export default HealthBlogPage;
