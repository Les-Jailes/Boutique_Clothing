import "@/css/Cart/SizePopUp.css";

export const SizePopup = ({ handleSizeSelection, sizes, isSizePopupOpen }) => {
  const sizeStrings = sizes.map((size) => size.size);

  return (
    <div className={`size-popup-container ${isSizePopupOpen ? "is-open" : ""}`}>
      {sizeStrings.map((size, index) => (
        <button className="size-popup-container__button" key={index} onClick={() => handleSizeSelection(size)}>
          {size}
        </button>
      ))}
    </div>
  );
};