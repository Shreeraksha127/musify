"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const API_URL = "https://discoveryprovider.audius.co/v1/tracks/trending?app_name=Musify";

export default function Home() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        console.log("API Response:", res.data); // Log response to inspect structure
        setSongs(res.data.data); // Ensure this matches the actual structure
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎵 Trending Songs</h1>

      <Input placeholder="Search for music..." className="w-1/2 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {songs.map((song) => (
    <Card key={song.id} className="w-72">
      <CardContent className="p-4">
        {/* Display Album Artwork */}
        <img 
          src={song.artwork?.["150x150"] || "/default-album.jpg"} 
          alt={song.title} 
          className="w-full h-40 object-cover rounded-lg"
        />
        
        {/* Song Title */}
        <p className="text-lg font-semibold mt-2">{song.title}</p>

        {/* Artist Name */}
        <p className="text-sm text-gray-400">{song.user?.name || "Unknown Artist"}</p>

        {/* Play Button */}
        <Button className="mt-2">Play</Button>
      </CardContent>
    </Card>
  ))}
</div>

    </div>
  );
}
