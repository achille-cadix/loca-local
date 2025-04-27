import React from 'react';
import type { Event } from '@loca-local/shared';
import { formatDate, formatTime } from '@loca-local/shared';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
        <p className="text-gray-600 mt-1">{event.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-gray-900">{event.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date & Time</p>
          <p className="text-gray-900">{formatDate(event.date)} at {formatTime(event.date)}</p>
        </div>
      </div>


      <div className="flex space-x-3 pt-4">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() =>window.open(`https://maps.app.goo.gl/${event.googleMapsId}`, "_blank")}>
          Voir sur Maps
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          Partager
        </button>
      </div>
    </div>
  );
}; 