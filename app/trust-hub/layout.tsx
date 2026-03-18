import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust Hub | Human-Written Verification & Certification',
  description: 'Verify your content’s originality. Trust Hub provides an official "Human Touch" certificate backed by four-layer forensic analysis.',
  openGraph: {
    title: 'Trust Hub | ScriptHuman',
    description: 'Verify and certify your content with our advanced Trust Engine.',
    url: 'https://www.scripthuman.com/trust-hub',
    siteName: 'ScriptHuman',
    images: [{ url: '/og-trust-hub.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function TrustHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ScriptHuman Trust Hub",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "description": "Four-layer forensic analysis and certification for human-written content.",
            "url": "https://www.scripthuman.com/trust-hub",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
