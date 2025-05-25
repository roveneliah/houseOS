import dynamic from 'next/dynamic';

const PollsApp = dynamic(() => import('@/components/apps/Polls'), { ssr: false });

export default function PollsPage() {
  return <PollsApp />;
}
