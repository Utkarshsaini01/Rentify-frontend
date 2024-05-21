import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HomeCard = (props) => {
  console.log(props);
  const { isAuthenticated, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      try {
        const response = await fetch(`http://localhost:5000/properties/${props._id}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsLiked(true);
          setLikes(likes + 1);
          toast.success("Property liked successfully!");
        } else {
          toast.error("Either you already liked the property or Failed to like the property.");
        }
      } catch (error) {
        toast.error("An error occurred while liking the property.");
      }
    }
  };

  const handleInterestedClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      try {
        const response = await fetch(`http://localhost:5000/properties/${props.id}/interested`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          toast.success("Seller details sent to your email!");
        } else {
          toast.error("Failed to send seller details.");
        }
      } catch (error) {
        toast.error("An error occurred while sending the seller details.");
      }
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">{props.place}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Price: INR. {props.price}</h6>
        <p className="card-text"><strong>Area:</strong> {props.area} sq. ft.</p>
        <p className="card-text"><strong>Bedrooms:</strong> {props.bedrooms}</p>
        <p className="card-text"><strong>Bathrooms:</strong> {props.bathrooms}</p>
        <p className="card-text"><strong>Hospitals Nearby:</strong> {props.hospitalsNearby}</p>
        <p className="card-text"><strong>Colleges Nearby:</strong> {props.collegesNearby}</p>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-success btn-sm" onClick={handleInterestedClick}>
            I'm Interested
          </button>
          <button
            className={`btn btn-sm d-flex align-items-center ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
            onClick={handleLikeClick}
          >
            <FaHeart className="me-2" /> {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
