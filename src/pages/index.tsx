import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Register from "~/components/Register";


const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      {
        sessionData
          ?
          <>
            <main>
              <p>Hello world!</p>
              <button onClick={() => void signOut()}>Sign Out</button>
              <Link href={"/books"}><p className="text-7xl text-center">Zobcz Książki</p></Link>
            </main>
          </>
          :
          <>
            <Register />
          </>
      }
      <Head>
        <title>Books</title>
        <meta name="description" content="Books App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;


