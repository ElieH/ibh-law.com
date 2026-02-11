import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
    space: spaceId,
    accessToken: accessToken,
});

export interface BlogPost {
    sys: {
        id: string;
        createdAt: string;
    };
    fields: {
        title: string;
        slug: string;
        coverImage?: {
            fields: {
                file: {
                    url: string;
                };
            };
        };
        content: Document; // Rich Text Document
        publishedDate: string;
        shortDescription?: string;
    };
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await client.getEntries({
            content_type: 'blogPost',
            order: ['-fields.publishedDate'],
        });
        return response.items as unknown as BlogPost[];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const response = await client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug,
            limit: 1,
        });

        if (response.items.length > 0) {
            return response.items[0] as unknown as BlogPost;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }
};
