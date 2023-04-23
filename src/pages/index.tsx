import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
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


