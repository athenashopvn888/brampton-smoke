import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const chat = await readFile(new URL("../app/delivery/BSCWebChat.tsx", import.meta.url), "utf8");
const delivery = await readFile(new URL("../app/delivery/DeliveryContent.tsx", import.meta.url), "utf8");

for (const expected of [
  'storeId: "BSC"',
  'sod-web-chat:BSC',
  'smsConsent',
  'required type="checkbox"',
  'Reply YES to confirm',
  '/api/web-chat/session',
  '/api/web-chat/messages',
  '/api/web-chat/id-review',
  'NEW_CUSTOMER',
  'RETURNING_CUSTOMER',
]) assert.ok(chat.includes(expected), `Missing Web Chat contract: ${expected}`);

assert.ok(delivery.includes("<BSCWebChat />"), "Delivery page must render Brampton Smoke Cannabis Web Chat");
assert.ok(!chat.includes('storeId: "P60"'), "Reference store identity must not remain");
console.log("Brampton Smoke Cannabis consent Web Chat contract passed.");
