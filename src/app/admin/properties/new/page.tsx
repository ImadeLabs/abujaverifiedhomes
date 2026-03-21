"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    area: "",
    city: "Abuja",
    listingType: "sale",
    propertyType: "",
    verified: false,
    featured: false,
    status: "published",
    coverImageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create property");
      }

      setMessage("Property created successfully.");

      setTimeout(() => {
        router.push("/listings");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create property.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Property
          </h1>
          <p className="mt-2 text-slate-600">
            Create a new listing for Abuja Verified Homes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded border p-3"
              placeholder="e.g. 4 Bedroom Duplex in Wuse 2"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border p-3"
              placeholder="e.g. 250000000"
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Area</label>
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                className="w-full rounded border p-3"
                placeholder="e.g. Wuse 2"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded border p-3"
                placeholder="Abuja"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Listing Type</label>
              <select
                name="listingType"
                value={form.listingType}
                onChange={handleChange}
                className="w-full rounded border p-3"
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Property Type</label>
              <input
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full rounded border p-3"
                placeholder="e.g. Duplex, Flat, Apartment"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Cover Image URL</label>
            <input
              name="coverImageUrl"
              value={form.coverImageUrl}
              onChange={handleChange}
              className="w-full rounded border p-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded border p-3"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="verified"
                checked={form.verified}
                onChange={handleChange}
              />
              Verified
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>

          {message && <p className="text-sm text-slate-700">{message}</p>}
        </form>
      </section>
    </main>
  );
}
