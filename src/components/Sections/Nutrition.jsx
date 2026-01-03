import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Nutrition = () => {
    const { themeColor } = useTheme();

    return (
        <div id="nutrition" style={{
            padding: '5rem 2rem',
            background: 'var(--bg-color)',
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--text-color)'
        }}>
            <div className="nutrition-card" style={{
                border: '2px solid var(--text-color)',
                padding: '2rem',
                width: '100%',
                maxWidth: '400px',
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, borderBottom: '10px solid var(--text-color)', lineHeight: '1' }}>Nutrition Facts</h2>
                <p style={{ fontSize: '1rem', borderBottom: '1px solid var(--text-color)', padding: '0.5rem 0' }}>Serving Size: 2 Slices (250g)</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, borderBottom: '5px solid var(--text-color)', padding: '0.5rem 0' }}>
                    <span>Calories</span>
                    <span>460</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                        { label: 'Total Fat', amount: '18g', percent: '23%' },
                        { label: 'Sodium', amount: '800mg', percent: '35%' },
                        { label: 'Total Carbohydrate', amount: '52g', percent: '19%' },
                        { label: 'Protein', amount: '22g', percent: '44%' },
                    ].map((item, i) => (
                        <li key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #999',
                            padding: '0.5rem 0',
                            fontWeight: i % 2 === 0 ? 'bold' : 'normal' // simple visual rhythm
                        }}>
                            <span>{item.label} <b>{item.amount}</b></span>
                            <b>{item.percent}</b>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                    * Percent Daily Values are based on a 2,000 calorie diet.
                </div>
            </div>
        </div>
    );
};

export default Nutrition;
