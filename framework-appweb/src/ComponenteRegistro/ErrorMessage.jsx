export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <span className="error">{message}</span>;
}
