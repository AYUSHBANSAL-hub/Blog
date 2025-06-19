"use client";

import React, { useState } from "react";
import BlogSection from "./Blog";
import ProductSection from "./product";
import Overlay from "./overlay";
import CategoryPage from "./category/Category";
import SubCategory from "./SubCategory/subCategoryBlogs";


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "BLOGS", href: "#" }]);

  const handleProductClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setBreadcrumbs([
      { label: "BLOGS", href: "#" },
      { label: category.toUpperCase(), href: "#" },
    ]);
  };

  const handleSubcategoryClick = (subcategory: string) => {
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
    } else if (index === 1) {
      setSelectedSubcategory(null);
      setBreadcrumbs(breadcrumbs.slice(0, 2));
    }
  };

  return (
    <div className="mt-14">
      {!selectedCategory ? (
        <>
          <BlogSection />
          <ProductSection onProductClick={handleProductClick} />
          <Overlay />
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
