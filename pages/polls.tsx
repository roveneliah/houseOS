import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Footer } from '@/components/home/Footer';
import { DesktopIcons } from '@/components/home/DesktopIcons';
const Layout = dynamic(() => import('../components/home/Layout'));
import PollsApp from '@/components/apps/Polls';

export default function PollsPage() {
  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <div className="absolute z-auto -mt-12 flex h-full flex-col justify-center font-mono">
        <Image src="/LogoGlobe.svg" width={6000} height={6000} alt="logo" />
      </div>
      <DesktopIcons />
      <Footer />
      <PollsApp />
    </Layout>
  );
}
