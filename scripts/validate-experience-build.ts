import {
  DEFAULT_APPROVALS,
  PublicationBlockedError,
  admitPublication,
  buildApprovals,
  getPublicationConfig,
} from "../src/content/homepage/publication";

const config = getPublicationConfig();
const failures: string[] = [];

// 1. Current-status admission must not throw (draft keeps Foundation while the
//    V3 skeleton is incomplete; preview keeps Foundation until skeletonComplete).
try {
  const admission = admitPublication(config);
  console.log(
    `[validate-experience-build] status=${config.status} composition=${admission.composition}`
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  failures.push(`admission for status ${config.status} blocked unexpectedly: ${message}`);
}

// 2. The complete V3 skeleton is admitted in preview once parity passes.
try {
  const admission = admitPublication(
    { status: "preview", approvals: DEFAULT_APPROVALS },
    { skeletonComplete: true }
  );
  if (admission.composition !== "v3-skeleton") {
    failures.push(`expected v3-skeleton composition, got ${admission.composition}`);
  }
  console.log("[validate-experience-build] v3-skeleton composition admitted");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  failures.push(`v3-skeleton admission blocked unexpectedly: ${message}`);
}

// 3. Release stays fail-closed on the real content (approvals granted but
//    evidence placeholder, EN registry empty, routes incomplete).
try {
  admitPublication({ status: "release", approvals: buildApprovals() });
  failures.push("release admission unexpectedly passed");
} catch (error) {
  if (error instanceof PublicationBlockedError) {
    console.log(
      `[validate-experience-build] release fail-closed OK (${error.problems.length} problems)`
    );
  } else {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`release admission failed with an unexpected error: ${message}`);
  }
}

if (failures.length > 0) {
  console.error(`[validate-experience-build] FAILED:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("[validate-experience-build] gate OK");
