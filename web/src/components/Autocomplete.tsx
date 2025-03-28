'use client'
import React, { useRef, useState, useEffect } from 'react'
import {
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import Select, { SingleValue } from 'react-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from './Spinner'
import logoIcon from '../../public/Storm_Partner.png'; // Import the local image



type Option = {
  value: string
  label: string
}

type Location = {
  lat: number
  lng: number
  name: string
  address?: string
  stormLocation: boolean
}

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

const stormHouseOptions: Location[] = [
  {
    lat: 32.787870,
    lng: -96.786885,
    name: 'Dallas CASA',
    address: '2757 Swiss Ave, Dallas, TX 75204',
    stormLocation: true,
  },
  {
    lat: 32.8105000,
    lng: -96.860172,
    name: 'Dallas Metro Homeless Alliance (Housing Forward)',
    address: '3000 Pegasus Park Dr, Dallas, TX 75247',
    stormLocation: true,
  },
]

const regularIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

const ResourceComponent: React.FC = () => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null)
  const [city, setCity] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 32.7767,
    lng: -96.797,
  })
  const [zoom, setZoom] = useState<number>(12)

  useEffect(() => {
    if (locations.length > 0) {
      setMapCenter({ lat: locations[0].lat, lng: locations[0].lng })
      setZoom(12)
    }
  }, [locations])

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
      if (place.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
        setZoom(13)
      }
    }
  }

  const handleSearch = () => {
    if (selectedOption && city) {
      setIsLoading(true)
      setError(null)
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
          setIsLoading(false)
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log(results)
            const newLocations: Location[] = results.map((place) => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name || '',
              address: place.formatted_address || '',
              stormLocation: false,
            }))
            if (selectedOption.value === 'emergency_shelter') {
              setLocations([...newLocations, ...stormHouseOptions])
            } else{
              setLocations(newLocations)
            }
          } else {
            setError('No results found. Please try a different search.')
          }
        }
      )
    } else {
      setError('Please select a resource category and enter a location.')
    }
  }

  return (
    <Card className='w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-8'>
      <CardHeader>
        <CardTitle className='text-2xl sm:text-3xl text-center' style={{color: "white", fontSize: 40}}>
          Find Local Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <LoadScript
            googleMapsApiKey={''}
            libraries={['places']}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <Input
                type='text'
                className='w-full'
                placeholder='Enter your location'
                style = {{background: 'white', color: '#2d69fa'}}
              />
            </StandaloneSearchBox>
          </LoadScript>

          <Select<Option>
            value={selectedOption}
            onChange={(option: SingleValue<Option>) =>
              setSelectedOption(option)
            }
            options={options}
            className='w-full'
            placeholder='Select a resource category'
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '36px',
                color: '#2d69fa'
              }),
            }}
          />

          <Button
            onClick={handleSearch}
            className='w-full'
            disabled={isLoading}
            style={{background: "white", color: "#2d69fa"}}
          >
            {isLoading ? <Spinner className='mr-2' /> : null}
            Search
          </Button>

          {error && (
            <Alert variant='destructive'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='h-[400px] sm:h-[500px] w-full'>
            <LoadScript
              googleMapsApiKey={''}
              libraries={['places']}
            >
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={mapCenter}
                zoom={zoom}
              >
                {locations.map((loc, index) => (
                  loc.stormLocation ? 
                    <Marker
                      key={index}
                      position={{ lat: loc.lat, lng: loc.lng }}
                      onClick={() => setSelectedLocation(loc)}
                      title={loc.name}
                      icon={{url: logoIcon.src, scaledSize: new google.maps.Size(60, 60)}}
                    />
                    :
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
                      <h3 className='text-lg font-semibold text-red-600'>
                        {selectedLocation.name}
                      </h3>
                      {selectedLocation.address && (
                        <p className='text-sm'>{selectedLocation.address}</p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          {locations.length > 0 && (
            <div className='mt-4'>
              <h3 className='text-xl font-semibold mb-2' style={{color:'white'}}>Search Results</h3>
              <ul className='space-y-2'>
                {locations.map((loc, index) => (
                  <li key={index} className='p-2 bg-gray-100 rounded'>
                    <h4 className='font-medium' style={{fontWeight:"bold"}}>{loc.name}</h4>
                    <p className='text-sm text-gray-600'>{loc.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ResourceComponent
