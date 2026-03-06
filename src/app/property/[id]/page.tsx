"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function PropertyPage({ params }: any) {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchImages();
  }, [params.id]);

  async function fetchImages() {
    const { data, error } = await supabase
      .from("property_media")
      .select("*")
      .eq("property_id", params.id);

    if (error) {
      console.log(error);
      return;
    }

    setImages(data || []);
  }

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Property Images</h1>

      {/* Upload Button */}
      <Link
        href={`/upload?propertyId=${params.id}`}
        className="inline-block mb-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Upload Image
      </Link>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            className="rounded-lg shadow"
            alt="Property image"
          />
        ))}
      </div>
    </main>
  );
}