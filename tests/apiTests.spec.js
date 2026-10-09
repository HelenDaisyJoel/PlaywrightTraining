import { test, expect } from '../fixtures/myFixtures.js';

test('Get Request', async ({ request }) => {
  const apiResponse = await request.get("https://simple-tool-rental-api.click/status");
  const jsonResponse = await apiResponse.json();

  console.log(jsonResponse.status);

  expect(apiResponse.status()).toBe(200);
  expect(jsonResponse.status).toBe("UP");
});

test('Get Request Tools', async ({ request }) => {
  const apiResponse = await request.get("https://simple-tool-rental-api.click/tools");
  const jsonResponse = await apiResponse.json();

  console.log(jsonResponse);

  expect(apiResponse.status()).toBe(200);
});

test('Get Request-query params', async ({ request }) => {
  const apiResponse = await request.get(
    "https://simple-tool-rental-api.click/tools",
    {
      params: { category: "ladders" }
    }
  );

  const jsonResponse = await apiResponse.json();

  console.log(jsonResponse);

  expect(apiResponse.status()).toBe(200);
});

test('Authentication with post', async ({ request, apifixures }) => {

  console.log("Token:", apifixures);

  const apiResponse = await request.post(
    "https://simple-tool-rental-api.click/orders",
    {
      data: {
        toolId: 5499,
        customerName: "John Doe"
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apifixures}`
      }
    }
  );

  const jsonResponse = await apiResponse.json();

  console.log(jsonResponse);

  expect(apiResponse.status()).toBe(201);
});