import React from 'react';
import type { Event } from '@loca-local/shared';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onSelectEvent }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="hover:shadow-lg transition-all cursor-pointer"
          onClick={() => onSelectEvent(event)}
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}; 