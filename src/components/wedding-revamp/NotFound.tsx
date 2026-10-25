import Head from "next/head";

import { HeartSeal } from "./Decor";
import { fontVars } from "./fonts";
import s from "./wr.module.css";

/**
 * Shown by /wedding and /wedding-revamp when ?to= names someone who is not on
 * the guest list. The pages send a real 404 status, so search engines and link
 * previews treat it as missing, but guests see this instead of the site 404.
 */
const WeddingNotFound = ({ guest }: { guest: string }) => (
  <div
    className={`${s.root} ${s.velvet} ${fontVars} flex items-center justify-center text-center`}
    data-theme="wedding"
    style={{ minHeight: "100svh", padding: "4rem var(--gutter)" }}
  >
    <Head>
      <title>Undangan tidak ditemukan</title>
      <meta name="robots" content="noindex" />
    </Head>

    <div className={s.wrap}>
      <div className="mx-auto! w-20!">
        <HeartSeal className="w-full! h-auto!" label="?" />
      </div>

      <h1 className={`${s.script} mt-8!`}>Undangan tidak ditemukan</h1>

      <p className={`${s.body} mt-5!`}>
        Maaf, kami tidak menemukan undangan
        {guest ? (
          <>
            {" "}
            atas nama <strong>{guest}</strong>
          </>
        ) : null}
        . Silakan periksa kembali tautan yang Anda terima, atau hubungi kami
        langsung.
      </p>
      <p className={`${s.body} ${s.soft} mt-3! italic`}>
        Sorry, we couldn&rsquo;t find that invitation. Please check the link
        you were sent, or contact us directly.
      </p>
    </div>
  </div>
);

export default WeddingNotFound;
