
import type { Dataset } from "types/co2";

interface WorkerResponse {
  success: boolean;
  data?: Dataset;
  error?: string;
}

self.onmessage = (event: MessageEvent<string>) => {
  try {
    const parsed: Dataset = JSON.parse(event.data) as Dataset;
    const response: WorkerResponse = { success: true, data: parsed };
    postMessage(response);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown parsing error';
    const response: WorkerResponse = { success: false, error: errorMessage };
    postMessage(response);
  }
};
