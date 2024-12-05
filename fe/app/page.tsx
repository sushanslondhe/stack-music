"use client";
import Appbar from "@/components/Appbar";
import { ChartNoAxesCombined, Music, Share } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div id="webcrumbs">
      <Appbar />
      <div className=" min-h-[800px] bg-neutral-50 rounded-lg shadow-lg">
        <section className="relative h-[650px] w-full overflow-hidden flex items-center justify-center">
          {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
          <div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source
                src="https://videos.pexels.com/video-files/2984380/2984380-hd_1920_1080_24fps.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="absolute text-center text-white z-10">
            <h2 className="font-title text-4xl">Stream Millions of Songs</h2>
            <p className="text-base mt-4">Every vote drops the beat</p>

            <button className="bg-primary rounded-md mt-6 p-4">
              Stack the tracks, rock the room
            </button>
          </div>
        </section>

        <section id="Features" className=" border px-12 py-8">
          <h3 className="font-title text-3xl mb-4">Features</h3>
          <div className=" grid grid-rows-3 md:grid md:grid-cols-3 gap-8">
            <div className="rounded-md bg-neutral-100 p-6 text-center hover:animate-pulse">
              <div className=" flex justify-center">
                <Music width={20} className=" text-red-500" />
              </div>
              <span className="material-symbols-outlined text-2xl font-mono">
                Collaborative Queue
              </span>
              <h4 className="text-md mt-4">
                Let everyone add their favorite songs to the shared playlist
              </h4>
              <p className="mt-2 text-neutral-600">
                Real-time updates as new songs are added
              </p>
            </div>
            <div className="rounded-md bg-neutral-100 p-6 text-center hover:animate-pulse ">
              <div className=" flex justify-center">
                <ChartNoAxesCombined width={20} className=" text-red-400" />
              </div>
              <span className="material-symbols-outlined text-2xl font-mono">
                Live Session Stats
              </span>
              <h4 className="text-md mt-4">See current votes for each song</h4>
              <p className="mt-2 text-neutral-600">
                Discover trending music within your group.
              </p>
            </div>
            <div className="rounded-md bg-neutral-100 p-6 text-center hover:animate-pulse">
              <div className=" flex justify-center">
                <Share width={20} className=" text-red-400" />
              </div>
              <span className="material-symbols-outlined text-2xl font-mono">
                Easy Session Sharing
              </span>
              <h4 className="text-md mt-4">Generate unique session codes</h4>
              <p className="mt-2 text-neutral-600">
                Quick join via QR code or link
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-neutral-100 py-6 px-8 rounded-b-lg mt-8">
          <div className="flex justify-between">
            <p className="text-neutral-600">© 2024 Stack-Muzic</p>
            <div className="space-x-4">
              <a href="#" className="text-neutral-600 hover:text-primary">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
