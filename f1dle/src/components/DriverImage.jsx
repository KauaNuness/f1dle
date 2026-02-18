function DriverImage({ driver, revealed }) {
  return (
    <div className="image-container">
      <img
        src={driver.image}
        alt={driver.name}
        className={revealed ? "clear" : "blur"}
      />
    </div>
  );
}

export default DriverImage;
