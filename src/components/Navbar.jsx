import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
{
    return (
        <>
        
        </>
    );
}
}