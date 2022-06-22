import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../components/Layout"));
const NewUserFlow = dynamic(() => import("../components/NewUserFlow"));

export default function Signup() {
  return (
    <Layout>
      <NewUserFlow />
    </Layout>
  );
}
