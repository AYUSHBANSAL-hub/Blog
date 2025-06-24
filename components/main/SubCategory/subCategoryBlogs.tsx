import React from "react";

import SubCategoryBlogs from "./blogSubcategory";
import NavigationBreadcrumbSection from "../category/navigation";
import BlogHero from "../category/Bloghero";

interface Props {
  breadcrumbs: { label: string; href: string }[];
  onBreadcrumbClick: (index: number) => void;
}

const SubCategory = ({ breadcrumbs, onBreadcrumbClick }: Props) => {
  return (
    <div>
      <NavigationBreadcrumbSection
        items={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
      <BlogHero />
      <div className="pb-16 pt-7">
      <SubCategoryBlogs />
      </div>
    </div>
  );
};

export default SubCategory;
