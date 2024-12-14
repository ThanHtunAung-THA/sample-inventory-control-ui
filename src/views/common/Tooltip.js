// Tooltip.js
import React from 'react';
import "../../css/tooltip.css";

const Tooltip = ({ message, children }) => {
    return (
        <div className="tooltip-container">
            {children}
            {message && <div className="tooltip">{message}</div>}
        </div>
    );
};

export default Tooltip;