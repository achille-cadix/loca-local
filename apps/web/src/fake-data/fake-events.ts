import type { Event } from "@loca-local/shared";

export const fakeEvents: Event[] = [
  {
    id: "1",
    name: "Raclette au 115",
    date: "2025-11-12T21:00:00",
    location: "Paris, France",
    description:
      "Raclette au 115 de zinzin avec les copains. Pour les plus gros amateurs de fromage, charcut et potates",
    type: "food",
    lat: 48.8566,
    lng: 2.3522,
    googleMapsId: "KcP76MAbHh5z6LVc7",
  },
  {
    id: "2",
    name: "Fête de la mer au Moustoir",
    date: "2025-08-15T18:30:00",
    location: "Vannes, France",
    description:
      "Fête de la mer au Moustoir. Buvette, bigoudennes, choucen, cidre et kiff",
    type: "drink",
    lat: 47.65,
    lng: -2.75,
    googleMapsId: "uhkeLeti8DigQoRc7",
  },
  {
    id: "3",
    name: "Surf week à Arcachon",
    date: "2025-07-22T10:00:00",
    location: "Arcachon, France",
    description:
      "Surf week à Arcachon. Woulah cet évenement arrivera un jour, mais pas demain",
    type: "activity",
    lat: 44.62,
    lng: -1.196,
    googleMapsId: "Jf33nVXNNRAMDxKu6",
  },
  {
    id: "4",
    name: "Week end de seigneurs en Sologne",
    date: "2026-04-13:00:00",
    location: "Sologne, France",
    description: "Week end de seigneurs en Sologne. Programme : pétage de bide intesif pour les plus gros amateurs de BBQ",
    type: "event",
    lat: 47.32,
    lng: 2.05,
    googleMapsId: "3vXdvw8k8LPDVjXB7",
  },
];
