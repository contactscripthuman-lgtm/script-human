import Link from 'next/link';
import { blogPosts} from '@/lib/blog-content';
import { ArrowRight, Calendar, Clock, Tag} from 'lucide-react';
import { Metadata} from 'next';
import ToolNavbar from '@/components/ToolNavbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Blog | Scripthuman - AI Detection & Content Tips',
    description: 'Latest insights on bypassing AI detection, SEO strategies for AI content, and the future of generative writing.',
};

export default function BlogListing() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 font-[family-name:var(--font-metro)] text-gray-900 dark:text-white selection:bg-orange-100 dark:selection:bg-orange-900">
            <ToolNavbar />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4 block font-display">
                        Latest Insights
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 font-display">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Human</span> Angle
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-white max-w-2xl mx-auto leading-relaxed">
                        Expert guides on bypassing AI detection, mastering SEO with generative tools, and writing with authentic human impact.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-900/50 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-white text-[10px] font-bold uppercase tracking-wider rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 dark:text-white mb-8 line-clamp-3 flex-grow leading-relaxed">
                                {post.description}
                            </p>

                            {/* Meta & Action */}
                            <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs text-gray-400 dark:text-white font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


        </main>
    );
}
