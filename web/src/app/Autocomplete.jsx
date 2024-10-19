import React, {useRef} from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
var API_KEY = ""

const PlaceComponent = () => {
    const inputRef = useRef(null);

    const handlePlacesChanged = () => {
        const [place] = inputRef.current.getPlaces();
        console.log(place);
    };

    return (
        <LoadScript googleMapsApiKey=""
                    libraries={["places"]}
        >
            <StandaloneSearchBox onLoad={ref => (inputRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Where are you located?"
                />
            </StandaloneSearchBox>
        </LoadScript>
    );
}

export default PlaceComponent;