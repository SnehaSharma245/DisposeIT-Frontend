import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"; // Import the icons for arrows

const SearchMap = () => {
	const [currentLocation, setCurrentLocation] = useState(null);
	const [recyclingCenters, setRecyclingCenters] = useState([]);
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [address, setAddress] = useState({
		state: "",
		city: "",
		pincode: "",
		address1: "",
		address2: "",
	});
	const [expandedPlaceIndex, setExpandedPlaceIndex] = useState(null); // Track which place's details are expanded

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyAi5KnjgODKDsVw2JaLzRMzo1tI9U9Md70", // Use your Google Maps API key
		libraries: ["places"],
	});

	useEffect(() => {
		if (currentLocation) {
			findRecyclingCenters(currentLocation);
		}
	}, [currentLocation]);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					setCurrentLocation(location);
				},
				() => handleLocationError(true),
				{ enableHighAccuracy: true }
			);
		} else {
			handleLocationError(false);
		}
	};

	const handleLocationError = (browserHasGeolocation) => {
		alert(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
	};

	const handleAddressChange = (e) => {
		const { id, value } = e.target;
		setAddress({ ...address, [id]: value });
	};

	const submitLocation = () => {
		const fullAddress = `${address.address1}, ${address.address2 ? address.address2 + ", " : ""}${address.city}, ${address.state}, ${
			address.pincode
		}`;
		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ address: fullAddress }, (results, status) => {
			if (status === "OK") {
				const location = results[0].geometry.location;
				setCurrentLocation(location);
				setIsFormVisible(false);
			} else {
				alert("Could not find location: " + status);
			}
		});
	};

	const findRecyclingCenters = (location) => {
		const request = {
			location,
			radius: 50000,
			keyword: "e-waste recycling",
		};

		const service = new google.maps.places.PlacesService(document.createElement("div"));
		service.nearbySearch(request, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				setRecyclingCenters(results);
			} else {
				alert("No recycling centers found nearby.");
			}
		});
	};

	const openForm = () => {
		setIsFormVisible(true);
	};

	const closeForm = () => {
		setIsFormVisible(false);
	};

	const handleListItemClick = (place) => {
		setSelectedPlace(place); // Set the selected place
		// Optionally, you can center the map on the selected marker
		setCurrentLocation(place.geometry.location);
	};

	const toggleExpandDetails = (index) => {
		setExpandedPlaceIndex(expandedPlaceIndex === index ? null : index); // Toggle expanded state
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<div className="relative">
			<h1 className="text-3xl font-bold text-center my-8">E-Waste Recycling Locator</h1>
			<div className="flex justify-center space-x-4 mb-8">
				<button
					onClick={openForm}
					className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				>
					Enter Location
				</button>
				<button
					onClick={getLocation}
					className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
				>
					Detect Current Location
				</button>
			</div>

			{isFormVisible && (
				<div
					id="popupForm"
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50"
				>
					<h2 className="text-xl  mb-4 font-bold text-gray-800">Enter Your Location</h2>
					<input
						type="text"
						id="state"
						placeholder="State"
						value={address.state}
						onChange={handleAddressChange}
						className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
					/>
					<input
						type="text"
						id="city"
						placeholder="City"
						value={address.city}
						onChange={handleAddressChange}
						className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
					/>
					<input
						type="text"
						id="pincode"
						placeholder="Pincode"
						value={address.pincode}
						onChange={handleAddressChange}
						className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
					/>
					<input
						type="text"
						id="address1"
						placeholder="Address Line 1"
						value={address.address1}
						onChange={handleAddressChange}
						className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
					/>
					<input
						type="text"
						id="address2"
						placeholder="Address Line 2 (Optional)"
						value={address.address2}
						onChange={handleAddressChange}
						className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
					/>
					<div className="flex justify-between">
						<button
							onClick={submitLocation}
							className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
						>
							Find Recycling Centers
						</button>
						<button
							onClick={closeForm}
							className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
						>
							Close
						</button>
					</div>
				</div>
			)}

			<div id="map" className="w-full h-96 mb-8 shadow-lg rounded-lg">
				<GoogleMap
					center={currentLocation || { lat: 20.5937, lng: 78.9629 }}
					zoom={14}
					mapContainerStyle={{ width: "100%", height: "100%" }}
				>
					{currentLocation ? (
						<Marker position={currentLocation} icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" zIndex={100} />
					) : (
						recyclingCenters.map((place, index) => (
							<Marker
								key={index}
								position={place.geometry.location}
								onClick={() => handleListItemClick(place)}
								zIndex={100}
							/>
						))
					)}

					{selectedPlace && (
						<InfoWindow
							position={selectedPlace.geometry.location}
							onCloseClick={() => setSelectedPlace(null)}
							options={{
								pixelOffset: new google.maps.Size(0, -25), // Move InfoWindow 40px below the marker (you can adjust this)
								zIndex: 5, // Ensure InfoWindow is beneath the marker
							}}
						>
							<div>
								<strong className="text-gray-900">{selectedPlace.name}</strong>
								<br />
								<span className="text-gray-700"> {selectedPlace.vicinity}</span>
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			</div>

			<ul id="places-list" className="space-y-4">
				{recyclingCenters.map((place, index) => (
					<li
						key={index}
						onClick={() => handleListItemClick(place)} // Click to select and update the marker
						className="bg-[#41ad5c] p-4 rounded-lg shadow-md hover:bg-[#2b9746] cursor-pointer m-4 "
					>
						<div className="flex justify-between items-center">
							<span className="font-semibold text-lg text-gray-200">{place.name}</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									toggleExpandDetails(index); // Prevent triggering list item click
								}}
							>
								{expandedPlaceIndex === index ? (
									<IoIosArrowUp size={20} className="text-gray-800 bg-[#41ad5c]" />
								) : (
									<IoIosArrowDown size={20} className="text-gray-800  bg-[#41ad5c]" />
								)}
							</button>
						</div>
						{expandedPlaceIndex === index && <div className="mt-2 text-gray-200">{place.vicinity}</div>}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchMap;
