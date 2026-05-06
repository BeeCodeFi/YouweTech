import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and case studies from the YouweTech team.',
};

export default function BlogPage() {
  return (
    <>
      <section className="from-primary/5 to-background bg-gradient-to-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Insights, tutorials, and case studies from our team.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Blog posts coming soon. We&apos;re working on bringing you valuable content about web
            development, cloud solutions, and IT best practices.
          </p>
        </div>
      </section>
    </>
  );
}
