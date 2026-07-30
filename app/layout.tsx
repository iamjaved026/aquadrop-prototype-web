import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AquaDrop - Pure Water Delivery & Subscriptions',
  description: 'Pure water delivery & subscription app featuring quick reorders, live order tracking, address management, and flexible payment modes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
