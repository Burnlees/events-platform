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
  };
}
export {};
