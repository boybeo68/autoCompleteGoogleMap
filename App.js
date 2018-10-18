import React from 'react';
import {StyleSheet, Text, View, Platform, TextInput, Dimensions} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Constants, Location, Permissions} from 'expo';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
export default class App extends React.Component {
    //    AIzaSyAHG9XH0ZpWpcfFZr3Q_6Uf4QdRnozW_48
    constructor(props) {
        super(props);
        this.state = {
            tripFrom: null,
            tripTo: null,
            tripStop: [],
        };
    }

    render() {
        const {tripFrom,tripStop,tripTo} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.statusBar}/>
                <View style={{flexDirection: 'row'}}>
                    <GooglePlacesAutocomplete
                        placeholder='Chọn điểm đi'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed={false}    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

                            this.setState(
                                {
                                    tripFrom: Object.assign(details.geometry.location,{description: details.formatted_address, title:details.address_components[0].short_name})
                                }
                            );
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyADMVfXyrF1LhxMVnu6AlAa0hPo3tQiyZ4',
                            language: 'vi', // language of the results
                            //types: '(cities)' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}

                        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        //currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        //predefinedPlaces={[homePlace, workPlace]}

                        debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        // renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <GooglePlacesAutocomplete
                        placeholder='Chọn điểm đến'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed={false}    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState(
                                {
                                    tripTo: Object.assign(details.geometry.location,{description: details.formatted_address, title:details.address_components[0].short_name})
                                }
                            );
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyADMVfXyrF1LhxMVnu6AlAa0hPo3tQiyZ4',
                            language: 'vi', // language of the results
                            //types: '(cities)' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}

                        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        //currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        //predefinedPlaces={[homePlace, workPlace]}

                        debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        // renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <GooglePlacesAutocomplete
                        placeholder='Chặng dừng chân'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed={false}    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyADMVfXyrF1LhxMVnu6AlAa0hPo3tQiyZ4',
                            language: 'vi', // language of the results
                            //types: '(cities)' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                            separator: {
                                backgroundColor: '#ff3526'
                            }
                        }}

                        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        //currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        //predefinedPlaces={[homePlace, workPlace]}

                        debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        // renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                </View>
                <MapView //21.031311, 105.820999
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: 21.031311,
                        longitude: 105.820999,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {this.state.tripFrom !== null ?  (<Marker
                        coordinate={{
                            //21.033715, 105.777915
                            latitude: this.state.tripFrom.lat,
                            longitude: this.state.tripFrom.lng
                        }}
                        title={tripFrom.title}
                        description={tripFrom.description}
                    />) : null}
                    {this.state.tripTo !== null ?  (<Marker
                        coordinate={{
                            //21.033715, 105.777915
                            latitude: this.state.tripTo.lat,
                            longitude: this.state.tripTo.lng
                        }}
                        pinColor='green'
                        title={tripTo.title}
                        description={tripTo.description}
                    />) : null}
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}

                </MapView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBar: {
        backgroundColor: "#C2185B",
        height: Constants.statusBarHeight,
    },
});
