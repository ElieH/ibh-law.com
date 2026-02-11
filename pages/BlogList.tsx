import React, { useEffect, useState } from 'react';
import { getBlogPosts, BlogPost } from '../services/contentful';
import BlogCard from '../components/Sections/BlogCard';

const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getBlogPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-brand-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3">BLOG & RESOURCES</h2>
                    <h1 className="font-serif text-4xl text-brand-dark font-bold mb-6">Latest Updates</h1>
                    <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
                    <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto">News, insights, and legal updates.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.sys.id} post={post} />
                        ))}
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-stone-500">No posts found. Check your Contentful setup.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
