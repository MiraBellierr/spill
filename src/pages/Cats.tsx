import { useEffect, useState, useRef } from "react";
import divider from "../assets/divider.png";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface CatVideo {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

const Cats = () => {
    const [videos, setVideos] = useState<CatVideo[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [videoLoading, setVideoLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const apiBaseUrl = "https://mirabellier.my.id/api";

    useEffect(() => {
        let isMounted = true;
        
        async function fetchVideos() {
            try {
                const res = await fetch(`${apiBaseUrl}/api/cat-videos`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                if (isMounted) {
                    setVideos(data);
                    setVideoError(null);
                    console.log("Loaded videos:", data);
                }
            } catch (err) {
                console.error("Failed to fetch videos:", err);
                if (isMounted) {
                    setVideos([]);
                    setVideoError("Failed to load videos.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        
        fetchVideos();
        
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        // Handle video playback when index changes
        if (videos.length > 0 && !loading) {
            setVideoLoading(true);
            
            const attemptPlay = () => {
                if (videoRef.current) {
                    const playPromise = videoRef.current.play();
                    
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setVideoLoading(false);
                                setVideoError(null);
                            })
                            .catch(error => {
                                console.log("Autoplay prevented:", error);
                                setVideoError("Video loaded but couldn't autoplay.");
                                setVideoLoading(false);
                            });
                    }
                }
            };

            // Small delay to ensure DOM is updated
            const timer = setTimeout(attemptPlay, 100);
            return () => clearTimeout(timer);
        }
    }, [currentVideoIndex, videos, loading]);

    const handleNext = () => {
        if (videos.length > 1) {
            setVideoLoading(true);
            setVideoError(null);
            setCurrentVideoIndex(prev => (prev + 1) % videos.length);
        }
    };

    const handleVideoError = () => {
        setVideoError("Failed to load video.");
        setVideoLoading(false);
    };

    const handleTryPlaying = () => {
        if (videoRef.current) {
            videoRef.current.muted = true; // Mute to avoid autoplay restrictions
            videoRef.current.play().catch(error => {
                console.error("Error trying to play video:", error);
                setVideoError("Error playing video.");
            });
        }
    }

    const currentVideo = videos[currentVideoIndex];

    return (
        <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
            <Header />
            
            <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                {/* Left Navigation */}
                <div className="flex-grow flex-col">
                    <Navigation />
                </div>
   
                {/* Main Content */}
                <main className="w-full lg:w-3/5 space-y-2 p-4">
                    <div className="flex flex-col justify-center items-center p-4">
                        {loading ? (
                            <div className="text-blue-600">Loading videos...</div>
                        ) : videoError ? (
                            <div className="text-red-500 p-4 rounded bg-red-50 max-w-md text-center">
                                {videoError}
                                {currentVideo && (
                                    <button 
                                        onClick={handleTryPlaying}
                                        className="mt-2 block mx-auto border border-blue-500 px-3 py-1 rounded hover:bg-blue-50"
                                    >
                                        Try Playing
                                    </button>
                                )}
                            </div>
                        ) : videos.length === 0 ? (
                            <div className="text-red-500">No videos found.</div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">
                                    {currentVideo.name}
                                </h2>
                                
                                {videoLoading && (
                                    <div className="w-[243px] h-[243px] flex items-center justify-center bg-gray-100 rounded-lg">
                                        <div className="text-blue-600">Loading video...</div>
                                    </div>
                                )}
                                
                                <div className={`${videoLoading ? 'hidden' : 'block'}`}>
                                    <video
                                        ref={videoRef}
                                        key={currentVideo.id}
                                        className="w-[243px] rounded-lg shadow-lg"
                                        controls
                                        autoPlay
                                        loop
                                        onError={handleVideoError}
                                        onCanPlay={() => setVideoLoading(false)}
                                    >
                                        <source 
                                            src={`${apiBaseUrl}${currentVideo.url}`} 
                                            type="video/mp4" 
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                
                                <div className="flex flex-row mt-4">
                                    <button
                                        className="border border-blue-700 p-2 rounded-lg hover:bg-white transition-colors"
                                        onClick={handleNext}
                                        disabled={loading || videos.length <= 1}
                                    >
                                        Next Video ({currentVideoIndex + 1}/{videos.length})
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-row justify-center">
                        <img className="h-5 w-60 hidden md:block" src={divider} alt="divider"/>
                        <img className="h-5 w-60 hidden md:block" src={divider} alt="divider"/>
                        <img className="h-5 w-60 hidden md:block" src={divider} alt="divider"/>
                    </div>    
                </main>

                {/* Right Sidebar */}
                <div className="flex-col">
                    <div className="mt-3 mb-auto lg:w-[200px]">
                        <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
                            <div className="space-y-2 text-sm text-center font-bold">
                                <h2 className="text-blue-600 font-bold text-lg">Fact 😸</h2>
                                <p className="text-blue-500 border-t border-blue-800 p-2">
                                    Cats can jump up to six times their length.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Cats;