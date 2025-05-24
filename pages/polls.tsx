import dynamic from 'next/dynamic';
import PollsApp from '@/components/apps/Polls';

const Layout = dynamic(() => import('../components/home/Layout'));

export default function PollsPage() {
  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <PollsApp />
    </Layout>
  );
}
