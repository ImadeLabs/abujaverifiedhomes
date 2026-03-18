"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendPropertyToZapier } from "@/lib/zapier";

type UploadClientProps = {
  propertyId: string;
};

type PropertyRecord = {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string | null;
  status: string | null;
  featured_image: string | null;
};

export default function UploadClient({ propertyId }: UploadClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  }

  async function handleUpload() {
    if (!propertyId) {
      setFeedback("Missing property ID.");
      return;
    }

    if (files.length === 0) {
      setFeedback("Please select at least one image.");
      return;
    }

    setUploading(true);
    setFeedback("");

    try {
      let firstUploadedImageUrl = "";

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${propertyId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("property-media")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("property-media")
          .getPublicUrl(fileName);

        const fileUrl = publicUrlData.publicUrl;

        if (!firstUploadedImageUrl) {
          firstUploadedImageUrl = fileUrl;
        }

        const { error: dbError } = await supabase.from("property_media").insert([
          {
            property_id: propertyId,
            file_url: fileUrl,
            media_type: "image",
          },
        ]);

        if (dbError) {
          throw dbError;
        }
      }

      if (firstUploadedImageUrl) {
        const { error: updateFeaturedError } = await supabase
          .from("properties")
          .update({ featured_image: firstUploadedImageUrl })
          .eq("id", propertyId);

        if (updateFeaturedError) {
          throw updateFeaturedError;
        }
      }

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .select("id, title, price, location, property_type, status, featured_image")
        .eq("id", propertyId)
        .single<PropertyRecord>();

      if (propertyError) {
        throw propertyError;
      }

      await sendPropertyToZapier({
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        property_type: property.property_type,
        featured_image: property.featured_image,
        status: property.status,
      });

      setFeedback("Images uploaded successfully.");
      setFiles([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        router.push(`/admin/properties/${propertyId}`);
      }, 1000);
    } catch (error: unknown) {
      console.error("UPLOAD ERROR:", error);

      if (typeof error === "object" && error !== null && "message" in error) {
        setFeedback(
          String((error as { message?: string }).message || "Upload failed.")
        );
      } else {
        setFeedback("Upload failed.");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-green-800">
        Upload Property Images
      </h1>

      <p className="mb-4 text-sm text-slate-600">
        Property ID: {propertyId || "Not found"}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4 block w-full rounded-lg border border-slate-300 p-3"
      />

      {files.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 font-medium text-slate-800">Selected files:</p>
          <ul className="space-y-1 text-sm text-slate-600">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {feedback && <p className="mt-4 text-sm text-slate-700">{feedback}</p>}
    </div>
  );
}