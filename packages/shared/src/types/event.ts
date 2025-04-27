// @unocss-include
export type EventType = "event" | "food" | "drink" | "activity";

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string
  type: EventType
  lat: number
  lng: number
  googleMapsId: string
}

export const eventTypeColors: Record<EventType, string> = {
  event: "bg-purple-500",
  food: "bg-blue-500",
  drink: "bg-green-500",
  activity: "bg-red-500",
};

export const eventTypeNames: Record<EventType, string> = {
  event: "Évènement",
  food: "Repas",
  drink: "Boisson",
  activity: "Activité",
};
