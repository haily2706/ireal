import { BackgroundBlobs } from "@/components/ui/background-blobs";

export default function ExplorePage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            <BackgroundBlobs />
            <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                    Explore iReal
                </h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                    Discover trending birthday streams, featured stories, and popular gifts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground">We are working on bringing you the best content.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
