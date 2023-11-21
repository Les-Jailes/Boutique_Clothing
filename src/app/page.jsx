import CategorySection from "@/components/Home/Categories/Categories";
import Cover from "@/components/Home/Cover/Cover";
import categoriesHome from "@/utils/CategoriesHome.json";
import "@/css/Home/Categories/Categories.css";
import OurProducts from "@/components/Home/OurProducts/OurProducts";
import "@/css/Home/MostPopular/MostPopular.css";

export default function Home() {
  return (
    <div className="home-page">
      <Cover />
      <div className="categories-container">
        <div className="categories-section">
          {categoriesHome.map((cateogy, index) => {
            return (
              <CategorySection
                category={cateogy.name}
                image={cateogy.image}
                isLarge={cateogy.isLarge}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="our-products-container">
        <h2 className="subtitle-home-page">OUR PRODUCTS</h2>
        <a href="/pages/products" className="go-products">
          View all
        </a>
        <OurProducts />
      </div>
    </div>
  );
}
