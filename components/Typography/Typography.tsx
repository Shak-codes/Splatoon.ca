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

  const sizeMap = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "page-header": styles.pageHeader,
    "event-text": styles.eventText,
    "event-number": styles.eventNumber,
  } as const;

  const sizeClass = sizeMap[size];

  return (
    <Tag
      className={`${styles.size} ${styles.typography} ${styles[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Typography;
