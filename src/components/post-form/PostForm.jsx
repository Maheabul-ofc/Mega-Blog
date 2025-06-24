import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-100 mb-4">
                        {post ? "Edit Post" : "Create New Post"}
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {post ? "Update your existing blog post" : "Share your thoughts with the world"}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                    <form onSubmit={handleSubmit(submit)} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Main Content Section */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Post Title
                                    </label>
                                    <Input
                                        placeholder="Enter an engaging title for your post..."
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:bg-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                                        {...register("title", { required: true })}
                                    />
                                </div>

                                {/* Slug Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-200 mb-2 ">
                                        URL Slug
                                        <span className="text-slate-400 font-normal ml-2">(Auto-generated from title)</span>
                                    </label>
                                    <Input
                                        placeholder="post-url-slug"
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 focus:bg-slate-600/50"
                                        {...register("slug", { required: true })}
                                        onInput={(e) => {
                                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                        }}
                                    />
                                </div>

                                {/* Content Editor */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Content
                                    </label>
                                    <div className="bg-slate-700/30 border border-slate-600 rounded-lg overflow-hidden">
                                        <RTE 
                                            name="content" 
                                            control={control} 
                                            defaultValue={getValues("content")} 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Section */}
                            <div className="space-y-6">
                                {/* Featured Image Upload */}
                                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Featured Image
                                    </h3>
                                    
                                    <Input
                                        type="file"
                                        className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer cursor-pointer transition-all duration-200 focus:bg-slate-600/50"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("image", { required: !post })}
                                    />
                                    
                                    {post && (
                                        <div className="mt-4">
                                            <p className="text-sm text-slate-400 mb-2">Current Image:</p>
                                            <div className="relative overflow-hidden rounded-lg border-2 border-slate-600">
                                                <img
                                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Post Status */}
                                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Publication Status
                                    </h3>
                                    
                                    <Select
                                        options={["active", "inactive"]}
                                        className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-slate-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 focus:bg-slate-600/50"
                                        {...register("status", { required: true })}
                                    />
                                    
                                    <p className="text-xs text-slate-400 mt-2">
                                        {watch("status") === "active" ? "✅ Post will be visible to readers" : "🚫 Post will be saved as draft"}
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="sticky top-6">
                                    <Button 
                                        type="submit" 
                                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                                            post 
                                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500/50" 
                                                : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 focus:ring-cyan-500/50"
                                        }`}
                                    >
                                        <span className="flex items-center justify-center">
                                            {post ? (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    Update Post
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Publish Post
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}