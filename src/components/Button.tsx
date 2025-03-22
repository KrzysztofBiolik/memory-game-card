import React from 'react';
import '../styles/button.scss';  

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
