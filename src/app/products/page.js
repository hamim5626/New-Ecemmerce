import NewsLetter from "@/components/home/NewsLetter";
import AllProducts from "@/components/products/AllProducts";
import SectionBanner from "@/components/reusable/SectionBanner";

const ProductsPage = () => {
  return(
    <div>
        <SectionBanner
        title="Products"
        />
        <AllProducts/>
        <NewsLetter/>
    </div>
  )
};

export default ProductsPage;