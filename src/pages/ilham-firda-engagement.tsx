import type { ReactNode } from "react";

import {
  createGetServerSideProps,
  createInvitationPage,
} from "components/wedding-revamp/InvitationPage";
import { ENGAGEMENT } from "data/engagementConfig";

export const getServerSideProps = createGetServerSideProps(
  "/ilham-firda-engagement",
  "engagement"
);

const Engagement = createInvitationPage({
  config: ENGAGEMENT,
  occasion: "lamaran",
});

// Same template as /wedding-revamp, with the engagement's own content
export default Object.assign(Engagement, {
  getLayout: (page: ReactNode) => page,
});
