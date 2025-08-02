import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  icon,
}: ButtonProps) => {
  // Base classes
  const baseClasses =
    "rounded-md font-medium transition-colors flex items-center justify-center gap-2";

  // Variant classes
  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
