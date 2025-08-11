type PageHeaderProps = {
  title: string;
  subtitle: string;
};

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <header className="flex flex-col items-start px-5">
      <h1 className="text-center text-5xl text-white font-bold pb-2">
        {title}
      </h1>
      <div className="rounded-lg bg-white w-full h-10 flex items-center justify-center">
        <h2 className="!text-[var(--secondary-background)] text-center text-2xl font-bold">
          {subtitle}
        </h2>
      </div>
    </header>
  );
};

export default PageHeader;
