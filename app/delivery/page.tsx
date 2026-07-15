import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — Brampton Smoke Cannabis | Brampton",
  description: "Get notified when Brampton Smoke Cannabis launches same-day weed delivery across Brampton and surrounding areas.",
  alternates: {
    canonical: "https://www.bramptonsmokecannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
