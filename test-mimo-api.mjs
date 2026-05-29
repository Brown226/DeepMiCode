/**
 * Test actual MiMo API integration.
 * This script tests the real API endpoints to verify functionality.
 */

const MIMO_API_KEY = "tp-e82vm1g24o4lnjmjo83qn0blrc3qbe803dxmx2cc0t0798yh";
const MIMO_BASE_URL = "https://token-plan-ams.xiaomimimo.com/v1";

async function testMimoAPI() {
  console.log("=== Testing MiMo API Integration ===\n");

  // Test 1: List models
  console.log("1. Testing /v1/models endpoint...");
  try {
    const modelsResp = await fetch(`${MIMO_BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${MIMO_API_KEY}` },
    });
    if (modelsResp.ok) {
      const models = await modelsResp.json();
      console.log(`   ✓ Found ${models.data.length} models`);
      console.log(`   Models: ${models.data.map(m => m.id).join(", ")}`);
    } else {
      console.log(`   ✗ Failed: ${modelsResp.status}`);
    }
  } catch (err) {
    console.log(`   ✗ Error: ${err.message}`);
  }

  // Test 2: Chat completion (non-streaming)
  console.log("\n2. Testing chat completion (non-streaming)...");
  try {
    const chatResp = await fetch(`${MIMO_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MIMO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [{ role: "user", content: "Say 'Hello from MiMo' in one sentence." }],
        max_tokens: 100,
        stream: false,
      }),
    });
    if (chatResp.ok) {
      const data = await chatResp.json();
      const choice = data.choices?.[0]?.message;
      console.log(`   ✓ Response received`);
      console.log(`   Content: ${choice?.content?.substring(0, 100)}`);
      console.log(`   Reasoning: ${choice?.reasoning_content?.substring(0, 100)}`);
      console.log(`   Usage:`, JSON.stringify(data.usage, null, 2));
    } else {
      console.log(`   ✗ Failed: ${chatResp.status}`);
    }
  } catch (err) {
    console.log(`   ✗ Error: ${err.message}`);
  }

  // Test 3: Tool calling
  console.log("\n3. Testing tool calling...");
  try {
    const toolResp = await fetch(`${MIMO_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MIMO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [{ role: "user", content: "What's the weather in Beijing?" }],
        max_tokens: 200,
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Get weather for a city",
              parameters: {
                type: "object",
                properties: {
                  city: { type: "string", description: "City name" },
                },
                required: ["city"],
              },
            },
          },
        ],
      }),
    });
    if (toolResp.ok) {
      const data = await toolResp.json();
      const choice = data.choices?.[0]?.message;
      console.log(`   ✓ Response received`);
      console.log(`   Finish reason: ${data.choices?.[0]?.finish_reason}`);
      if (choice?.tool_calls) {
        console.log(`   Tool call: ${choice.tool_calls[0]?.function?.name}`);
        console.log(`   Arguments: ${choice.tool_calls[0]?.function?.arguments}`);
      }
    } else {
      console.log(`   ✗ Failed: ${toolResp.status}`);
    }
  } catch (err) {
    console.log(`   ✗ Error: ${err.message}`);
  }

  // Test 4: Streaming
  console.log("\n4. Testing streaming...");
  try {
    const streamResp = await fetch(`${MIMO_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MIMO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [{ role: "user", content: "Count from 1 to 5." }],
        max_tokens: 100,
        stream: true,
      }),
    });
    if (streamResp.ok) {
      const reader = streamResp.body.getReader();
      const decoder = new TextDecoder();
      let chunks = 0;
      let content = "";
      let reasoning = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta;
            if (delta?.content) content += delta.content;
            if (delta?.reasoning_content) reasoning += delta.reasoning_content;
            chunks++;
          } catch {
            // Skip malformed chunks
          }
        }
      }

      console.log(`   ✓ Streaming completed`);
      console.log(`   Chunks received: ${chunks}`);
      console.log(`   Content: ${content.substring(0, 100)}`);
      console.log(`   Reasoning: ${reasoning.substring(0, 100)}`);
    } else {
      console.log(`   ✗ Failed: ${streamResp.status}`);
    }
  } catch (err) {
    console.log(`   ✗ Error: ${err.message}`);
  }

  console.log("\n=== API Tests Complete ===");
}

testMimoAPI().catch(console.error);
