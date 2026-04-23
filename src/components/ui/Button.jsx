const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  type = "button", 
  className = "",
  disabled = false 
}) => {
  const btnClass = `btn btn-${variant} btn-${size} ${className}`;
  
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
