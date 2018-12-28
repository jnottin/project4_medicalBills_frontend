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
            // userCoordinates: {
            //     lat: 38.8816,
            //     lng: -77.0910
            // },
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
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.setMapCenter = this.setMapCenter.bind(this);
    }


    // setMapCenter() {
    //     this.setState({
    //         userCoordinates: {
    //             lat: 40.8816,
    //             lng: -77.0910
    //         }
    //     })
    //     console.log(this.state.userCoordinates)
    // }

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
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.props.userCoordinates.lat,
                        lng: this.props.userCoordinates.lng
                    }}
                >
                    {/* WORKING ON SHOWING ALL MARKERS FOR HOSPITALS */}
                    {/* {this.state.markerObjects.map((marker, index) => {
                        return (
                            <Marker
                                key={marker.id}
                                onClick={this.onMarkerClick}
                                name={marker.name}
                                position={{ lat: marker.lat, lng: marker.lng }}
                            />
                        )
                    })} */}
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Kenyatta International Convention Centre'}
                    />
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Witlows On Wilson'}
                        position={{ lat: 38.8885, lng: -77.0931 }}
                    />
                    {/* INFOWINDOW IS CONSTANT FOR ALL MARKERS, ONLY NEEDS ONE */}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                            {/* NEED TO GET COST CORRECT */}
                            <h4>Cost: ${this.state.markerObjects[1].cost}</h4>
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