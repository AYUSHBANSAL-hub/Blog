"use client";

import React, { useState } from "react";
import BlogSection from "./Blog";
import ProductSection from "./product";
import Overlay from "./overlay";
import CategoryPage from "./category/Category";
import SubCategory from "./SubCategory/subCategoryBlogs";
import CategoryProductSection from "./CategoryProduct";
import { useRouter } from "next/navigation";


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "", href: "" }]);
  const router = useRouter();

  const handleProductClick = (category: string , category_id:string) => {
    router.push(`/Blog?categoryId=${category_id}`);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setBreadcrumbs([
      { label: category.toUpperCase(), href: "" },
    ]);
  };

  const handleSubcategoryClick = (subcategory: string, subcategory_id: string) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("subcategoryId", subcategory_id); 

  router.push(currentUrl.pathname + "?" + currentUrl.searchParams.toString());

  setSelectedSubcategory(subcategory);
  setBreadcrumbs((prev) => [
    ...prev,
    { label: subcategory.toUpperCase(), href: "#" },
  ]);
};

 const handleBreadcrumbClick = (index: number) => {
  if (index === 0) {
    
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setBreadcrumbs([]);
    router.push("/Blog");
  } else if (index === 1) {
  
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("subcategoryId");

    router.push(currentUrl.pathname + "?" + currentUrl.searchParams.toString());

    setSelectedSubcategory(null);
    setBreadcrumbs(breadcrumbs.slice(0, 1));
  }
};

  return (
    <div>
      {!selectedCategory ? (
        <>
          <div className="md:mt-14">
          <BlogSection />
          </div>
          <div className="mt-3">
          <CategoryProductSection onProductClick={handleProductClick} />
          </div>
          <div className="mt-20">
            <Overlay />
          </div>
        </>
      ) : !selectedSubcategory ? (
        <CategoryPage
          breadcrumbs={breadcrumbs}
          onSubcategoryClick={handleSubcategoryClick}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      ) : (
        <SubCategory
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
      )}
    </div>
  );
}
