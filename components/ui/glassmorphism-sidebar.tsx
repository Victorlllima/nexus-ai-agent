'use client';
import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart2,
    Users,
    Folder,
    CheckSquare,
    Hexagon
} from 'lucide-react';
import { WorkspaceSwitcher } from '@/components/studio/WorkspaceSwitcher';

// --- Data for each page ---
interface PageData {
    title: string;
    description: string;
    content: React.ReactNode;
}

const pageContent: Record<string, PageData> = {
    Dashboard: {
        title: 'Dashboard',
        description: "Welcome back, Serafim. Here's what's happening today.",
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="content-card">
                    <h2 className="text-lg font-semibold text-white">Active Projects</h2>
                    <p className="text-4xl font-bold mt-2 text-indigo-400">12</p>
                </div>
                <div className="content-card">
                    <h2 className="text-lg font-semibold text-white">Tasks Due</h2>
                    <p className="text-4xl font-bold mt-2 text-pink-400">5</p>
                </div>
                <div className="content-card">
                    <h2 className="text-lg font-semibold text-white">New Users</h2>
                    <p className="text-4xl font-bold mt-2 text-emerald-400">28</p>
                </div>
            </div>
        )
    },
    Analytics: {
        title: 'Analytics',
        description: 'Detailed insights and metrics for your projects.',
        content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="content-card lg:col-span-2 h-64 flex items-center justify-center">
                    <p className="text-gray-400 text-center">Chart placeholder for User Growth<br />(Charts.js or Recharts would go here)</p>
                </div>
                <div className="content-card">
                    <h2 className="text-lg font-semibold text-white">Bounce Rate</h2>
                    <p className="text-4xl font-bold mt-2 text-indigo-400">24.5%</p>
                </div>
                <div className="content-card">
                    <h2 className="text-lg font-semibold text-white">Session Duration</h2>
                    <p className="text-4xl font-bold mt-2 text-pink-400">8m 12s</p>
                </div>
            </div>
        )
    },
    Users: {
        title: 'Users',
        description: 'Manage all the users in your organization.',
        content: (
            <div className="content-card overflow-hidden">
                <table className="custom-table w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-4">Jane Doe</td><td className="p-4">jane.doe@example.com</td><td className="p-4">Admin</td></tr>
                        <tr><td className="p-4">John Smith</td><td className="p-4">john.smith@example.com</td><td className="p-4">Developer</td></tr>
                        <tr><td className="p-4">Sam Wilson</td><td className="p-4">sam.wilson@example.com</td><td className="p-4">Designer</td></tr>
                    </tbody>
                </table>
            </div>
        )
    },
    Projects: {
        title: 'Projects',
        description: 'An overview of all your ongoing and completed projects.',
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="content-card hover:scale-[1.02] transition-transform cursor-pointer">
                    <h2 className="text-lg font-semibold text-white">Project Alpha</h2>
                    <p className="text-sm text-gray-400 mt-1">Status: <span className="text-yellow-400">In Progress</span></p>
                </div>
                <div className="content-card hover:scale-[1.02] transition-transform cursor-pointer">
                    <h2 className="text-lg font-semibold text-white">Project Beta</h2>
                    <p className="text-sm text-gray-400 mt-1">Status: <span className="text-green-400">Completed</span></p>
                </div>
            </div>
        )
    },
    Tasks: {
        title: 'Tasks',
        description: 'Track and manage all your tasks and to-dos.',
        content: (
            <div className="content-card">
                <ul className="space-y-2">
                    <li className="task-list-item flex justify-between p-3 border border-white/5 rounded-lg">
                        <span>Finalize Q3 report</span>
                        <span className="text-xs text-pink-400 font-medium bg-pink-400/10 px-2 py-1 rounded">Due Tomorrow</span>
                    </li>
                    <li className="task-list-item flex justify-between p-3 border border-white/5 rounded-lg">
                        <span>Design new landing page mockups</span>
                        <span className="text-xs text-indigo-400 font-medium bg-indigo-400/10 px-2 py-1 rounded">In Progress</span>
                    </li>
                    <li className="task-list-item flex justify-between p-3 border border-white/5 rounded-lg">
                        <span>Deploy server updates</span>
                        <span className="text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded">Completed</span>
                    </li>
                </ul>
            </div>
        )
    }
};

const navItems = [
    { page: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { page: 'Analytics', icon: <BarChart2 size={20} /> },
    { page: 'Users', icon: <Users size={20} /> },
    { page: 'Projects', icon: <Folder size={20} /> },
    { page: 'Tasks', icon: <CheckSquare size={20} /> },
];

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => (
    <aside className="glass-effect w-64 flex-shrink-0 flex flex-col z-10 h-screen sticky top-0">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
            <div className="flex items-center gap-2">
                <Hexagon className="text-indigo-400" size={32} strokeWidth={1.5} />
                <span className="text-xl font-bold text-white tracking-tight">AetherUI</span>
            </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
            {navItems.map(item => (
                <a
                    key={item.page}
                    href="#"
                    className={`nav-link flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                        ${activePage === item.page
                            ? 'bg-indigo-500/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-500/20'
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActivePage(item.page);
                    }}
                >
                    <span className={`transition-transform duration-300 ${activePage === item.page ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {item.icon}
                    </span>
                    <span className="font-medium">{item.page}</span>
                </a>
            ))}
        </nav>
        <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                {/* Replaced unsplash URL with a working placeholder if strict needed, but user asked for Unsplash stock images. 
                    Using a reliable avatar placeholder for stability, but let's try a nice unsplash one. */}
                <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-lg shadow-indigo-500/20"
                />
                <div>
                    <p className="font-semibold text-white text-sm">Serafim P.</p>
                    <p className="text-xs text-indigo-300">Admin Workspace</p>
                </div>
            </div>
        </div>
    </aside>
);

// Main Content Component
const MainContent = ({ activePage }: { activePage: string }) => {
    const { title, description, content } = pageContent[activePage];
    return (
        <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
                <header className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-400 mt-2 font-light">{description}</p>
                    </div>
                    <WorkspaceSwitcher />
                </header>
                <div className="mt-8">{content}</div>
            </div>
        </main>
    );
};

// Main Dashboard Layout Component
export const DashboardLayout = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    return (
        <div className="relative min-h-screen w-full flex bg-[#020617] text-gray-200 overflow-hidden font-sans selection:bg-indigo-500/30">
            {/* Ambient Background Effects */}
            <div className="shape-1 opacity-40 animate-pulse"></div>
            <div className="shape-2 opacity-30 animate-pulse delay-1000"></div>

            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <MainContent activePage={activePage} />
        </div>
    );
};
