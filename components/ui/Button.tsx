import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'btn-premium',
    secondary: 'bg-bg-tertiary border border-border-main hover:bg-bg-card text-text-primary',
    ghost: 'bg-transparent hover:bg-bg-tertiary text-text-secondary hover:text-text-primary'
  };

  return (
    <button
      className={`${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};
