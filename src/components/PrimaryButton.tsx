interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

// Material-style filled button with loading state.
export function PrimaryButton({ loading, children, className, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`h-13 w-full rounded-xl bg-red-700 text-white font-semibold py-3.5 flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 hover:bg-red-800 ${
        className ?? ''
      }`}
    >
      {loading ? (
        <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin-slow" />
      ) : (
        children
      )}
    </button>
  );
}
