export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-textMain text-white px-6 py-3 rounded text-[13px] font-medium z-[100] text-center whitespace-nowrap shadow-xl">
      {message}
    </div>
  );
}
