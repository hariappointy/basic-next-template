import type { FlueClient } from "@flue/client";

export default async function hello(flue: FlueClient) {
  await flue.shell('echo "Hello from Flue!"');
}
