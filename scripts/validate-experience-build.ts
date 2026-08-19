import { admitPublication, getPublicationConfig } from "../src/content/homepage/publication";

const config = getPublicationConfig();

try {
  const admission = admitPublication(config);
  console.log(`[validate-experience-build] status=${config.status} admission=${admission}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[validate-experience-build] blocked: ${message}`);
  process.exit(1);
}
