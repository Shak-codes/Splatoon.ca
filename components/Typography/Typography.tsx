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
    | "event-number"
    | "event-text"
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

  const sizeClass =
    size === "event-text"
      ? styles.eventText
      : size === "event-number"
      ? styles.eventNumber
      : size;

  return (
    <Tag
      className={`${styles.size} ${styles.typography} ${styles[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
