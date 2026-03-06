"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UploadClientProps = {
  propertyId?: string;
};

export default function UploadClient({ propertyId }: UploadClientProps) {
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    if (!propertyId) {
      alert("Missing propertyId in URL");
      return;
    }

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `properties/${propertyId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("property-media")
      .upload(filePath, file);

    if (uploadError) {
      alert("Upload failed");
      console.log(uploadError);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("property-media")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    const { error: insertError } = await supabase.from("property_media").insert({
      property_id: propertyId,
      media_type: "image",
      url: imageUrl,
    });

    if (insertError) {
      alert("Image uploaded, but database save failed");
      console.log(insertError);
      setUploading(false);
      return;
    }

    alert("Image uploaded successfully!");
    setUploading(false);
    setFile(null);
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Upload Property Image</h1>

      <p className="mb-4 text-sm text-gray-600">
        Property ID: {propertyId ?? "Not found"}
      </p>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      <button
        type="button"
        onClick={handleUpload}
        className="bg-black text-white px-6 py-3 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </>
  );
}