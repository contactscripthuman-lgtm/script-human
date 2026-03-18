import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Style Studio | Professional AI Content Refinement',
  description: 'Fine-tune your AI-generated text for perfect tone and flow. Inject regional idioms and adjust burstiness for an authentic, human voice.',
  openGraph: {
    title: 'Style Studio | ScriptHuman',
    description: 'Master your unique voice with our style and tone analysis tools.',
    url: 'https://www.scripthuman.com/style-studio',
    siteName: 'ScriptHuman',
    images: [{ url: '/og-style-studio.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function StyleStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
