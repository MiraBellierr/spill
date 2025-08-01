import { useEffect, useState, useRef } from "react";
import Navigation from "../parts/Navigation";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Divider from "../parts/Divider";

import background from "../assets/background.jpeg";


interface CatVideo {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

const Cats = () => {
    const [videos, setVideos] = useState<CatVideo[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<CatVideo[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [videoLoading, setVideoLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const apiBaseUrl = "https://mirabellier.my.id/api";

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlSearchQuery = searchParams.get('search') || '';
        setSearchQuery(urlSearchQuery);
    }, [location.search]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        navigate({ search: params.toString() }, { replace: true });
    }, [searchQuery, navigate]);

    useEffect(() => {
        let isMounted = true;
        
        async function fetchVideos() {
            try {
                const res = await fetch(`${apiBaseUrl}/cat-videos`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                if (isMounted) {
                    setVideos(data);
                    setFilteredVideos(data);
                    setVideoError(null);
                }
            } catch (err) {
                console.error("Failed to fetch videos:", err);
                if (isMounted) {
                    setVideos([]);
                    setFilteredVideos([]);
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
        if (searchQuery.trim() === "") {
            setFilteredVideos(videos);
            setCurrentVideoIndex(0);
        } else if (!isNaN(Number(searchQuery)) && parseInt(searchQuery) <= videos.length) {
            const filtered = [videos[parseInt(searchQuery) - 1]];

            setFilteredVideos(filtered);
            setCurrentVideoIndex(0);
        } else {
            const filtered = videos.filter(video => 
                video.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.id.toString().includes(searchQuery)
            );
            setFilteredVideos(filtered);
            setCurrentVideoIndex(0);
        } 
    }, [filteredVideos.length, searchQuery, videos]);

    // useEffect(() => {
    //     if (filteredVideos.length > 0 && !loading) {
    //         setVideoLoading(true);
            
    //         const attemptPlay = () => {
    //             if (videoRef.current && !isIOS) {
    //                 const playPromise = videoRef.current.play();
                    
    //                 if (playPromise !== undefined) {
    //                     playPromise
    //                         .then(() => {
    //                             setVideoLoading(false);
    //                             setVideoError(null);
    //                         })
    //                         .catch(error => {
    //                             console.log("Autoplay prevented:", error);
    //                             setVideoError("Video loaded but couldn't autoplay.");
    //                             setVideoLoading(false);
    //                         });
    //                 }
    //             }
    //         };

    //         const timer = setTimeout(attemptPlay, 100);
    //         return () => clearTimeout(timer);
    //     }
    // }, [currentVideoIndex, filteredVideos, isIOS, loading]);

    useEffect(() => {
        const isMobileDevice = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        };
        setIsMobile(isMobileDevice());
    }, []);

    const handleNext = () => {
        if (filteredVideos.length > 1) {
            setVideoLoading(true);
            setVideoError(null);
            setCurrentVideoIndex(prev => (prev + 1) % filteredVideos.length);
        }
    };

    const handlePrev = () => {
        if (filteredVideos.length > 1) {
            setVideoLoading(true);
            setVideoError(null);
            setCurrentVideoIndex(prev => 
                prev === 0 ? filteredVideos.length - 1 : prev - 1
            );
        }
    };

    const handleVideoError = () => {
        setVideoError("Failed to load video.");
        setVideoLoading(false);
    };

    const handleTryPlaying = async () => {
        if (!videoRef.current || !currentVideo) return;
        
        setVideoLoading(true);
        setVideoError(null);
        
        try {
            // First try to reload the video source
            videoRef.current.load();
            
            // Wait a moment for the reload to take effect
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Attempt to play with muted audio (required for autoplay on most browsers)
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
                await playPromise;
                setVideoLoading(false);
            }
        } catch (error) {
            console.error("Error trying to play video:", error);
            setVideoError("Still unable to play video. Please try refreshing the page.");
            setVideoLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const currentVideo = filteredVideos[currentVideoIndex];

    return (
        <div className="min-h-screen text-blue-900 font-[sans-serif] flex flex-col">
            <Header />
            
            <div className="min-h-screen flex flex-col bg-cover bg-no-repeat bg-scroll" style={{ backgroundImage: `url(${background})` }}>
                <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
                    {/* Left Navigation */}
                    <div className="flex-grow flex-col">
                        <Navigation />

                        {/* Search Bar */}
                        <div className="mt-4 p-4 border border-blue-300 rounded-lg bg-blue-100 shadow-md">
                            <h2 className="font-bold text-blue-500 text-lg pb-2">search cat here</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search video name or index..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="border border-blue-400 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {searchQuery && (
                                <p className="text-sm text-blue-600 mt-1">
                                    Showing {filteredVideos.length} of {videos.length} videos
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center lg:w-[339px] mt-4 border border-blue-300 rounded-lg bg-blue-100 shadow-md">
                            <img className="border border-blue-300 rounded-lg" src="https://media1.tenor.com/m/hVmwmbz6u9oAAAAC/kobayashi-san-maid-dragon.gif" />
                        </div>
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
                            ) : filteredVideos.length === 0 ? (
                                <div className="text-red-500">
                                    No videos found matching "{searchQuery}". Try a different search.
                                </div>
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
                                    
                                    <div className={`${videoLoading ? 'hidden' : 'block'} w-full h-auto flex justify-center`}>
                                        <video
                                            ref={videoRef}
                                            key={currentVideo.id}
                                            className="w-[243px] rounded-lg shadow-lg"
                                            controls
                                            autoPlay
                                            muted={isMobile}
                                            playsInline={isMobile}
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
                                </>
                            )}

                            <div className="flex flex-row mt-4 space-x-4">
                                    <button
                                        onClick={handlePrev}
                                        disabled={filteredVideos.length <= 1}
                                        className="px-2 py-1 border border-blue-400 rounded hover:bg-blue-200 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-blue-600 self-center">
                                        {currentVideoIndex + 1} / {filteredVideos.length}
                                    </span>
                                    <button
                                        onClick={handleNext}
                                        disabled={filteredVideos.length <= 1}
                                        className="px-3 py-1 border border-blue-400 rounded hover:bg-blue-200 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                        </div>

                        <Divider />   
                    </main>

                    {/* Right Sidebar */}
                    <div className="flex-col">
                        <div className="mt-3 mb-auto lg:w-[200px] space-y-4">
                            <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
                                <div className="space-y-2 text-sm text-center font-bold">
                                    <h2 className="text-blue-600 font-bold text-lg pb-2">Upload 😸</h2>
                                    <Link to="/cats/edit">
                                        <div className="border border-blue-300 rounded-2xl bg-blue-200 p-1 hover:bg-blue-300 hover:animate-wiggle">
                                            Click here
                                        </div>
                                    </Link>
                                    

                                </div>
                            </aside>
                            <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
                                <div className="space-y-2 text-sm text-center font-bold">
                                    <p className="text-blue-500 p-2">
                                        We have a total of <span className="font-bold text-blue-800 underline">{videos.length}</span> cat videos from the internet. 😸😸
                                    </p>
                                </div>
                            </aside>

                            <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4 space-y-2">
                                <h3 className="font-bold text-center">WARNING!!</h3>
                                <div className="space-y-2 text-sm text-center font-bold border-t border-blue-800">
                                    <p className="text-blue-500 p-2">
                                        Videos <span className="font-extrabold underline">may not work</span> on Safari and iOS devices.
                                    </p>
                                    <p className="text-blue-500 p-2">
                                        If the video is not loading, try <span className="font-extrabold underline">refreshing the page</span>.
                                    </p>
                                    <p className="text-blue-500 p-2">
                                        Recently uploaded videos <span className="font-extrabold underline">may take a while to load</span>.
                                    </p>
                                </div>
                            </aside>

                            {/* <div className="border border-blue-300 rounded-lg">
                                <img className="border border-blue-300 rounded-lg" src="https://media1.tenor.com/m/w2KMC1ZRTxoAAAAC/kanna-kanna-kamui.gif" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Cats;