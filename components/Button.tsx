import React from "react";

type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="
        flex
        justify-center
        items-center
        bg-transparent
        border
        border-white
        text-white
        font-bold
        h-12
        w-full
        rounded
        m-0
        ease-in-out
        cursor-pointer
        transition-colors duration-300 ease-in-out
        hover:bg-white
        hover:text-[var(--secondary-background)]
    "
      disabled={disabled}
    >
      <div className="">{text}</div>
    </button>
  );
};

export default Button;
