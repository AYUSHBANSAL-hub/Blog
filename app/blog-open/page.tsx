
import ArticleSection from '@/components/BlogArticle'
import SubscriptionSection from '@/components/CarouselBlog'
import Overlay from '@/components/main/overlay'
import SubscriptionBanner from '@/components/main/Subscription-Banner'
import React from 'react'

const BlogOpenPage = () => {
  return (
    <div className='mt-10'>
      <ArticleSection/>
      <SubscriptionBanner/>
      <SubscriptionSection/>
      <div className='md:mt-24'>
        <Overlay/>
      </div>
    </div>
  )
}

export default BlogOpenPage
