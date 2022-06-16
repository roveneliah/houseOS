import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return <Layout fixedOpen={true} noOpacity={true}></Layout>;
};

export default Home;
