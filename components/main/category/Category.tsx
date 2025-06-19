import React from "react";
import NavigationBreadcrumbSection from "./navigation";
import BlogHero from "./Bloghero";
import SubcategoryList from "./subcategory";
import CategoryBlogs from "./blogsCategory";

interface Props {
  breadcrumbs: { label: string; href: string }[];
  onSubcategoryClick: (subcategory: string) => void;
  onBreadcrumbClick: (index: number) => void;
}

const CategoryPage = ({ breadcrumbs, onSubcategoryClick, onBreadcrumbClick }: Props) => {
  return (
    <div>
      <NavigationBreadcrumbSection
        items={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
      <BlogHero />
      <SubcategoryList onSubcategoryClick={onSubcategoryClick} />
      <CategoryBlogs />
    </div>
  );
};

export default CategoryPage;
