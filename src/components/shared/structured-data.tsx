import { profile } from "@/lib/data";

const siteUrl = "https://dinh-hieu-trong.vercel.app";

/**
 * JSON-LD structured data for SEO — helps Google understand this is a
 * personal portfolio of a Software Engineer.
 */
export function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.nameEn,
    jobTitle: profile.role,
    description: profile.shortBio,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: siteUrl,
    image: `${siteUrl}/favicon.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Biên Hoà",
      addressRegion: "Đồng Nai",
      addressCountry: "VN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Trường Đại học Công nghệ Đồng Nai",
    },
    knowsAbout: [
      "Software Engineering",
      "Backend Development",
      "PHP",
      "Laravel",
      "Node.js",
      "NestJS",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Docker",
      "REST API",
      "CQRS",
      "Domain-Driven Design",
    ],
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // Schema.org JSON is static and safe to inject verbatim
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
