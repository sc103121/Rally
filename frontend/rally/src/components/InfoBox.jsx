import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./InfoBox.css"; // Import the CSS file

function InfoBox({ onDescriptionClick, event }) {
  return (
    <div className="layout-wrapper">
      <div className="main-box rounded-box" onClick={onDescriptionClick}>
        Description
        <br />
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6, // Number of lines before truncation
            // whiteSpace: "nowrap",
          }}
        >
          {event.eventDescription}
        </p>
      </div>
      <div className="column-box">
        <div className="small-box rounded-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "space-around",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <LocationOnOutlinedIcon />{" "}
            <div>
              {event.eventLocation}
              <br />
              <a style={{ color: "gray" }}>Location</a>
            </div>
          </div>
        </div>
        <div className="small-box rounded-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "space-around",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <AccessTimeOutlinedIcon />{" "}
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {event.eventDate}
              <br />
              <a style={{ color: "gray" }}>{event.eventTime}</a>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            flexShrink: 1,
          }}
          className="small-box rounded-box"
        >
          Going <CheckOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
