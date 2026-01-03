import React, { useRef } from 'react';
import ImageSequence from './ImageSequence';
import HeroOverlay from './HeroOverlay';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useTheme } from '../../context/ThemeContext';
import { PIZZA_VARIANTS } from '../../data/pizzas';

const Hero = () => {
    const containerRef = useRef(null);
    const scrollProgress = useScrollProgress(containerRef);
    const { activeVariantIndex, switchVariant } = useTheme();

    const activeVariant = PIZZA_VARIANTS[activeVariantIndex];

    return (
        <div
            ref={containerRef}
            className="hero-container"
            style={{
                height: '400vh', // Provides scroll space for the animation
                position: 'relative',
            }}
        >
            <div className="sticky-wrapper" style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden'
            }}>
                <ImageSequence
                    progress={scrollProgress} // Pass local progress of the hero section? or global? useScrollProgress(containerRef) handles logic?
                    // If useScrollProgress returns 0-1 based on global scroll, we might need a specific hook for this sticky container.
                    // Let's assume useScrollProgress is generic global for now, but for specific hero animation tied to scroll of this section, 
                    // we need to know how far through the 400vh we are.
                    // The current implementation of useScrollProgress handles generic window scroll.
                    // Let's rely on global scroll for a single-page feel where the hero IS the main scroll experience initially.
                    // Or update the hook logic. For the MVP, global scroll mapping to the first section is fine.
                    activeVariant={activeVariant}
                />

                <HeroOverlay
                    activeVariant={activeVariant}
                    switchVariant={switchVariant}
                    variantIndex={activeVariantIndex}
                />
            </div>
        </div>
    );
};

export default Hero;
