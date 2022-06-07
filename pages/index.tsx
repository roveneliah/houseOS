import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useGetUser } from "../hooks/useGetUser";

const Home: NextPage = () => {
  return <Layout paletteOpen={true}></Layout>;
};

export default Home;
