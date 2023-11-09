import "@/css/Cart/SizePopUp.css"

const SizePopup = ({ handleSizeSelection, sizes }) => {
  return (
    <div className="size-popup-container">
      {sizes.map((size, index) => (
        <button className="size-popup-container__button" key={index} onClick={() => handleSizeSelection(size)}>
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizePopup;