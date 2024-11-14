// import { Link } from "@inertiajs/react";
// import React from "react";

import CreatePost from "@/Components/feed/CreatePost";

// export default function LandingPage() {
//   return (
//     <>
//       <div className="w-screen overflow-hidden">
//         <div className="relative min-h-screen bg-gradient-to-br from-slate-500 to-purple-600 text-white ">
//           <header className="container mx-auto px-4 py-6 flex flex-col ">
//             <h1 className="text-2xl font-bold">Club Nexus</h1>
//           </header>
//           <main className="flex flex-col place-items-center absolute top-[40%] m-auto w-full">
//             <h2 className="text-5xl font-bold mb-6">
//               Connect, Create, and Collaborate
//             </h2>
//             <Link
//               href={route("login")}
//               className="bg-white text-slate-600 px-6 py-3 rounded-full font-semibold hover:bg-slate-900 transition duration-300"
//             >
//               Get Started
//             </Link>
//           </main>
//         </div>
//         <div className="hero bg-slate-50-200 min-h-screen">
//           <div className="hero-content text-center">
//             <div className="max-w-md">
//               <h1 className="text-5xl font-bold">Hello there</h1>
//               <p className="py-6">
//                 Provident cupiditate voluptatem et in. Quaerat fugiat ut
//                 assumenda excepturi exercitationem quasi. In deleniti eaque aut
//                 repudiandae et a id nisi.
//               </p>
//               <button className="btn btn-primary">Get Started</button>
//             </div>
//           </div>
//         </div>

//         <footer className="footer bg-neutral text-neutral-content p-10 z-10">
//           <nav>
//             <h6 className="footer-title">Services</h6>
//             <a className="link link-hover">Branding</a>
//             <a className="link link-hover">Design</a>
//             <a className="link link-hover">Marketing</a>
//             <a className="link link-hover">Advertisement</a>
//           </nav>
//           <nav>
//             <h6 className="footer-title">Company</h6>
//             <a className="link link-hover">About us</a>
//             <a className="link link-hover">Contact</a>
//             <a className="link link-hover">Jobs</a>
//             <a className="link link-hover">Press kit</a>
//           </nav>
//           <nav>
//             <h6 className="footer-title">Legal</h6>
//             <a className="link link-hover">Terms of use</a>
//             <a className="link link-hover">Privacy policy</a>
//             <a className="link link-hover">Cookie policy</a>
//           </nav>
//         </footer>
//       </div>
//     </>
//   );
// }
const LandingPage = () => {
  return (
    <div className="flex flex-col place-items-center justify-center bg-slate-100 h-screen w-screen">
      <div className="w-full h-40 bg-slate-200">
        <CreatePost />
      </div>
    </div>
  );
};
export default LandingPage;
