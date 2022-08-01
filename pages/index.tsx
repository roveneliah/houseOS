import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"));

export default function Home() {
  return <Layout fixedOpen={true} noOpacity={true}></Layout>;
}
