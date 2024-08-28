import React from 'react';

// Imported  styles:
import '../styles/Button.css';

function Button({ label, onClick, className  }) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default Button;