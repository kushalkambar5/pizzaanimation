import React, { useState } from 'react';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar';
import Nutrition from './components/Sections/Nutrition';
import FAQ from './components/Sections/FAQ';
import Preloader from './components/Preloader';
import { ThemeProvider } from './context/ThemeContext';

// Placeholder Dummy Sections
const Section = ({ title, height = '80vh', bg = 'var(--bg-color)', children }) => (
  <div id={title.toLowerCase()} style={{
    height,
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid rgba(128,128,128,0.1)',
    position: 'relative',
    color: 'var(--text-color)',
    flexDirection: 'column'
  }}>
    <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{title}</h2>
    {children}
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="app" style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease' }}>
        <Navbar />
        {/* Scroll Helper */}
        <Hero />

        {/* Content Sections */}
        <Section title="Product">
          <p style={{ maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
            Hand-tossed dough, vine-ripened tomatoes, and locally sourced ingredients.
            Each pizza is verified for perfection before it leaves our oven.
          </p>
        </Section>

        <Section title="Ingredients" height="60vh">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', maxWidth: '800px' }}>
            {['00 Flour', 'San Marzano', 'Mozzarella'].map(i => (
              <div key={i} style={{ border: '1px solid currentColor', padding: '2rem', textAlign: 'center' }}>
                {i}
              </div>
            ))}
          </div>
        </Section>

        <Nutrition />

        <Section title="Reviews">
          <div style={{ fontStyle: 'italic' }}>"Best pizza I've scrolled through all year." - A User</div>
        </Section>

        <FAQ />

        <footer style={{ padding: '3rem 2rem', textAlign: 'center', background: '#0a0a0a', color: '#fff' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>PIZZA.PARALLAX</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.6, fontSize: '0.9rem' }}>
            <span>About</span>
            <span>Contact</span>
            <span>Privacy</span>
          </div>
          <p style={{ marginTop: '2rem', opacity: 0.3, fontSize: '0.8rem' }}>&copy; 2024 Parallax Pizza. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
