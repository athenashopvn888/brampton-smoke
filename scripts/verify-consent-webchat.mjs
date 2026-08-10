import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const chat = await readFile(new URL("../app/delivery/BSCWebChat.tsx", import.meta.url), "utf8");
const delivery = await readFile(new URL("../app/delivery/DeliveryContent.tsx", import.meta.url), "utf8");

for (const expected of [
  'storeId: "BSC"',
  'sod-web-chat:BSC',
  'smsConsent',
  'required type="checkbox"',
  'workflowVersion: "READY_V1"',
  'I agree to receive one READY delivery-link text for this order.',
  '/api/web-chat/session',
  '/api/web-chat/messages',
  '/api/web-chat/id-review',
  '/api/web-chat/phone',
  'phoneConfirmation: replacementPhoneConfirmation',
  'phoneVersion: conversation.phoneVersion',
  'START ANOTHER ORDER',
  '/api/web-chat/order-cycle',
  'requestId: crypto.randomUUID()',
  'securely retained for future identity and address verification',
  'NEW_CUSTOMER',
  'RETURNING_CUSTOMER',
]) assert.ok(chat.includes(expected), `Missing Web Chat contract: ${expected}`);

assert.ok(delivery.includes("<BSCWebChat />"), "Delivery page must render Brampton Smoke Cannabis Web Chat");
assert.ok(!chat.includes('storeId: "P60"'), "Reference store identity must not remain");
assert.match(chat, /new URLSearchParams\(window\.location\.search\)\.get\("liveOrder"\) !== "1"/);
assert.match(chat, /window\.setTimeout\(\(\) => setOpen\(true\), 0\)/);
assert.doesNotMatch(chat, /useState\(\(\) => typeof window[^\n]+liveOrder/);
assert.doesNotMatch(`${chat}\n${delivery}`, /href=["'{`]sms:|DELIVERY TEXT NUMBER|Reply YES|YES confirmation/i);
assert.doesNotMatch(`${chat}\n${delivery}`, /SOD_(?:OPERATOR_ALERT|DISPATCHER_MAIN)_PHONE|Dispatcher Main/i);
console.log("Brampton Smoke Cannabis consent Web Chat contract passed.");
