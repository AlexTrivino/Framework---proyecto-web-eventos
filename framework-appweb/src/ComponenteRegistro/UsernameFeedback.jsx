export default function UsernameFeedback({ feedback, valid }) {
  if (!feedback) return null;
  return (
    <span className={`feedback ${valid ? 'valido' : 'invalido'}`}>
      {feedback}
    </span>
  );
}
