"use client";

import React, { use, useEffect, useState } from "react";
import NavigationBreadcrumbSection from "./navigation";
import BlogHero from "./Bloghero";
import SubcategoryList from "./subcategory";
import CategoryBlogs from "./blogsCategory";
import { useSearchParams } from "next/navigation";

interface Props {
  breadcrumbs: { label: string; href: string }[];
  onSubcategoryClick: (subcategory: string , subcategory_id : string) => void;
  onBreadcrumbClick: (index: number) => void;
  
}

type Blog = {
  blog_id: string;
  title: string;
  category: string;
  category_name: string;
  coverImageUrl: string;
  content?: string;
  [key: string]: any;
};

type Subcategory = {
  subcategory_id: string;
  subcategory_name: string;
  subcategory_image: string;
  subcategory_description: string;
  category_id: string;
};

const CategoryPage = ({
  breadcrumbs,
  onSubcategoryClick,
  onBreadcrumbClick,
}: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const categoryId = params.get("categoryId");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch(`/api/blogs/categories/${categoryId}`);
        const data = await res.json();

        if (data.status) {
          setBlogs(data.blogs || []);
          setSubcategories(data.subcategories || []);
        }
      } catch (error) {
        console.error("Failed to fetch category page data", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCategoryData();
  }, [categoryId]);

  const pinnedBlog = blogs.length > 0 ? blogs[0] : null;

  return (
    <div>
      <NavigationBreadcrumbSection
        items={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      
       <BlogHero  />

      <SubcategoryList
        subcategories={subcategories}
        onSubcategoryClick={onSubcategoryClick}
      />

      <div className="mb-16 pt-9">
        <CategoryBlogs blogs={blogs} />
      </div>
    </div>
  );
};

export default CategoryPage;
