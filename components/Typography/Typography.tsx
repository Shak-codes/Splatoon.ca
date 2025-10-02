import { ReactNode } from "react";
import styles from "./styles.module.css";

type TypographyProps = {
  variant:
    | "XL"
    | "LARGE"
    | "title"
    | "subtitle"
    | "sectionTitle"
    | "sectionSubtitle"
    | "subsectionTitle"
    | "subsectionSubtitle"
    | "paragraph"
    | "small";
  children: ReactNode;
  className?: string;
};

const Typography = ({ variant, children, className = "" }: TypographyProps) => {
  const Tag =
    variant === "LARGE"
      ? "h1"
      : variant === "XL"
      ? "h1"
      : variant === "title"
      ? "h1"
      : variant === "subtitle"
      ? "h2"
      : variant === "sectionTitle"
      ? "h3"
      : variant === "sectionSubtitle"
      ? "h4"
      : variant === "subsectionTitle"
      ? "h5"
      : variant === "subsectionSubtitle"
      ? "h6"
      : "p";

  return (
    <Tag className={`${styles.typography} ${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;
