import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  lat: number
  lng: number
  name: string
}

const MapComponent: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [locations, setLocations] = useState<Location[]>([])

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  }

  const defaultCenter = {
    lat: 37.7749, // Default to San Francisco
    lng: -122.4194,
  }

  const handleSearch = () => {
    if (searchTerm && city) {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )

      const request = {
        query: `${searchTerm} in ${city}`,
        fields: ['name', 'geometry'],
      }

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const newLocations =
            results?.map((place) => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name,
            })) || []
          setLocations(newLocations as Location[])
        }
      })
    }
  }

  return (
    <div>
      <h2>Search for Locations</h2>
      <input
        type='text'
        placeholder='Search Term'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type='text'
        placeholder='City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_API_KEY!}
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={12}
        >
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.lat, lng: loc.lng }}
              title={loc.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapComponent;