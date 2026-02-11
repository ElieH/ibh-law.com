import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getBlogPostBySlug, BlogPost } from '../services/contentful';
import { ArrowLeft } from 'lucide-react';

import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getBlogPostBySlug(slug).then((fetchedPost) => {
                setPost(fetchedPost);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
                <Link to="/blog" className="text-blue-600 hover:text-blue-800">Return to Blog</Link>
            </div>
        )
    }

    const { title, coverImage, content, publishedDate } = post.fields;
    const imageUrl = coverImage?.fields.file.url;

    // Custom renderer options for Rich Text
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: any) => <b className="font-bold text-gray-900">{text}</b>,
            [MARKS.ITALIC]: (text: any) => <i className="italic text-gray-800">{text}</i>,
            [MARKS.UNDERLINE]: (text: any) => <u className="underline decoration-blue-400 decoration-2">{text}</u>,
            [MARKS.CODE]: (text: any) => <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-red-600">{text}</code>,
        },
        renderNode: {
            [BLOCKS.HEADING_1]: (_: any, children: any) => <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-10 mb-6">{children}</h1>,
            [BLOCKS.HEADING_2]: (_: any, children: any) => <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4 border-b pb-2 border-gray-100">{children}</h2>,
            [BLOCKS.HEADING_3]: (_: any, children: any) => <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>,
            [BLOCKS.HEADING_4]: (_: any, children: any) => <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>,
            [BLOCKS.PARAGRAPH]: (_: any, children: any) => <p className="mb-4 leading-relaxed text-gray-700 text-lg">{children}</p>,
            [BLOCKS.UL_LIST]: (_: any, children: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>,
            [BLOCKS.OL_LIST]: (_: any, children: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>,
            [BLOCKS.LIST_ITEM]: (_: any, children: any) => <li className="pl-2">{children}</li>,
            [BLOCKS.QUOTE]: (_: any, children: any) => (
                <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-6 bg-gray-50 italic text-gray-800 rounded-r-lg">
                    {children}
                </blockquote>
            ),
            [BLOCKS.HR]: () => <hr className="my-10 border-gray-200" />,
            [INLINES.HYPERLINK]: (node: any, children: any) => (
                <a
                    href={node.data.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                    {children}
                </a>
            ),
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { file, title } = node.data.target.fields;
                return (
                    <div className="my-8">
                        <img
                            src={`https:${file.url}`}
                            alt={title || "Blog Image"}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                        {title && <p className="text-sm text-center text-gray-500 mt-2 italic">{title}</p>}
                    </div>
                );
            },
            [BLOCKS.TABLE]: (_: any, children: any) => (
                <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full border-collapse table-auto">
                        <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
                    </table>
                </div>
            ),
            [BLOCKS.TABLE_ROW]: (_: any, children: any) => (
                <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
            ),
            [BLOCKS.TABLE_HEADER_CELL]: (_: any, children: any) => (
                <th className="px-4 py-3 bg-gray-100 text-left text-xs font-bold text-gray-800 uppercase tracking-wider border-r border-gray-200 last:border-r-0 border-b">
                    {children}
                </th>
            ),
            [BLOCKS.TABLE_CELL]: (_: any, children: any) => (
                <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0 break-words">
                    {children}
                </td>
            ),
        },
        renderText: (text: string) => {
            return text.split('\n').reduce((children: any[], textSegment, index) => {
                return [
                    ...children,
                    index > 0 && <br key={index} />,
                    textSegment.split(' ').map((word, i) => {
                        const urlRegex = /^(https?:\/\/[^\s]+)/g;
                        if (urlRegex.test(word)) {
                            return <a key={i} href={word} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{word} </a>;
                        }
                        return <span key={i}>{word} </span>;
                    })
                ];
            }, []);
        },
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Image */}
            {imageUrl && (
                <div className="w-full h-64 md:h-96 relative">
                    <img
                        src={`https:${imageUrl}`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
                    <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    <header className="mb-8">
                        <p className="text-sm text-blue-600 font-medium mb-2">
                            {new Date(publishedDate).toLocaleDateString()}
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h1>
                    </header>

                    <article className="max-w-none">
                        {documentToReactComponents(content, options)}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;
