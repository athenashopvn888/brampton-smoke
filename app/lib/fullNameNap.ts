/**
 * BSC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "BSC01",
  "fullName": "Brampton Smoke Cannabis Dispensary Weed Delivery",
  "street": "132 Falby Rd, Unit B",
  "city": "Brampton",
  "region": "ON",
  "postal": "L6P 4L9",
  "phoneDisplay": "(289) 819-5009",
  "phoneTel": "tel:+12898195009",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJXfDoWpI9K4gRYd41mF3PBpU",
  "placeId": "ChIJXfDoWpI9K4gRYd41mF3PBpU",
  "neighbourhood": "East Brampton",
  "intersection": "",
  "transit": "Brampton Transit routes serving nearby Steeles Avenue.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
