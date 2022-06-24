import { useGetUser } from "@/hooks/database/useGetUser";
import { useUserAddress } from "@/hooks/ethereum/useUserAddress";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Layout = dynamic(() => import("../components/Layout"));
const NewUserFlow = dynamic(() => import("../components/NewUserFlow"));

export default function Signup() {
  const router = useRouter();
  const address = useUserAddress();
  const { name } = useGetUser(address);
  useEffect(() => {
    name && router.push("/me");
  }, [name]);

  return (
    <Layout demo={true}>
      <NewUserFlow />
    </Layout>
  );
}
