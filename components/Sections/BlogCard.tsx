import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../services/contentful';
import { Layout } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const { title, slug, coverImage, publishedDate } = post.fields;
    const imageUrl = coverImage?.fields.file.url;

    return (
        <Link to={`/blog/${slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-stone-100 hover:border-brand-gold/30">
            <div className="aspect-video w-full overflow-hidden bg-stone-100 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10"></div>
                {imageUrl ? (
                    <img
                        src={`https:${imageUrl}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <Layout className="w-12 h-12" />
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="text-sm text-brand-gold font-medium mb-3 tracking-wide uppercase">
                    {new Date(publishedDate).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-red transition-colors mb-3 line-clamp-2">
                    {title}
                </h3>
                <div className="flex items-center text-brand-red text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Read Article →
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
