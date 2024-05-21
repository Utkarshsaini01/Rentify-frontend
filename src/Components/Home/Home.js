import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import FilterForm from './FilterForm';
import PropertyList from './PropertyList';

function Home() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterFormVisible, setFilterFormVisible] = useState(false);
  const [filters, setFilters] = useState({
    place: '',
    minBedrooms: '',
    minBathrooms: '',
    minArea: '',
    hospitalsNearby: '',
    collegesNearby: '',
  });

  // Fetch properties from API when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const toggleFilterForm = () => {
    setFilterFormVisible(!filterFormVisible);
  };

  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      return (
        (filters.place === '' || property.place.toLowerCase().includes(filters.place.toLowerCase())) &&
        (filters.minBedrooms === '' || property.bedrooms >= Number(filters.minBedrooms)) &&
        (filters.minBathrooms === '' || property.bathrooms >= Number(filters.minBathrooms)) &&
        (filters.minArea === '' || property.area >= Number(filters.minArea)) && // Include area filter
        (filters.hospitalsNearby === '' || property.hospitalsNearby >= Number(filters.hospitalsNearby)) &&
        (filters.collegesNearby === '' || property.collegesNearby >= Number(filters.collegesNearby))
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <div className="container mt-3 d-flex justify-content-between">
        <h3 className="text-primary">
          <Link to="/" className="text-decoration-none">
            Rentify
          </Link>
        </h3>
        <div className="d-flex">
          <Link to="/login" className="btn btn-outline-secondary me-3">Login</Link>
          <Link to="/signup" className="btn btn-outline-secondary">Sign Up</Link>
        </div>
      </div>

      <div className="container mt-3 d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={toggleFilterForm}>
          <FaFilter /> Filter
        </button>
      </div>

      {filterFormVisible && (
        <FilterForm
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />
      )}

      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default Home;
