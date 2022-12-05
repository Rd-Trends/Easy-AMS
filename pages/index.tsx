import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HomeLayout from "../layouts/HomeLayout";
// import

export default function Home() {
  const [v, setV] = useState(1);

  useEffect(() => {
    setTimeout(async () => {
      await setV(2);
      doSomethingWithData(v);
    }, 3000);
  }, [v]);

  const doSomethingWithData = (v: Number) => {
    console.log("Variable Value is:" + v);
  };

  return (
    <HomeLayout>
      <Hero />
    </HomeLayout>
  );
}
