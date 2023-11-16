import CategorySection from "@/components/Home/Categories/Categories";
import Cover from "@/components/Home/Cover/Cover";
import categoriesHome from "@/utils/CategoriesHome.json";
import "@/css/Home/Categories/Categories.css";
import MostPopular from "@/components/Home/MostPolular/MostPopular";
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
      <div className="most-popular-container">
        <h2 className="subtitle-home-page">MOST POPULAR</h2>
        <a href="/pages/products" className="go-products">
          View all
        </a>
        <MostPopular />
      </div>
    </div>
  );
}
