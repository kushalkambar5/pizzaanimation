import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay after 100%
                    return 100;
                }
                return prev + 2; // Speed of loading
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="preloader" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none', // Block interaction? Actually should capture.
        }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem', letterSpacing: '5px' }}>PIZZA.PARALLAX</h1>
            <div className="loading-bar-container" style={{
                width: '300px',
                height: '2px',
                background: 'rgba(255,255,255,0.2)',
                position: 'relative'
            }}>
                <div className="loading-bar" style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#e63946',
                    transition: 'width 0.1s linear'
                }} />
            </div>
            <p style={{ marginTop: '1rem', opacity: 0.5, fontSize: '0.8rem' }}>Loading {progress}%</p>
        </div>
    );
};

export default Preloader;
