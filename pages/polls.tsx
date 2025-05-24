import dynamic from 'next/dynamic';
import AppFrame from '@/components/layout/AppFrame';
import { DesktopIcons } from '@/components/home/DesktopIcons';
import { Footer } from '@/components/home/Footer';
import { useAppSelector } from '@/redux/app/hooks';
import { RootState } from '@/redux/app/store';
import { useAppLauncher } from '@/hooks/useAppLauncher';
import PollsApp from '@/components/apps/Polls';

const Layout = dynamic(() => import('../components/home/Layout'));

export default function PollsPage() {
  const openApp = useAppSelector((state: RootState) => state.windows.primaryApp);
  const width = useAppSelector((state: RootState) => state.windows.primaryAppWidth);
  const height = useAppSelector((state: RootState) => state.windows.primaryAppHeight);
  const padding = useAppSelector((state: RootState) => state.windows.primaryAppPadding);
  const { quit } = useAppLauncher();

  return (
    <Layout fixedOpen={false} noOpacity={true}>
      <DesktopIcons />
      <Footer />
      {!openApp && <PollsApp />}
      {openApp && (
        <AppFrame width={width} height={height} onClose={quit} padding={padding}>
          {openApp}
        </AppFrame>
      )}
    </Layout>
  );
}
