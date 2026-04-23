import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  type = "button", 
  className = "",
  disabled = false 
}: ButtonProps) => {
  const variants = {
    primary: "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    success: "bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600",
    danger: "bg-rose-500 text-white shadow-rose-100 hover:bg-rose-600",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    info: "bg-sky-500 text-white hover:bg-sky-600",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const btnClass = `inline-flex items-center justify-center rounded-xl font-semibold tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      type={type} 
      className={btnClass} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
