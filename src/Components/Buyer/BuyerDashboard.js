import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import FilterForm from '../Home/FilterForm';
import PropertyList from '../Home/PropertyList';
import { AuthContext } from '../../Context/AuthContext';

const BuyerDashboard = () => {
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
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

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
        (filters.minArea === '' || property.area >= Number(filters.minArea)) &&
        (filters.hospitalsNearby === '' || property.hospitalsNearby >= Number(filters.hospitalsNearby)) &&
        (filters.collegesNearby === '' || property.collegesNearby >= Number(filters.collegesNearby))
      );
    });
    setFilteredProperties(filtered);
  };

  const handleLogout = () => {
    setAuth(false, '', ''); // Clear authentication state
    navigate('/login'); // Redirect to login page
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
          <button onClick={handleLogout} className="btn btn-outline-secondary">Logout</button>
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

export default BuyerDashboard;
