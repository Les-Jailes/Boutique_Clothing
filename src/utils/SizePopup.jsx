import "@/css/Cart/SizePopUp.css";

export const SizePopup = ({ handleSizeSelection, sizes, isSizePopupOpen }) => {
  return (
    <div className={`size-popup-container ${isSizePopupOpen ? "is-open" : ""}`}>
      {sizes.map((size, index) => (
        <button className="size-popup-container__button" key={index} onClick={() => handleSizeSelection(size)}>
          {size}
        </button>
      ))}
    </div>
  );
};