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
    createdAt: Date | string;
    updatedAt: Date | string | null;
  };
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  type OrderDetails = {
    id: number;
    eventName: string;
    quantity: number;
    price: number;
  };
}
export {};
