import PostCreationDrawer from "@/Components/App/PostCreationDrawer";
import LoadingState from "@/Components/App/LoadingState";
import Line from "@/Components/mock/Line";
import Loading from "@/Components/mock/Loading";
import { Link } from "@inertiajs/react";
import React from "react";
import PostItem from "@/Components/App/PostItem";

export default function LandingPage() {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <header className="container mx-auto px-4 py-6 flex flex-col justify-between items-center">
          <h1 className="text-2xl font-bold">Club Nexus</h1>
          <PostCreationDrawer />
          <PostItem />
          <nav></nav>
        </header>
        <main className="flex flex-col place-items-center absolute top-[40%] m-auto w-full">
          <h2 className="text-5xl font-bold mb-6">
            Connect, Create, and Collaborate
          </h2>
          <Link
            href={route("login")}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition duration-300"
          >
            Get Started
          </Link>
        </main>
      </div>
      <div className="h-screen w-screen bg-blue-100 flex flex-col place-items-center justify-center gap-12">
        <Line />
        <Loading />
        <LoadingState />
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <footer className="footer bg-neutral text-neutral-content p-10 z-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
}
