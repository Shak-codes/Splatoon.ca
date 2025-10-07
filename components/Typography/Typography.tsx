import { ReactNode } from "react";
import styles from "./styles.module.css";

type TypographyProps = {
  variant?:
    | "hero"
    | "header"
    | "title"
    | "subtitle"
    | "sectionTitle"
    | "sectionSubtitle"
    | "subsectionTitle"
    | "subsectionSubtitle"
    | "paragraph";
  size?:
    | "text-9xl"
    | "text-8xl"
    | "text-7xl"
    | "text-6xl"
    | "text-5xl"
    | "text-4xl"
    | "text-3xl"
    | "text-2xl"
    | "text-xl"
    | "text-lg"
    | "text-base"
    | "text-sm";
  children: ReactNode;
  className?: string;
};

const Typography = ({
  variant = "paragraph",
  children,
  size = "text-base",
  className = "",
}: TypographyProps) => {
  const Tag =
    variant === "title"
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
    <Tag
      className={`${styles.typography} ${styles[variant]} ${size} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
