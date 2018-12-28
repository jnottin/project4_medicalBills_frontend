import React, { Component } from 'react';
import './Map.css'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '60%',
    height: '80%'
};

// STOP GOING BAKC
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            markerObjects: [
                {
                    id: 1,
                    name: 'Arlington Hospital',
                    lng: 38.88845,
                    lat: -77.1272,
                    cost: 2000
                },
                {
                    id: 2,
                    name: 'Witlows On Wilson',
                    lng: 38.8885,
                    lat: -77.0931,
                    cost: 2000
                },
            ]
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {
        const google = window.google;
        return (
            <div>
                <h2 className="map-title">Map</h2>
                <h3 className="location-searched">Location Searched: {this.props.location}</h3>
                <Map
                    google={this.props.google}
                    zoom={this.props.zoom}
                    style={mapStyles}
                    initialCenter={{
                        lat: 38.8816,
                        lng: -77.0910
                    }}
                    center={{
                        lat: this.props.userCoordinates.lat,
                        lng: this.props.userCoordinates.lng
                    }}
                >
                    {/* WORKING ON SHOWING ALL MARKERS FOR HOSPITALS */}
                    {this.props.hospitals.map((hospital) => {
                        console.log(hospital)
                        return (
                            <Marker
                                key={hospital._id}
                                onClick={this.onMarkerClick}
                                name={hospital.name}
                                position={{ lat: hospital.lat, lng: hospital.lng }}
                            >
                            </Marker>

                        )
                    })}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                            {/* FIGURE OUT WHAT IS GOING ON ABOVE */}
                            {/* <h4>Cost: ${this.state.selectedPlace.cost}</h4> */}
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4'
})(MapContainer);