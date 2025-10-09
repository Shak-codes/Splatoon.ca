import React from "react";
import Link from "next/link";

type ButtonProps = {
  text: string;
  disabled: boolean;
  href?: string;
  bghover?: "bg" | "accent";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  text,
  disabled,
  href,
  bghover = "bg",
  onClick,
}: ButtonProps) => {
  const className = `
    flex justify-center items-center
    bg-transparent border border-white text-white font-bold
    h-12 w-full rounded cursor-pointer
    transition-colors duration-300
    ${bghover === "accent" && "hover:bg-[var(--accent)]"}
    ${bghover === "bg" && "hover:bg-[var(--primary)]"} 
    hover:border-transparent 
  `;
  if (href) {
    return (
      <Link href={href} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
