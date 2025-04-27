import { OverlayView } from '@react-google-maps/api';
import { Event, formatDate } from '@loca-local/shared';

interface EventMarkerProps {
  event: Event;
  onClick?: (event: Event) => void;
}

const eventTypeColors = {
  food: 'bg-blue-600',
  drink: 'bg-green-600',
  event: 'bg-purple-600',
  activity: 'bg-red-600'
};

const eventTypeNames = {
  food: 'Repas',
  drink: 'Boisson',
  event: 'Événement',
  activity: 'Activité'
};

export function EventMarker({ event, onClick }: EventMarkerProps) {
  const handleClick = () => {
    onClick?.(event);
  };

  return (
    <OverlayView
      position={{ lat: event.lat, lng: event.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="marker-container flex flex-col items-center -translate-y-full cursor-pointer text-nowrap"  onClick={handleClick}>
        <div className={`${eventTypeColors[event.type]} text-white rounded-lg p-2 text-center transform transition-transform hover:scale-110`}>
          <div className="text-sm font-bold">{formatDate(event.date)}</div>
          <div className="text-xs">{eventTypeNames[event.type]}</div>
        </div>
        <div 
          className={`${eventTypeColors[event.type]} w-4 h-4 -mt-2`}
          style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
        />
      </div>
    </OverlayView>
  );
} 