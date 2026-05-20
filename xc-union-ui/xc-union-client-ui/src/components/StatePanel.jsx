export default function StatePanel({ title, desc, actionLabel, onAction }) {
  return (
    <div className="bg-cardWhite border border-borderLine rounded-2xl p-8 md:p-12 text-center">
      <h3 className="text-[18px] font-semibold text-textMain mb-2">{title}</h3>
      <p className="text-textMuted mb-6">{desc}</p>
      {actionLabel && (
        <button onClick={onAction} className="h-11 px-6 rounded-lg bg-primary text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
