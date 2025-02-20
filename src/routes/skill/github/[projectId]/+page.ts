import type { PageLoad } from "./$types";

export const load: PageLoad = (data) => {
  return {
    projectId: data.params.projectId,
  };
};
