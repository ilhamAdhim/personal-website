// Guest list for the lamaran invitation. The `?to=` query param on /wedding
// must be similar to one of these names, otherwise the page returns 404.
export const WEDDING_GUESTS = [
  "Bp. Winoto",
  "Ibu Nariswari",
  "Ilham",
  "Azmi",
  "Bp. Edi Widjajanto",
  "Ibu Lilik Mintartiningsih",
  "Ibu Leliasri Wida",
  "Bp. Nyoman",
  "Bp. Nugroho Ananto",
  "Ibu Bea Rejeki",
  "Bp. Harinto Wisnu Widjaja",
  "Ibu Tita",
  "Ibu Roos Asri Ratna Wijaya",
  "Bp. Rokyawan",
  "Kusumo",
  "Yuni",
  "Ni Luh Komang Rike",
  "Asep Partawirya",
  "Melati Sadikaningtya",
  "Lirasati Sadikaningtya",
  "Ade",
  "Bimba",
  "Bayu",
  "Kholiq",
  "Ayah",
  "Bunda",
  "Firda",
  "Kak Alif",
  "Dek Rayyan",
  "Uti",
  "Om Entuk",
  "Tante RIna",
  "Dek RIzal",
  "Dek Rifky",
  "Dek Ridho",
  "Tante Luluk",
  "Om Grodik",
  "Mbak Elsa",
  "Nana",
  "Bude Nunung",
  "Pakde Djainuri",
  "Mas Iqbal",
  "Mbak Sari",
];

const HONORIFICS = new Set([
  "bp",
  "bpk",
  "bapak",
  "pak",
  "ibu",
  "bu",
  "kak",
  "kakak",
  "dek",
  "adek",
  "adik",
  "om",
  "tante",
  "mbak",
  "mba",
  "mas",
  "bude",
  "pakde",
]);

const MIN_TOKEN_SIMILARITY = 0.75;

// Lowercase, drop "(...)" notes and punctuation, and strip honorifics so
// "Bp. Winoto (Kelg)" and "pak winoto" both become ["winoto"].
function toNameTokens(name: string) {
  const tokens = name
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const core = tokens.filter((t) => !HONORIFICS.has(t));
  // Keep names that are themselves honorific-like (e.g. "Ayah", "Uti")
  return core.length ? core : tokens;
}

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const tmp = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[b.length];
}

function similarity(a: string, b: string) {
  const longest = Math.max(a.length, b.length);
  return longest === 0 ? 1 : 1 - levenshtein(a, b) / longest;
}

// A name matches a guest when every word of it (ignoring honorifics) is
// close to a word of that guest's name, e.g. "Ibu Lilik", "Edi Widjayanto".
export function isInvitedGuest(name: string) {
  const input = toNameTokens(name);
  if (!input.length) return false;
  return WEDDING_GUESTS.some((guest) => {
    const guestTokens = toNameTokens(guest);
    return input.every((token) =>
      guestTokens.some((g) => similarity(token, g) >= MIN_TOKEN_SIMILARITY)
    );
  });
}
