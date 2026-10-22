import { cache } from "react";
import { SHOW_CIGARETTES } from "./siteConfig";

/**
 * Diagnostic snapshot for /api/content-status.
 * This store's cigarette pages stay on the existing NEXT_PUBLIC_SHOW_CIGARETTES
 * gate and the next.config redirects. The feed does not replace those routes.
 */
export type CigaretteSnapshot = {
  web: { show: boolean };
  tv: { show: boolean };
  guides: { show: boolean };
};

function codedSnapshot(): CigaretteSnapshot {
  const show = SHOW_CIGARETTES;
  return { web: { show }, tv: { show }, guides: { show } };
}

export const getCigaretteSnapshot = cache(async (): Promise<CigaretteSnapshot> => codedSnapshot());
