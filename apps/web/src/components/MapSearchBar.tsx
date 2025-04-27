import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';

interface MapSearchBarProps {
  onPlaceSelected: (location: { lat: number; lng: number }) => void;
  onCenterOnUser: () => void;
}

export const MapSearchBar: React.FC<MapSearchBarProps> = ({ onPlaceSelected, onCenterOnUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placePredictions, setPlacePredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useClickAway(dropdownRef, () => {
    setDisplayPredictions(false);
  });

  useEffect(() => {
    const initAutocompleteService = () => {
      if (window.google?.maps?.places?.AutocompleteService) {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      } else {
        setTimeout(initAutocompleteService, 1000);
      }
    };

    initAutocompleteService();
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!searchQuery || !sessionToken) return;

      try {
        const service = new google.maps.places.AutocompleteService();
        const response = await service.getPlacePredictions({
          input: searchQuery,
          componentRestrictions: { country: 'fr' },
          sessionToken: sessionToken,
        });
        setPlacePredictions(response.predictions);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPlacePredictions([]);
      }
    };

    fetchPredictions();
  }, [searchQuery, sessionToken]);

  const selectPlace = async (place: google.maps.places.AutocompletePrediction) => {
    if (!window.google?.maps?.Geocoder) {
      console.error('Google Maps Geocoder not available');
      return;
    }

    const geocoder = new google.maps.Geocoder();
    try {
      if (!place) return;
      const results = await geocoder.geocode({ placeId: place.place_id });
      if (results.results[0]) {
        const location = results.results[0].geometry.location;
        onPlaceSelected({
          lat: location.lat(),
          lng: location.lng(),
        });
        setSearchQuery(place.structured_formatting.main_text);
        setPlacePredictions([]);
      }
    } catch (error) {
      console.error('Error geocoding place:', error);
    }
    setDisplayPredictions(false);
  };

  return (
    <div className="flex gap-4 p-3 bg-white rounded-xl shadow-lg">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Rechercher autour de..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef}
          onClick={() => setDisplayPredictions(true)}
        />
        {placePredictions.length > 0 && displayPredictions && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto z-20"
          >
            {placePredictions.map((prediction, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => selectPlace(prediction)}
              >
                <div className="font-medium">{prediction.structured_formatting.main_text}</div>
                <div className="text-sm text-gray-500">
                  {prediction.structured_formatting.secondary_text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer flex-nowrap"
        onClick={onCenterOnUser}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="flex text-nowrap">Autour de moi</div>
      </button>
    </div>
  );
}; 