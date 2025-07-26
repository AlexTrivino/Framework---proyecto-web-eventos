import ErrorMessage from './ErrorMessage';

export default function Checkbox({ id, label, checked, onChange, error }) {
  return (
    <div>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
      <ErrorMessage message={error} />
    </div>
  );
}
