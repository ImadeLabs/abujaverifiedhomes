"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type MediaItem = {
  id: string;
  property_id: string;
  file_url: string;
  media_type: string;
  created_at: string;
};

export default function PropertyMediaPage() {
  const params = useParams<{ id: string }>();
  const propertyId = params.id;

  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!propertyId) return;
    fetchImages();
  }, [propertyId]);

async function fetchImages() {
  setLoading(true);
  setFeedback("");

  try {
    const { data, error, status, statusText } = await supabase
      .from("property_media")
      .select("*")
      .eq("property_id", propertyId);

    console.log("MEDIA QUERY RESULT:", { data, error, status, statusText, propertyId });

    if (error) {
      console.error("MEDIA LOAD ERROR:", error);
      setFeedback(
        `Failed to load images. Status: ${status} ${statusText || ""}`.trim()
      );
      setLoading(false);
      return;
    }

    setImages((data || []) as MediaItem[]);
  } catch (err) {
    console.error("MEDIA FETCH CRASH:", err);
    setFeedback("Something went wrong while loading images.");
  } finally {
    setLoading(false);
  }
}

  function extractStoragePath(url: string) {
    const marker = "/storage/v1/object/public/property-media/";
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return url.substring(index + marker.length);
  }

  async function handleDelete(imageId: string, fileUrl: string) {
    const confirmed = window.confirm("Delete this media file?");
    if (!confirmed) return;

    setFeedback("");

    const path = extractStoragePath(fileUrl);

    if (path) {
      const { error: storageError } = await supabase.storage
        .from("property-media")
        .remove([path]);

      if (storageError) {
        console.error("STORAGE DELETE ERROR:", storageError);
      }
    }

    const { error: dbError } = await supabase
      .from("property_media")
      .delete()
      .eq("id", imageId);

    if (dbError) {
      console.error("DB DELETE ERROR:", dbError);
      setFeedback(dbError.message || "Failed to delete media.");
      return;
    }

    setImages((prev) => prev.filter((item) => item.id !== imageId));
    setFeedback("Media deleted successfully.");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Property Media Manager
            </h1>
            <p className="mt-2 text-slate-600">Manage pictures for this listing.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/properties"
              className="rounded-lg border bg-white px-5 py-3 text-sm font-medium text-slate-700"
            >
              Back to Dashboard
            </Link>

            <Link
              href={`/upload?propertyId=${propertyId}`}
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Upload More Media
            </Link>
          </div>
        </div>

        {feedback && (
          <div className="mb-6 rounded-xl border bg-white p-4 text-sm text-slate-700">
            {feedback}
          </div>
        )}

        {loading && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            Loading media...
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-slate-500">
            No media uploaded yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <img
                src={img.file_url}
                alt="Property"
                className="h-64 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <p className="break-all text-xs text-slate-500">{img.file_url}</p>

                <button
                  onClick={() => handleDelete(img.id, img.file_url)}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
                >
                  Delete Media
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}