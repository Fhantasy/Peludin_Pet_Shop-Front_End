import Header from "@/src/components/commons/header";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Peludin - Login</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@500&family=Chango&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Header />
      </main>
    </>
  );
}
