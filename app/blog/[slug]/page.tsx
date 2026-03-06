import { blogPosts } from '@/lib/blog-content';
import { notFound } from 'next/navigation';
import ToolNavbar from '@/components/ToolNavbar';
import Footer from '@/components/Footer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import ComparisonTable from '@/components/blog/ComparisonTable';
import DetectionPatterns from '@/components/blog/DetectionPatterns';
import SectionDivider from '@/components/blog/SectionDivider';

interface Props {
    params: Promise<{
        slug: string;
    }>
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost(props: Props) {
    const params = await props.params;
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 font-[family-name:var(--font-metro)] text-gray-900 dark:text-white selection:bg-orange-100 dark:selection:bg-orange-900">
            <ToolNavbar />

            <article className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
                {/* Navigation */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 dark:text-white hover:text-orange-500 transition-colors text-xs font-bold uppercase tracking-widest mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-500 dark:text-gray-900 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-8 font-display leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-white border-b border-gray-200 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-orange-500" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-orange-500" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg prose-orange max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-table:border prose-table:border-gray-200 dark:prose-table:border-slate-700 prose-text-gray-600 dark:prose-text-gray-300 dark:text-white prose-th:bg-gray-50 dark:prose-th:bg-slate-800 prose-th:text-gray-900 dark:prose-th:text-white prose-th:p-4 prose-td:p-4 prose-td:text-gray-600 dark:prose-td:text-gray-300 prose-tr:border-b prose-tr:border-gray-100 dark:prose-tr:border-slate-800">

                    {/* Custom Components Mapping */}
                    {(() => {
                        const markdownComponents = {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            hr: ({ node, ...props }: React.ComponentPropsWithoutRef<'hr'> & { node?: any }) => <SectionDivider {...props} />
                        };

                        if (post.slug === 'top-ai-humanizer-tools-comparison-2026') {
                            return (
                                <>
                                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content.split('## At a Glance')[0]}</Markdown>
                                    <ComparisonTable />
                                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{'## 1. Scripthuman' + post.content.split('## 1. Scripthuman')[1]}</Markdown>
                                </>
                            );
                        }

                        if (post.slug === 'how-to-bypass-ai-detection-2026') {
                            return (
                                <>
                                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content.split('## 🔍 Why Do AI Detectors')[0]}</Markdown>
                                    <DetectionPatterns />
                                    <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{'## 🔍 Why Do AI Detectors' + post.content.split('## 🔍 Why Do AI Detectors')[1]}</Markdown>
                                </>
                            );
                        }

                        return <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</Markdown>;
                    })()}
                </div>

                {/* CTA */}
                <div className="mt-20 p-8 lg:p-12 bg-gray-900 rounded-3xl text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold font-display mb-4">Ready to Humanize Your Content?</h3>
                        <p className="text-gray-400 dark:text-white mb-8 max-w-xl mx-auto">
                            Bypass detectors and engage your audience with Scripthuman&apos;s advanced forensic engine.
                        </p>
                        <Link href="/writing-room" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                            Start Humanizing Free
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
