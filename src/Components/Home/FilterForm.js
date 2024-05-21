import React from 'react';

function FilterForm({ filters, setFilters, applyFilters }) {
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Filter Properties</h5>
          <form>
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Place"
                  name="place"
                  value={filters.place}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Area"
                  name="area"
                  value={filters.area}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Minimum Bedrooms"
                  name="minBedrooms"
                  value={filters.minBedrooms}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Minimum Bathrooms"
                  name="minBathrooms"
                  value={filters.minBathrooms}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Hospitals Nearby"
                  name="hospitalsNearby"
                  value={filters.hospitalsNearby}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Colleges Nearby"
                  name="collegesNearby"
                  value={filters.collegesNearby}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;
