"use client";

import axios from "axios";
import { HandHeart, Search } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

interface streamType {
  id: string;
  title: string;
  url: string;
  smallImg: string | "";
  Type: string;
  extractedId: string;
  userId: string;
  upvotes: number;
}

export default function Dashboard() {
  const session = useSession();
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("jx0llzSntd8");
  const [getStream, setStreams] = useState<streamType[]>([]);

  const handleSubmit = async () => {
    const res = await axios.post(`http://localhost:3000/api/streams`, {
      creatorId: "e9c34882-d559-4f66-a2cd-c61934c574c2",
      url,
    });

    setStreams([...getStream, { ...res.data.stream, upvotes: 0 }]);
    console.log(getStream[0]);
  };

  if (!session.data?.user?.email) {
    return (
      <div className="">
        <div className="w-full ">
          <h1 className=" text-xl text-center">User not logged in</h1>
        </div>
        <div
          onClick={() => signIn()}
          className=" h-[60px] flex justify-center items-center"
        >
          <h1 className=" text-2xl">Redirecting to login page</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" p-6 bg-neutral-50 rounded-lg shadow-lg space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="font-title text-3xl text-primary">
            Stream Your Favorite YouTube Songs
          </h1>
          <div className="flex items-center gap-4">
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="bg-neutral-100 border border-gray-300 rounded-md px-4 py-2 w-[300px]"
              type="text"
              placeholder="Paste YouTube Link here"
            />
            <button
              onClick={handleSubmit}
              className="bg-primary rounded-md px-3 py-2"
            >
              <span className="material-symbols-outlined">
                <Search />
              </span>
            </button>
          </div>
        </header>

        {/* Currently Playing Section */}
        <section className="space-y-4">
          <h2 className="text-xl">Currently Playing</h2>
          <div className="bg-neutral-100 rounded-md p-4 flex justify-center">
            <div className="border w-full md:w-[60%]  relative h-[500px]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-md border-none pointer-events-none"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setVideoId(getStream[0].extractedId);
                getStream.shift();
              }}
            >
              Next
            </button>
          </div>
        </section>

        {/* Song Queue Section */}
        <section className="space-y-4">
          <h2 className="text-xl">Song Queue</h2>
          <div className="bg-neutral-100 rounded-md p-4 max-h-[400px] overflow-y-auto w-[50%]  ">
            {getStream.length > 0 ? (
              <div className="space-y-4  ">
                {getStream
                  .sort((a, b) => b.upvotes - a.upvotes)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-neutral-100 border shadow-lg rounded-md p-4 flex justify-between items-center py-[2rem] "
                    >
                      <img
                        src={item.smallImg}
                        width={200}
                        height={40}
                        className=""
                        alt="Thumbnail"
                      />
                      <div className="flex gap-4 items-center">
                        <span className=" text-lg font-mono">
                          {item.title.split("|")[0]}
                        </span>
                      </div>
                      <div className="flex justify-center items-center">
                        {/* {JSON.stringify(getStream)} */}
                        <button
                          onClick={() =>
                            setStreams((prevStreams) =>
                              prevStreams.map((streams) =>
                                streams.id === item.id
                                  ? { ...streams, upvotes: streams.upvotes + 1 }
                                  : streams
                              )
                            )
                          }
                          className="bg-primary rounded-md px-3 py-1 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined flex">
                            <HandHeart className=" w-[40px] h-[30px] text-red-400 hover:text-red-500" />
                          </span>{" "}
                        </button>
                        <div className=" text-2xl font-mono text-slate-700">
                          {item.upvotes}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div>No songs in queue please copy clean link from youtube</div>
            )}
          </div>
        </section>

        {/* Chat Section */}
        <section className="space-y-4">
          <h2 className="text-xl">Chat</h2>
          <div className="bg-neutral-100 rounded-md max-h-[300px] p-4 space-y-4 overflow-y-auto">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <img
                  className="object-cover h-[48px] w-[48px] rounded-full"
                  src={`https://tools-api.webcrumbs.org/image-placeholder/48/48/avatar/${
                    i + 1
                  }`}
                  alt={`User Avatar ${i + 1}`}
                />
                <div className="bg-neutral-50 rounded-md p-3 w-full">
                  <span>
                    <strong>User #{i + 1}</strong>: This is a sample chat
                    message!
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <input
              className="flex-grow bg-neutral-100 border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="Type your message..."
            />
            <button className="bg-primary text-white rounded-md px-3 py-2">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
