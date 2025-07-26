import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

export default function PasswordField({ id, label, placeholder, value, onChange, error }) {
  const [strength, setStrength] = useState(0);

  function handleInput(e) {
    const pass = e.target.value;
    onChange(e);

    let strengthCount = 0;
    if (pass.length >= 8) strengthCount++;
    if (/[A-Z]/.test(pass)) strengthCount++;
    if (/[0-9]/.test(pass)) strengthCount++;
    if (/[^A-Za-z0-9]/.test(pass)) strengthCount++;

    setStrength(strengthCount);
  }

  const colors = ['red', 'orange', 'yellow', 'green'];
  const messages = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        type="password" 
        id={id} 
        placeholder={placeholder} 
        value={value} 
        onChange={handleInput} 
        className={error ? 'input-error' : ''}
      />
      <div id="strengthMeter" style={{height: '5px', backgroundColor: '#ddd', marginTop: '5px'}}>
        <div 
          className="strength-bar" 
          style={{width: `${(strength / 4) * 100}%`, background: colors[strength - 1] || 'red', height: '100%'}}
        />
      </div>
      <ErrorMessage message={error} />
      <span id="strengthText" style={{color: colors[strength - 1] || 'red'}}>
        {messages[strength - 1] || 'Muy débil'}
      </span>
    </div>
  );
}
