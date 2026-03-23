import { encoding_for_model } from "tiktoken";

const encoder = encoding_for_model("gpt-3.5-turbo");

const decoder = new TextDecoder(); // ✅ important

export function encodeText(text) {
  const tokenIds = Array.from(encoder.encode(text));

  let tokens = [];

  for (let i = 0; i < tokenIds.length; i++) {
    const currentBytes = encoder.decode(tokenIds.slice(0, i + 1));
    const prevBytes =
      i === 0
        ? new Uint8Array()
        : encoder.decode(tokenIds.slice(0, i));

    // ✅ convert bytes → string FIRST
    const currentText = decoder.decode(currentBytes);
    const prevText = decoder.decode(prevBytes);

    // ✅ now extract token
    const token = currentText.slice(prevText.length);

    tokens.push(token);
  }

  return {
    tokenIds,
    tokens,
    tokenCount: tokenIds.length,
  };
}