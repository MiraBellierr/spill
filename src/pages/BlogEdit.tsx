import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";

import React, { useState } from 'react';
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from "@tiptap/react";
import { TextStyleKit } from '@tiptap/extension-text-style'

const extensions = [TextStyleKit, StarterKit]

const BlogEdit = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setSubmitSuccess] = useState(false);

    const editor = useEditor({
        extensions,
        content: ''
    })

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const blogData = {
            author,
            title,
            content: editor?.getHTML() || '',
            };

            const response = await fetch(`https://mirabellier.my.id/api/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
            });

            if (!response.ok) throw new Error('Failed to save post');

            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 3000);
            
            setAuthor('');
            setTitle('');
            editor?.commands.clearContent();
        } catch (error) {
            console.error('Error saving blog post:', error);
        } finally {
            setIsSubmitting(false);
        }
        };

    return (
        <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
            <Header />

            <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                <div className="flex-grow flex-col">
                    <Navigation />
                </div>

                <main className="w-full lg:w-3/5 space-y-2 p-4">
                    <h2 className="font-bold text-2xl text-blue-600">Create a new Post</h2>
                    
                    <form onSubmit={handleSubmit}>      
                        <div className="flex flex-col p-2 space-y-2">
                            <label className="font-bold text-blue-600" htmlFor="author">Author Name</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={author}
                                onChange={handleAuthorChange}
                                placeholder="Enter the author's name"
                                className="form-input border rounded-lg border-blue-300 p-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col p-2 space-y-2">
                            <label className="font-bold text-blue-600" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Enter the title of the post"
                                className="form-input border rounded-lg border-blue-300 p-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col p-2 space-y-2">
                            <label className="font-bold text-blue-600" htmlFor="content">Content</label>
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} className="bg-white border rounded-lg border-blue-300 p-2 min-h-[300px]" />
                        </div>
                        
                        <div className="flex p-2">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:animate-wiggle"
                            >
                                {isSubmitting ? "Publishin..." : "Publish Post"}
                            </button>
                        </div>
                    </form>
                </main>

                <div className="flex-col">
                    <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
                        <div className="space-y-2 text-sm font-bold">
                            <h2 className="text-blue-600 font-bold text-lg">Tips & Tricks</h2>
                            <p className="text-blue-500">Bold: <span className="border border-blue-500 p-0.5 rounded-sm">Ctrl</span> + <span className="border border-blue-500 p-0.5 rounded-sm">B</span></p>
                            <p className="text-blue-500">Italicize: <span className="border border-blue-500 p-0.5 rounded-sm">Ctrl</span> + <span className="border border-blue-500 p-0.5 rounded-sm">I</span></p>
                            <p className="text-blue-500">Underline: <span className="border border-blue-500 p-0.5 rounded-sm">Ctrl</span> + <span className="border border-blue-500 p-0.5 rounded-sm">U</span></p>
                            <p className="text-blue-500">Code: <span className="border border-blue-500 p-0.5 rounded-sm">Ctrl</span> + <span className="border border-blue-500 p-0.5 rounded-sm">E</span></p>
                            <p className="text-blue-500 text-sm border-t border-blue-700 p-2 text-center">This only work in content...</p>
                        </div>
                    </aside>                    
                    <div className="mt-3 mb-auto lg:w-[200px]">
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default BlogEdit;