import type { ReactNode } from "react";

import LamaranPage from "components/wedding-revamp/LamaranPage";

// Print version of /lamaran: no ?to= and no guest list check. The salutation is
// fixed and the recipient line is left blank to be written by hand.
const CetakLamaran = () => (
  <LamaranPage guest="" opened ogImage="" pageUrl="" print />
);

export default Object.assign(CetakLamaran, {
  getLayout: (page: ReactNode) => page,
});
