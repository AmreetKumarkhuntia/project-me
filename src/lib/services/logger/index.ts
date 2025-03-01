import { defaultSeparator, ProcessLogger } from "lilac-typescript";

import { environment } from "$configuration/config/client";

export const logger = new ProcessLogger({
  printSeparator: environment === "production" ? "|" : defaultSeparator,
  skipFormatting: environment === "production",
});
