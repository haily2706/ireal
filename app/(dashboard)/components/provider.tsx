"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function DashboardProvider({
    children,
    defaultCollapsed = false
}: {
    children: React.ReactNode;
    defaultCollapsed?: boolean;
}) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    useEffect(() => {
        // No local storage initialization for collapse needed anymore
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => {
            const newState = !prev;
            document.cookie = `dashboard-sidebar-collapsed=${newState}; path=/; max-age=31536000; SameSite=Lax`;
            return newState;
        });
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a DashboardProvider");
    }
    return context;
}
