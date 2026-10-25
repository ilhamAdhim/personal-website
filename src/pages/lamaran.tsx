import type { ReactNode } from "react";

import { createGetServerSideProps } from "components/wedding-revamp/InvitationPage";
import LamaranPage from "components/wedding-revamp/LamaranPage";

// Same ?to= guest allow list and themed 404 as the other invitation pages, but
// the name is required: /lamaran with no ?to= is a 404 as well
export const getServerSideProps = createGetServerSideProps(
  "/lamaran",
  "engagement",
  true
);

// Stands alone: no site header/footer
export default Object.assign(LamaranPage, {
  getLayout: (page: ReactNode) => page,
});
