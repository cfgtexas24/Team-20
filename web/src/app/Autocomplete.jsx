import React, {useRef, useState} from 'react';
import { StandaloneSearchBox, LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select from 'react-select';


// Category Options for Resources dropdown: Can be added to DB for future customizations
const options = [
  { value: 'counseling', label: 'Counseling' },
  { value: 'mental_health', label: 'Mental Health' },
  { value: 'emergency_shelter', label: 'Emergency Shelter' },
  { value: 'financial_assistance', label: 'Financial Assistance' },
  { value: 'caregiver_resources', label: 'Caregiver Resources' },
  { value: 'food_pantry', label: 'Food Pantry' },
  { value: 'driver_license_services', label: 'Driver License Service' },
  { value: 'career_services', label: 'Career Services' },
  { value: 'hospital', label: 'Medical Help' },
];

const ResourcePage = () => {
  const inputRef = useRef(null);
  const [city, setCity] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  var mapCenter = { lat: 32.7767, lng: -96.7970 };
  if (locations.length > 0) {
    mapCenter = { lat: locations[0].lat, lng: locations[0].lng };
  }

    const handlePlacesChanged = () => {
        const [place] = inputRef.current.getPlaces();
        console.log(place);
        setCity(place.address_components[0].long_name);
    };

    const mapContainerStyle = {
      height: "400px",
      width: "100%"
    };


    const handleSearch = () => {
      if (selectedOption && city) {
        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        );
        
        const request = {
          query: `${selectedOption.label} in ${city}`,
          fields: ['category', 'geometry']
        };
        console.log(request);
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const newLocations = results?.map(place => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name,
              address: place.formatted_address,
            })) || [];
            setLocations(newLocations);
          }
        });
      }
    };

    return (
        <>
        <LoadScript googleMapsApiKey={API_KEY}
                    libraries={["places"]}
        >
            <StandaloneSearchBox onLoad={ref => inputRef.current = ref}
                onPlacesChanged={handlePlacesChanged}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Where are you located?"
                />
            </StandaloneSearchBox>
        </LoadScript>
        <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        />
        <button onClick={handleSearch}>Search</button>
        <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
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
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)} // Close the InfoWindow
            >
              <div>
                <h3 color="red">{selectedLocation.name}</h3>
                {selectedLocation.address && <p>{selectedLocation.address}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      </>
    );
}

export default ResourcePage;