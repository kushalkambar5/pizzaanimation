import { useState, useEffect } from 'react';

/**
 * Tracks the scroll progress of the window or a specific element.
 * @returns {number} Progress from 0 to 1.
 */
export const useScrollProgress = (targetRef = null) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (targetRef && targetRef.current) {
                const element = targetRef.current;
                const rect = element.getBoundingClientRect();

                // Calculate progress based on how much of the element has scrolled past the viewport top
                // Progress = 0 when element top is at 0
                // Progress = 1 when element bottom is at window height (i.e. finished scrolling)
                const scrollDistance = rect.height - window.innerHeight;

                // Avoid division by zero
                if (scrollDistance <= 0) {
                    setProgress(1);
                    return;
                }

                const currentScroll = -rect.top;
                const calculatedProgress = currentScroll / scrollDistance;

                setProgress(Math.min(Math.max(calculatedProgress, 0), 1));
            } else {
                // Global scroll fallback
                const totalScroll = window.scrollY;
                const maxScroll = document.body.scrollHeight - window.innerHeight;

                if (maxScroll <= 0) return setProgress(0);

                const completion = totalScroll / maxScroll;
                setProgress(Math.min(Math.max(completion, 0), 1));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, [targetRef]);

    return progress;
};
