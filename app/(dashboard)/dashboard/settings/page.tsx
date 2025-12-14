"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Settings,
    Shield,
    Bell,
    AlertTriangle,
    Save,
    Globe,
    Mail,
    Lock
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your system configurations and preferences.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Globe className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Platform Details</CardTitle>
                            </div>
                            <CardDescription>
                                Configure basic information visible to your users.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="system-name">System Name</Label>
                                <Input id="system-name" defaultValue="LiveReal Platform" placeholder="Enter platform name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="support-email">Support Email</Label>
                                <Input id="support-email" defaultValue="support@livereal.com" placeholder="Enter support email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="url">Platform URL</Label>
                                <Input id="url" defaultValue="https://livereal.com" placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Settings className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>System Preferences</CardTitle>
                            </div>
                            <CardDescription>
                                Manage global system behavior.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="registrations" className="flex flex-col space-y-1">
                                    <span>Allow New Registrations</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Turn off to stop new users from signing up.
                                    </span>
                                </Label>
                                <Switch id="registrations" defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="public-api" className="flex flex-col space-y-1">
                                    <span>Public API Access</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Enable or disable public API endpoints.
                                    </span>
                                </Label>
                                <Switch id="public-api" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Security Policies</CardTitle>
                            </div>
                            <CardDescription>
                                Enforce security standards across the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="2fa" className="flex flex-col space-y-1">
                                    <span>Enforce 2FA</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Require two-factor authentication for all admin accounts.
                                    </span>
                                </Label>
                                <Switch id="2fa" />
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                <Input id="session-timeout" type="number" defaultValue="30" className="w-[150px]" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Email Notifications</CardTitle>
                            </div>
                            <CardDescription>
                                Configure when the system sends automated emails.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="new-user-alert" className="flex flex-col space-y-1">
                                    <span>New User Alerts</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Receive an email when a new user registers.
                                    </span>
                                </Label>
                                <Switch id="new-user-alert" defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="system-updates" className="flex flex-col space-y-1">
                                    <span>System Updates</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Receive weekly system health reports.
                                    </span>
                                </Label>
                                <Switch id="system-updates" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                    <Card className="border-destructive/50 hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            </div>
                            <CardDescription>
                                Irreversible and critical actions. Proceed with caution.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                                    <span>Maintenance Mode</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Put the site into maintenance mode. Only admins will be able to access.
                                    </span>
                                </Label>
                                <Switch id="maintenance-mode" />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/10">
                                <div className="space-y-1">
                                    <p className="font-medium text-destructive">Reset Database</p>
                                    <p className="text-sm text-muted-foreground">
                                        Delete all data and reset the system to factory settings.
                                    </p>
                                </div>
                                <Button variant="destructive" size="sm">Reset System</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
