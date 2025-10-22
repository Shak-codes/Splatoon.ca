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
    | "page-header"
    | "event-number"
    | "event-text"
    | "5xl"
    | "4xl"
    | "3xl"
    | "2xl"
    | "xl"
    | "lg"
    | "base"
    | "sm";
  children: ReactNode;
  className?: string;
};

const Typography = ({
  variant = "paragraph",
  children,
  size = "base",
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
    size === "page-header"
      ? styles.pageHeader
      : size === "event-text"
      ? styles.eventText
      : size === "event-number"
      ? styles.eventNumber
      : `text-${size}`;

  return (
    <Tag
      className={`${styles.size} ${styles.typography} ${styles[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
