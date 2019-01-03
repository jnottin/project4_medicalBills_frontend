import React, { Component } from 'react';
import './Map.css'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '83%',
    // border: '2px solid red',
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({
            [name]: value
        });
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
                <Map className="mapStyle"
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
                    {this.props.hospitals.map((hospital, i) => {
                        const index = i + 1;

                        // console.log(hospital)
                        return (
                            <Marker
                                key={hospital._id}
                                onClick={this.onMarkerClick}
                                name={hospital.name}
                                position={{ lat: hospital.lat, lng: hospital.lng }}
                                label={index.toString()}
                            >
                            </Marker>
                        )
                    })}
                    < InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4 className="infoWindow">{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>
            </div >
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4'
})(MapContainer);