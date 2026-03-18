import UploadClient from "./UploadClient";

type UploadPageProps = {
  searchParams: Promise<{
    propertyId?: string;
  }>;
};

export default async function UploadPage({ searchParams }: UploadPageProps) {
  const params = await searchParams;
  const propertyId = params.propertyId ?? "";

  return (
    <main className="mx-auto max-w-xl p-10">
      <UploadClient propertyId={propertyId} />
    </main>
  );
}