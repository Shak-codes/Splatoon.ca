import Typography from "./Typography/Typography";

type PageHeaderProps = {
  title: string;
  variant?: "XL" | "LARGE" | "title";
  className?: string;
};

const PageHeader = ({
  title,
  variant = "title",
  className,
}: PageHeaderProps) => {
  const normalized = title.replaceAll("\\N", "\n").replaceAll("\\n", "\n");
  const lines = normalized.split("\n");

  return (
    <header>
      <Typography variant={variant} className={`${className}`}>
        {lines.map((line, lineIdx) => {
          const chars = Array.from(line);
          return (
            <div key={lineIdx}>
              {chars.map((ch, i) => (
                <span
                  key={`${lineIdx}-${i}`}
                  className={`animate-letter tracking-wider ${
                    lineIdx > 0 ? "text-outline-custom" : "text-white"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          );
        })}
      </Typography>
    </header>
  );
};

export default PageHeader;
