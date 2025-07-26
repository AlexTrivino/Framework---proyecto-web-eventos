import ErrorMessage from './ErrorMessage';

export default function InputField({ id, label, type = "text", placeholder, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        type={type} 
        id={id} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className={error ? 'input-error' : ''}
      />
      <ErrorMessage message={error} />
    </div>
  );
}
