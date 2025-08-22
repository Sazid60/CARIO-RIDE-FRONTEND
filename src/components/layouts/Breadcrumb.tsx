

interface BreadcrumbProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function Breadcrumb({ title, description, backgroundImage }: BreadcrumbProps) {
  return (
    <section className="relative pt-20 md:pt-10 w-full min-h-[200px] md:min-h-[400px] flex items-center mb-10">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
          {title}
        </h1>
        <p className="text-sm md:text-md lg:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
