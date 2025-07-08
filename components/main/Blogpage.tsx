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
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "BLOGS", href: "#" }]);
  const router = useRouter();

  const handleProductClick = (category: string , category_id:string) => {
    router.push(`/Blog?categoryId=${category_id}`);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setBreadcrumbs([
      { label: "BLOGS", href: "" },
      { label: category.toUpperCase(), href: "" },
    ]);
  };

  const handleSubcategoryClick = (subcategory: string , subcategory_id:string) => {
    router.push(`/Blog?subcategoryId=${subcategory_id}`);
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
      setBreadcrumbs([{ label: "BLOGS", href: "#" }]);
      router.push("/Blog");
    } else if (index === 1) {
      setSelectedSubcategory(null);
      setBreadcrumbs(breadcrumbs.slice(0, 2));
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
