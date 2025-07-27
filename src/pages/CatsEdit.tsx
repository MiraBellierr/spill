import Navigation from "../parts/Navigation";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Toast from "../parts/Toast";
import background from "../assets/background.jpeg";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CatsEdit = () => {
    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const navigate = useNavigate();
    const apiBaseUrl = "https://mirabellier.my.id/api";

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setVideoFile(file || null);
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setVideoPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) return;
        
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('video', videoFile as Blob);
        if (title) {
            formData.append('customTitle', title);
        }

        try {
            const res = await fetch(`${apiBaseUrl}/upload-cat-video`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setTitle('');
                setVideoFile(null);
                setVideoPreview(null);
                setToastMessage("🎉 Video uploaded successfully!");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    setToastMessage("");
                    navigate("/cats");
                }, 3000);
            } else {
                const errorData = await res.json();
                setToastMessage(`❌ ${errorData.error || 'Video upload failed!'}`);
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    setToastMessage("");
                }, 3000);
            }
        } catch (err) {
            console.error(err);
            setToastMessage("❌ Video upload failed!");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setToastMessage("");
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen text-blue-900 font-[sans-serif] flex flex-col">
            <Header />

            <div className="min-h-screen flex flex-col bg-cover bg-no-repeat bg-scroll" style={{ backgroundImage: `url(${background})` }}>
                <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                    <div className="flex-grow flex-col">
                        <Navigation />
                    </div>

                    <main className="w-full lg:w-3/5 space-y-2 p-4">
                        <h2 className="font-bold text-2xl text-blue-600">Upload a cat video</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col p-2 space-y-2">
                                <label className="font-bold text-blue-600" htmlFor="title">
                                    Title (optional)
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="form-input border rounded-lg border-blue-300 p-2"
                                    placeholder="Enter a title for your video"
                                />
                            </div>

                            <div className="flex flex-col p-2 space-y-2">
                                <label className="font-bold text-blue-600" htmlFor="video">
                                    Upload Video
                                </label>
                                <input
                                    type="file"
                                    id="video"
                                    name="video"
                                    accept="video/mp4,video/webm,video/ogg"
                                    onChange={handleVideoChange}
                                    className="form-input border rounded-lg border-blue-300 p-2"
                                    required
                                />
                            </div>

                            {videoPreview && (
                                <div className="flex flex-col items-center p-2">
                                    <span className="text-blue-500 mb-2">Preview:</span>
                                    <video
                                        src={videoPreview}
                                        controls
                                        className="w-64 rounded-lg shadow-lg"
                                    />
                                </div>
                            )}

                            <div className="flex p-2">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:animate-wiggle"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </main>

                    <div className="flex-col">
                        <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
                            <div className="space-y-2 text-sm font-bold">
                                <h2 className="text-blue-600 font-bold text-lg">Tips & Tricks</h2>
                                <div className="border-t border-blue-300 pt-2">
                                    <p className="text-blue-500">
                                        1. Bigger size files may take time to upload.
                                    </p>
                                    <p className="text-blue-500">
                                        2. Add a title to make your video more discoverable.
                                    </p>
                                </div>
                            </div>
                        </aside>                    
                        <div className="mt-3 mb-auto lg:w-[200px]">
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
                <Toast message={toastMessage} onClose={() => {
                    setShowToast(false);
                    setToastMessage("");
                    if (toastMessage.includes("success")) {
                        navigate("/cats");
                    }
                }} />
            )}
            <Footer />
        </div>
    )
}

export default CatsEdit;