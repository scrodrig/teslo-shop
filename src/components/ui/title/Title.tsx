import { titleFont } from "@/config/fonts";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-10`}
      >
        {title}
      </h1>
      {subtitle && (
        <h3 className="text-xl mb-5 text-gray-500 font-light">{subtitle}</h3>
      )}
    </div>
  );
};
