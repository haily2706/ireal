import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, MapPin, Link as LinkIcon, MoreHorizontal, Heart, MessageCircle, Share2, Crown, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser, followers, exploreItems } from "@/lib/data";

export default function HomePage() {
    const today = new Date();
    const upcomingBirthdays = followers
        .filter(user => user.birthday)
        .map(user => {
            const birthDate = new Date(user.birthday!);
            const currentYear = today.getFullYear();
            let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());

            // If birthday has passed this year (strictly before today), it's next year
            // We strip time from today for accurate comparison
            const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            if (nextBirthday < todayNoTime) {
                nextBirthday.setFullYear(currentYear + 1);
            }
            return {
                ...user,
                nextBirthday
            };
        })
        .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime())
        .slice(0, 5); // Show top 5 upcoming


    return (
        <div className="container mx-auto px-4 py-8 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-card rounded-xl border p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold">Welcome back, {currentUser.name}! 👋</h1>
                                <p className="text-muted-foreground mt-1">Here's what your friends are up to today.</p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Feed */}
                    <div className="border border-dashed rounded-xl p-12 text-center text-muted-foreground bg-muted/30">
                        <p>Feed updates will appear here</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Upcoming Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Upcoming
                            </h2>
                        </div>

                        <Card className="border-border/60 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <span className="text-xl">🎂</span> Note these dates
                                </CardTitle>
                                <CardDescription>Upcoming birthdays for your friends</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                {upcomingBirthdays.length > 0 ? (
                                    upcomingBirthdays.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2 border-background group-hover:border-primary transition-colors">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors cursor-pointer">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {format(user.nextBirthday, "MMM d")} • Turning {user.nextBirthday.getFullYear() - new Date(user.birthday!).getFullYear()}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 rounded-full opacity-80 hover:opacity-100 hover:text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all"
                                                title="Send a gift"
                                            >
                                                <Gift className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming birthdays.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
