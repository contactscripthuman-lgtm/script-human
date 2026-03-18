import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing Room | AI Content Humanizer & Naturalizer',
  description: 'Transform robotic AI drafts into natural, human-like prose. Our humanization engine ensures your content sounds authentic and stays undetectable.',
  openGraph: {
    title: 'Writing Room | ScriptHuman',
    description: 'Bypass AI detection with our advanced humanization tool.',
    url: 'https://www.scripthuman.com/writing-room',
    siteName: 'ScriptHuman',
    images: [{ url: '/og-writing-room.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function WritingRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
