import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading post...</p>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-gradient-to-b from-slate-900/50 to-transparent">
            <Container>
                <div className="max-w-4xl mx-auto py-12">
                    {/* Featured Image Section */}
                    <div className="relative mb-12 group">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                                    <div className="w-8 h-8 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto max-h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl"></div>
                        </div>

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="absolute top-6 right-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Post Header */}
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        
                        {/* Post Meta */}
                        <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{new Date(post.$createdAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>By Author</span>
                            </div>
                        </div>
                    </header>

                    {/* Post Content */}
                    <div className="prose prose-lg prose-invert prose-slate max-w-none">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-xl">
                            <div className="post-content text-slate-200 leading-relaxed">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>

                    {/* Back Navigation */}
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Posts
                        </button>
                    </div>
                </div>
            </Container>

            <style jsx>{`
                .post-content h1, .post-content h2, .post-content h3 {
                    color: #f1f5f9;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                .post-content h1 { font-size: 2rem; font-weight: 700; }
                .post-content h2 { font-size: 1.5rem; font-weight: 600; }
                .post-content h3 { font-size: 1.25rem; font-weight: 600; }
                .post-content p {
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                }
                .post-content a {
                    color: #06b6d4;
                    text-decoration: underline;
                }
                .post-content a:hover {
                    color: #0891b2;
                }
                .post-content ul, .post-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 2rem;
                }
                .post-content li {
                    margin-bottom: 0.5rem;
                }
                .post-content blockquote {
                    border-left: 4px solid #06b6d4;
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: #cbd5e1;
                }
                .post-content code {
                    background-color: #475569;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                }
                .post-content pre {
                    background-color: #334155;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
            `}</style>
        </article>
    );
}