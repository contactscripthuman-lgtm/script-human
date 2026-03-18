import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Hub | Scalable AI Humanization for Agencies',
  description: 'The professional solution for high-volume content agencies. Maintain consistent brand voice and avoid Silicon Smog across all your teams.',
  openGraph: {
    title: 'Enterprise Hub | ScriptHuman',
    description: 'Scale your content strategy safely with our Enterprise tools.',
    url: 'https://www.scripthuman.com/enterprise',
    siteName: 'ScriptHuman',
    images: [{ url: '/og-enterprise.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
