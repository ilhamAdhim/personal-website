// Where RSVPs and wishes are kept. Right now: this browser only (localStorage),
// so guests can't see each other's wishes yet. Swap `createWishesStore` for an
// API-backed implementation (e.g. Supabase or Vercel KV) to make them shared.

export type Attendance = "yes" | "no" | "maybe";

export type Wish = {
  id: string;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
  createdAt: string;
};

export type NewWish = Omit<Wish, "id" | "createdAt">;

export interface WishesStore {
  list(): Promise<Wish[]>;
  add(wish: NewWish): Promise<Wish>;
}

/** One store per invitation page, so an engagement RSVP never lands on the wedding list */
export const createLocalWishesStore = (key: string): WishesStore => {
  const read = (): Wish[] => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "[]");
    } catch {
      return [];
    }
  };

  return {
    async list() {
      return read();
    },
    async add(input) {
      const wish: Wish = {
        ...input,
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        createdAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(key, JSON.stringify([wish, ...read()]));
      } catch {
        // storage full or blocked: keep it in memory for this visit
      }
      return wish;
    },
  };
};

export const createWishesStore = createLocalWishesStore;
