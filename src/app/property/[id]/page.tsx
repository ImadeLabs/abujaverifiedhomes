"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [params.id]);

  async function fetchImages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("property_media")
      .select("*")
      .eq("property_id", params.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error loading images:", error);
      setLoading(false);
      return;
    }

    setImages(data || []);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-5xl p-10">
      <h1 className="mb-6 text-3xl font-bold">Property Images</h1>

      <Link
        href={`/upload?propertyId=${params.id}`}
        className="mb-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        Upload Image
      </Link>

      {loading && <p className="text-gray-500">Loading images...</p>}

      {!loading && images.length === 0 && (
        <p className="text-gray-500">No images uploaded yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.file_url || img.url}
            className="rounded-lg shadow"
            alt="Property"
          />
        ))}
      </div>
    </main>
  );
}