import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const items = [
    { q: "Is the dough made fresh daily?", a: "Yes, our dough is kneaded fresh every morning using Italian flour." },
    { q: "Do you offer gluten-free options?", a: "We have a cauliflower crust option available for all pizzas." },
    { q: "How long does delivery take?", a: "We guarantee delivery within 30 minutes of ordering." },
    { q: "Can I customize the toppings?", a: "Absolutely! Just click 'View Details' to customize your perfect pie." },
];

const FAQ = () => {
    const { themeColor } = useTheme();
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div id="faq" style={{ padding: '5rem 2rem', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center', textTransform: 'uppercase' }}>FAQ</h2>

                <div className="accordion">
                    {items.map((item, i) => (
                        <div key={i} style={{ borderBottom: '1px solid rgba(128,128,128, 0.3)' }}>
                            <button
                                onClick={() => toggle(i)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '1.5rem 0',
                                    background: 'none',
                                    color: 'inherit',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer'
                                }}
                            >
                                {item.q}
                                <span style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>+</span>
                            </button>
                            <div style={{
                                height: openIndex === i ? 'auto' : 0,
                                overflow: 'hidden',
                                paddingBottom: openIndex === i ? '1.5rem' : 0,
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                transition: 'all 0.3s ease'
                            }}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
