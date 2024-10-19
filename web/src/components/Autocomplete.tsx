'use client'
import React, { useRef, useState } from 'react'
import {
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import Select, { SingleValue } from 'react-select'

// Define types for our options and locations
type Option = {
  value: string
  label: string
}

type Location = {
  lat: number
  lng: number
  name: string
  address?: string
}

// Category Options for Resources dropdown: Can be added to DB for future customizations
const options: Option[] = [
  { value: 'counseling', label: 'Counseling' },
  { value: 'mental_health', label: 'Mental Health' },
  { value: 'emergency_shelter', label: 'Emergency Shelter' },
  { value: 'financial_assistance', label: 'Financial Assistance' },
  { value: 'caregiver_resources', label: 'Caregiver Resources' },
  { value: 'food_pantry', label: 'Food Pantry' },
  { value: 'driver_license_services', label: 'Driver License Service' },
  { value: 'career_services', label: 'Career Services' },
  { value: 'hospital', label: 'Medical Help' },
]

const ResourceComponent: React.FC = () => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null)
  const [city, setCity] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )

  let mapCenter: { lat: number; lng: number } = { lat: 32.7767, lng: -96.797 }
  if (locations.length > 0) {
    mapCenter = { lat: locations[0].lat, lng: locations[0].lng }
  }

  const handlePlacesChanged = () => {
    const places = inputRef.current?.getPlaces()
    if (places && places.length > 0) {
      const place = places[0]
      const cityComponent = place.address_components?.find((component) =>
        component.types.includes('locality')
      )
      if (cityComponent) {
        setCity(cityComponent.long_name)
      }
    }
  }

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  }

  const handleSearch = () => {
    if (selectedOption && city) {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      )

      const request = {
        query: `${selectedOption.label} in ${city}`,
        fields: ['name', 'geometry', 'formatted_address'],
      }

      service.textSearch(
        request as google.maps.places.TextSearchRequest,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const newLocations: Location[] = results.map((place) => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name || '',
              address: place.formatted_address || '',
            }))
            setLocations(newLocations)
          }
        }
      )
    }
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_API_KEY!}
        libraries={['places']}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type='text'
            className='form-control'
            placeholder='Where are you located?'
          />
        </StandaloneSearchBox>
      </LoadScript>
      <Select<Option>
        value={selectedOption}
        onChange={(option: SingleValue<Option>) => setSelectedOption(option)}
        options={options}
      />
      <button onClick={handleSearch}>Search</button>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_API_KEY!}
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={12}
        >
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.lat, lng: loc.lng }}
              onClick={() => setSelectedLocation(loc)}
              title={loc.name}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3 style={{ color: 'red' }}>{selectedLocation.name}</h3>
                {selectedLocation.address && <p>{selectedLocation.address}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default ResourceComponent
