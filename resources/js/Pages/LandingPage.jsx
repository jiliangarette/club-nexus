import { Link } from "@inertiajs/react";
import React from "react";

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Club Nexus</h1>
                <nav></nav>
            </header>
            <main className="flex flex-col place-items-center absolute top-[40%] m-auto w-full">
                <h2 className="text-5xl font-bold mb-6">
                    Connect, Create, and Collaborate
                </h2>
                <Link
                    href={route("login")}
                    className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
                >
                    Get Started
                </Link>
            </main>
        </div>
    );
}
