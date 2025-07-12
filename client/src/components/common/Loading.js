import { ReactComponent as Load } from "../../img/materials/loading.svg";

const Loading = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    pointerEvents: "none",
    zIndex: 9999,
    backgroundColor: "#1E2126",
    opacity: 0.25,
    height: "100%",
    width: "100%",
  };

  const loadStyle = {
    animation: "spin 2s linear infinite",
    opacity: 0.75,
  };

  return (
    <div style={containerStyle}>
      <Load style={loadStyle} />
    </div>
  );
};

export default Loading;
