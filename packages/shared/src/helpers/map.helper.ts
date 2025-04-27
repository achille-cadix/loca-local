export  const franceCenter = {
  lat: 46.603354,
  lng: 1.888334
};

export const filterItemsByDistance = <T extends { lat: number; lng: number }>(locationItems: T[], location: { lat: number; lng: number }) => {
    const filteredItems = locationItems.filter((item: T) => {
        const R = 6371; 
        const lat1 = (location.lat * Math.PI) / 180;
        const lat2 = (item.lat * Math.PI) / 180;
        const deltaLat = ((item.lat - location.lat) * Math.PI) / 180;
        const deltaLng = ((item.lng - location.lng) * Math.PI) / 180;
  
        const a =
          Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
  
        return distance <= 50;
      });

    return filteredItems;
};