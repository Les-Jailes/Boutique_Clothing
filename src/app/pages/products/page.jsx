import { ClotheCard } from "@/app/components/ClotheCard";

const exampleProduct = {
  "name": "Clothe name",
  "image": "https://i.postimg.cc/cJtVQVGq/image-removebg-preview-4.png",
  "price": 650,
  "category": "Women",
  "colors": ['red', 'blue', 'green', 'black']
}

export default function page() {
  return (
    <div>
      <div className="filter-container"></div>
      <div className="product-container">
        <ClotheCard clothe={ exampleProduct } />
      </div>
    </div>
  );
};
