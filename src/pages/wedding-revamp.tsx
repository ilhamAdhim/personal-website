import type { ReactNode } from "react";

import {
  createGetServerSideProps,
  createInvitationPage,
} from "components/wedding-revamp/InvitationPage";
import { WEDDING } from "data/weddingConfig";

export const getServerSideProps = createGetServerSideProps("/wedding-revamp");

const WeddingRevamp = createInvitationPage({
  config: WEDDING,
  occasion: "pernikahan",
});

// Stands alone: no site header/footer
export default Object.assign(WeddingRevamp, {
  getLayout: (page: ReactNode) => page,
});
