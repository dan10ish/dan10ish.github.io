"use client";

import { getBlogPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

export default function PostsPage() {
  const posts = getBlogPosts();

  return (
    <main>
      <BlogList posts={posts} showAll={true} />
      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
