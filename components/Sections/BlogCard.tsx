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
        <Link to={`/blog/${slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
                {imageUrl ? (
                    <img
                        src={`https:${imageUrl}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Layout className="w-12 h-12" />
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                    {new Date(publishedDate).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
            </div>
        </Link>
    );
};

export default BlogCard;
