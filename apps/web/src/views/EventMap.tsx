import { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { EventMarker } from '../components/EventMarker';
import { MapSearchBar } from '../components/MapSearchBar';
import { AppHeader } from '../components/AppHeader';
import { EventModal } from '../components/EventModal';
import { EventList } from '../components/EventList';
import type { Event } from '@loca-local/shared';
import { fakeEvents } from '../fake-data/fake-events';
import { filterItemsByDistance, franceCenter } from '@loca-local/shared';


export function EventMap() {
  const [mapCenter, setMapCenter] = useState(franceCenter);
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(fakeEvents);
  const MapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setMapCenter({ lat: event.lat, lng: event.lng });
    setMapZoom(10);
    setIsDrawerOpen(false);
    centerMapAndFilterEventsOnLocation({ lat: event.lat, lng: event.lng });
  };

  const handlePlaceSelected = (location: { lat: number; lng: number }) => {
    setMapCenter(location);
    setMapZoom(10);
    centerMapAndFilterEventsOnLocation(location);
  };

  const centerMapAndFilterEventsOnLocation = (location: { lat: number; lng: number }) => {
    const filteredEvents = filterItemsByDistance(fakeEvents, location);

    setFilteredEvents(filteredEvents);
  };

  const handleCenterOnUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(location);
          setMapZoom(12);
          centerMapAndFilterEventsOnLocation(location);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const resetMap = () => {
    setMapCenter(franceCenter);
    setMapZoom(6);
    setFilteredEvents(fakeEvents);
    setIsDrawerOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      
      <div className="absolute top-20 left-0 right-0 z-10 p-4">
        <MapSearchBar 
          onPlaceSelected={handlePlaceSelected}
          onCenterOnUser={handleCenterOnUser}
        />
      </div>

      <div className="flex-1 relative h-full">
        <LoadScript 
          googleMapsApiKey={MapsApiKey}
          libraries={['places']}
        >
          <GoogleMap
            mapContainerStyle={{
              width: '100%',  
              height: '100%'
            }}
            center={mapCenter}
            zoom={mapZoom}
            options={{
              styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {fakeEvents.map((event) => (
              <EventMarker
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <div
        className={`fixed z-20 bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-120px)]'
        }`}
      >
        <div className="py-4 flex flex-col items-center">
          <div
            className="cursor-pointer flex flex-col w-full items-center"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <div className="w-20 h-1.5 bg-gray-300 rounded-full mb-4"></div>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredEvents?.length
              ? `${filteredEvents.length} événements proches de vous`
              : "Aucun événement proche de vous :("}
          </div>
          {filteredEvents?.length !== fakeEvents.length && (
            <div
              className="text-sm text-blue-500 font-medium cursor-pointer hover:underline"
              onClick={resetMap}
            >
              Voir tous les événements
            </div>
          )}
        </div>

        <div className="px-6 pb-4 max-h-[70vh] overflow-y-auto">
          <EventList
            events={filteredEvents}
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
} 