export type Roles = "admin" | "moderator";

declare global {
  type EventDetails = {
    id: number;
    name: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    country: string;
    image: string;
    createdAt: Date;
    updatedAt: Date | null;
  };
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
export {};
