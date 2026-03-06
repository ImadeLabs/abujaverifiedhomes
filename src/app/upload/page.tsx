import UploadClient from "./UploadClient";

type UploadPageProps = {
  searchParams: Promise<{ propertyId?: string }>;
};

export default async function UploadPage({ searchParams }: UploadPageProps) {
  const params = await searchParams;
  const propertyId = params.propertyId;

  return (
    <main className="p-10 max-w-xl mx-auto">
      <UploadClient propertyId={propertyId} />
    </main>
  );
}