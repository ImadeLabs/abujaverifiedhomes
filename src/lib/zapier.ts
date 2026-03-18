export async function sendPropertyToZapier(payload: {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type?: string | null;
  featured_image?: string | null;
  status?: string | null;
}) {
  const webhookUrl = process.env.NEXT_PUBLIC_ZAPIER_PROPERTY_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Zapier webhook URL not set");
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        source: "AbujaVerifiedHomes",
        created_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Zapier webhook error:", error);
  }
}