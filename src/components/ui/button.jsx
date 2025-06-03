export function Button({ children, onClick, variant = 'default' }) {
  const styles = variant === 'outline'
    ? 'border border-gray-300 text-black'
    : 'bg-black text-white';

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${styles}`}>
      {children}
    </button>
  );
}
