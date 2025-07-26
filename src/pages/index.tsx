import { Geist, Geist_Mono, Roboto } from "next/font/google";
import Head from "next/head";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Product {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: Product ) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} ${roboto.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <Head>
        <title>Ig News | Home</title>
      </Head>
      <main className={`flex flex-col gap-[32px] row-start-2 items-center sm:items-start ${styles.contentContainer}`}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="Mulher.svg" alt="Girl coding" />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Rp867AiYxlVhAGZM2TAtpAA', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount ?? 0) / 100),
  }


  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};