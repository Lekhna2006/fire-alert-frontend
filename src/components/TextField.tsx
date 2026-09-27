import type { InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { Icon, type IconName } from './Icon';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconName;
  trailing?: ReactNode;
}

// Material-style outlined text field with a leading icon.
export function TextField({ label, icon, trailing, ...props }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`flex items-center gap-2 rounded-xl bg-white px-3 h-14 ring-1 transition-all ${
        focused ? 'ring-2 ring-red-500' : 'ring-neutral-200'
      }`}
    >
      <Icon name={icon} size={20} className={focused ? 'text-red-600' : 'text-neutral-400'} />
      <div className="flex-1 relative">
        <label
          className={`absolute left-0 transition-all pointer-events-none ${
            focused || props.value
              ? 'top-1 text-[11px] text-red-600 font-medium'
              : 'top-3.5 text-sm text-neutral-400'
          }`}
        >
          {label}
        </label>
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full bg-transparent pt-4 pb-1 text-sm text-neutral-800 outline-none"
        />
      </div>
      {trailing}
    </div>
  );
}

// Password field with show/hide toggle built on top of TextField.
export function PasswordField({
  label,
  icon,
  ...props
}: Omit<TextFieldProps, 'type' | 'trailing'>) {
  const [show, setShow] = useState(false);
  return (
    <TextField
      {...props}
      label={label}
      icon={icon}
      type={show ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Icon name={show ? 'visibility-off' : 'visibility'} size={20} />
        </button>
      }
    />
  );
}
