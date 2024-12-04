import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"; // Import the icons for arrows
import { render } from "react-dom";
import LocationForm from "../Components/LocationForm";
const apiKey = import.meta.env.VITE_API_KEY;

const SearchMap = () => {
	const [currentLocation, setCurrentLocation] = useState(null);
	const [recyclingCenters, setRecyclingCenters] = useState([]);
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const facilitiesPerPage = 6;
	const wasteTypeOptions = [
		"Consumer Electronics",
		"Household Electronics",
		"IT & Telecommunications Equipment",
		"Lightning",
		"Batteries",
		"Cables and Accessories",
		"Medical Equipment",
		"Renewable Energy Equipment",
		"Industrial Equipment",
	];

	const workingDayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	const indexOfLastFacility = currentPage * facilitiesPerPage;
	const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
	const currentFacilities = recyclingCenters.slice(indexOfFirstFacility, indexOfLastFacility);
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const totalPages = Math.ceil(recyclingCenters.length / facilitiesPerPage);
	const renderPagination = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} text-center`}
				>
					{i}
				</button>
			);
		}
		return <div className="flex space-x-2 mt-4 justify-center items-center">{pageNumbers}</div>;
	};
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
		googleMapsApiKey: apiKey, // Use your Google Maps API key
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

	const fetchDBFacilities = async () => {
		try {
			const res = await fetch("http://localhost:8000/api/v1/facility/get-all-facilities", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(res);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	// useEffect(() => {
	// 	fetchDBFacilities();
	// }, []);

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

	const findRecyclingCenters = async (location) => {
		const request = {
			location,
			radius: 50000,
			keyword: "e-waste recycling",
		};

		const service = new google.maps.places.PlacesService(document.createElement("div"));
		service.nearbySearch(request, async (results, status) => {
			console.log(status);
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				const updatedResults = await Promise.all(
					results.map(async (place) => {
						const { state, city, pincode } = await getStateCityPincode(place.place_id);
						return {
							...place,
							pickupAvailability: false,
							state,
							city,
							pincode,
							wasteTypeOptions: [
								wasteTypeOptions[Math.floor(Math.random() * wasteTypeOptions.length)],
								wasteTypeOptions[Math.floor(Math.random() * wasteTypeOptions.length)],
							].filter((value, index, self) => self.indexOf(value) === index),
							workingDayOptions: [
								workingDayOptions[Math.floor(Math.random() * workingDayOptions.length)],
								workingDayOptions[Math.floor(Math.random() * workingDayOptions.length)],
								workingDayOptions[Math.floor(Math.random() * workingDayOptions.length)],
								workingDayOptions[Math.floor(Math.random() * workingDayOptions.length)],
							].filter((value, index, self) => self.indexOf(value) === index),
						};
					})
				);
				setRecyclingCenters(updatedResults);
			} else {
				alert("No recycling centers found nearby.");
			}
		});
	};
	const getStateCityPincode = (placeId) => {
		return new Promise((resolve, reject) => {
			const geocoder = new google.maps.Geocoder();

			geocoder.geocode({ placeId }, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK && results[0]) {
					const addressComponents = results[0].address_components;
					let state = "";
					let city = "";
					let pincode = "";

					addressComponents.forEach((component) => {
						if (component.types.includes("administrative_area_level_1")) {
							state = component.long_name; // State
						}
						if (component.types.includes("locality")) {
							city = component.long_name; // City
						}
						if (component.types.includes("postal_code")) {
							pincode = component.long_name; // Pincode
						}
					});

					resolve({ state, city, pincode });
				} else {
					console.error("Geocoder failed due to:", status);
					resolve({ state: "Unknown", city: "Unknown", pincode: "Unknown" }); // Default values if not found
				}
			});
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
				<LocationForm address={address} handleAddressChange={handleAddressChange} submitLocation={submitLocation} closeForm={closeForm} />
			)}

			<div id="map" className="w-full h-96 mb-8 shadow-lg rounded-lg">
				<GoogleMap center={currentLocation || { lat: 20.5937, lng: 78.9629 }} zoom={14} mapContainerStyle={{ width: "100%", height: "100%" }}>
					{currentLocation ? (
						<Marker position={currentLocation} icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" zIndex={100} />
					) : (
						recyclingCenters.map((place, index) => (
							<Marker key={index} position={place.geometry.location} onClick={() => handleListItemClick(place)} zIndex={100} />
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
			{console.log(recyclingCenters)}
			<div className="flex flex-col gap-[1vh] items-center">
				<h1 className="text-2xl font-semibold my-4">Filters</h1>
				<div></div>
			</div>
			<ul id="places-list" className="space-y-4">
				{currentFacilities.map((place, index) => (
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
			{renderPagination()}
		</div>
	);
};

export default SearchMap;
