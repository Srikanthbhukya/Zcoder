import React, { useState, useRef } from 'react';

export const Accordion = ({ title, children }) => {
    const [isActive, setIsActive] = useState(false);
    const panelRef = useRef(null);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <button className={`accordion ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                {title}
            </button>
            <div
                ref={panelRef}
                className="panel"
                style={{ maxHeight: isActive ? `${panelRef.current.scrollHeight}px` : '0px' }}
            >
                {children}
            </div>
        </div>
    );
};
