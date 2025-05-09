import React, { useState, useEffect, useContext } from "react";
import NavBark from "../modules/NavBark";
import { Link } from "react-router-dom";
import { get } from "../../utilities";
import "./Events.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dimMode, setDimMode] = useState(false);

  const { user } = useContext(UserContext);

  const changeDimMode = () => {
    setDimMode(!dimMode);
  };

  useEffect(
    () => {
      document.title = "Events";

      get("/api/events", {}).then((eventObjs) => {
        let reversedEventObjs = eventObjs.reverse();
        setEvents(reversedEventObjs); // Set all articles
        setFilteredEvents(reversedEventObjs); // Set filtered trees to all articles initially
      });
    },
    [
      /*user.googleid*/
    ]
  );

  useEffect(() => {
    // Apply search filter whenever trees or searchQuery changes
    const filtered = events.filter((event) =>
      event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [events, searchQuery]); // Run this effect whenever `trees` or `searchQuery` changes

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // This will trigger the above useEffect and update filteredTrees
  };
  /*
  const changeAddMode = () => {
    setAddMode(!addMode);
  };

  const handleAddProject = (newTree) => {
    // first, add the project to the project list
    setTrees((trees) => [newTree, ...trees]);

    // then, change add mode
    changeAddMode();

    // then, navigate to that project
    navigate("/Project/" + newTree.tree_id);
  };

  const handleClose = () => {
    changeAddMode();
  };*/

  let eventsList = null;
  const hasEvents = filteredEvents.length !== 0;
  if (hasEvents) {
    eventsList = filteredEvents.map((eventObj) => (
      <div className="Events-SingleEventContainer u-flex" key={eventObj.event_id}>
        <img className="Events-image" src={eventObj.event_image} alt={`${eventObj.event_name}`} />
        <div>
          <h2 className="Events-SingleEventName">{eventObj.event_name}</h2>
          <div className="Events-SingleEventInfo">
            <p>
              <span className="u-bold">Event Time:</span>{" "}
              {new Date(eventObj.event_start_date).toLocaleString("en-US", {
                weekday: "short", // e.g., "Fri"
                month: "short", // e.g., "May"
                day: "numeric", // e.g., 9
                hour: "numeric", // e.g., 7 PM
                minute: "2-digit", // e.g., 07 PM
                hour12: true,
              })}{" "}
              -{" "}
              {new Date(eventObj.event_end_date).toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>
              <span className="u-bold">Event Location:</span> {eventObj.event_location}
            </p>
            <p>{eventObj.event_description}</p>
            <p></p>
          </div>
        </div>
      </div>
    ));
  } else {
    eventsList = <div>No events found!</div>;
  }

  return (
    <div className={dimMode ? "Events-dimmode" : "Events-viewmode"}>
      <NavBark dimmed={dimMode} />
      <div className="Events-Container">
        <div className="Events-Title">
          <h1 className="Events-Titletext">All Events</h1>
        </div>

        <div className="Events-SearchAndAdd">
          {/*
          <button
            className="Articles-AddButton"
            onClick={changeDimMode}
            aria-label="Add New Project"
          >
            +
          </button>*/}
          <input
            type="text"
            className="Events-SearchBar"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* dimMode && (
          <AddTreePopup
            className="Articles-filterpopup"
            handleAddProject={handleAddProject}
            closePopup={handleClose}
          />
        ) */}
        <div className="Events-EventList">{eventsList}</div>
      </div>
    </div>
  );
};

export default Events;
