import React from 'react';
import HomeCard from './HomeCard';

function PropertyList({ properties }) {
  console.log({properties});
  return (
    <div className="container mt-2">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {properties.map(property => (
          <div key={property.id} className="col">
            <div className="mx-auto">
              <HomeCard
                place={property.place}
                area={property.area}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                hospitalsNearby={property.hospitalsNearby}
                collegesNearby={property.collegesNearby}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
