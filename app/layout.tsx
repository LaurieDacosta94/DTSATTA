import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Dirt to Superintelligence | The Bootstrapped Tech Tree Academy',
  description: 'Complete school for complete beginners. Master civilization-scale technology from primitive fire and metallurgy to silicon fabs, world models, and autonomous AI.',
  openGraph: {
    title: 'Dirt to Superintelligence | The Bootstrapped Tech Tree Academy',
    description: 'Complete school for complete beginners. Master civilization-scale technology from primitive fire and metallurgy to silicon fabs, world models, and autonomous AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirt to Superintelligence | The Bootstrapped Tech Tree Academy',
    description: 'Complete school for complete beginners. Master civilization-scale technology from primitive fire and metallurgy to silicon fabs, world models, and autonomous AI.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
