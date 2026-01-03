import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PIZZA_VARIANTS } from '../../data/pizzas';

const HeroOverlay = ({ activeVariant, switchVariant, variantIndex }) => {
    const { themeColor, isDarkMode } = useTheme();

    const handleNext = () => {
        const nextIndex = (variantIndex + 1) % PIZZA_VARIANTS.length;
        switchVariant(nextIndex, PIZZA_VARIANTS[nextIndex].themeColor);
    };

    const handlePrev = () => {
        const prevIndex = (variantIndex - 1 + PIZZA_VARIANTS.length) % PIZZA_VARIANTS.length;
        switchVariant(prevIndex, PIZZA_VARIANTS[prevIndex].themeColor);
    };

    return (
        <div className="hero-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '0 5%',
            color: 'var(--text-color)',
            zIndex: 10,
            pointerEvents: 'none' // Let clicks pass through if needed, but buttons need pointer-events: auto
        }}>
            {/* Left Content */}
            <div className="overlay-content" style={{ maxWidth: '600px', pointerEvents: 'auto' }}>
                <h1 style={{
                    fontSize: '5rem',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {activeVariant.name}
                </h1>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    marginBottom: '1.5rem',
                    color: themeColor
                }}>
                    {activeVariant.subtitle}
                </h3>
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                    maxWidth: '80%'
                }}>
                    {activeVariant.description}
                </p>

                <div className="cta-group" style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        border: '2px solid #fff',
                        background: 'transparent',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        ORDER NOW
                    </button>
                    <button style={{
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        border: `2px solid ${themeColor}`,
                        background: 'transparent',
                        color: themeColor,
                        fontWeight: 'bold'
                    }}>
                        VIEW DETAILS
                    </button>
                </div>
            </div>

            {/* Right Navigation */}
            <div className="variant-nav" style={{
                position: 'absolute',
                right: '5%',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                pointerEvents: 'auto'
            }}>
                <div className="index-number" style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    opacity: 0.2,
                    marginBottom: '1rem'
                }}>
                    0{variantIndex + 1}
                </div>

                <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={handlePrev} style={{ background: 'none', color: 'inherit', fontSize: '1rem' }}>
                        PREV
                    </button>
                    <div style={{ width: '40px', height: '2px', background: 'currentColor' }}></div>
                    <button onClick={handleNext} style={{ background: 'none', color: 'inherit', fontSize: '1rem' }}>
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroOverlay;
