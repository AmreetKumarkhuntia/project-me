import {
  isJSON,
  decodeString,
  _decodeString,
  decodeArray,
  _decodeArray,
  decodeNumber,
  _decodeNumber,
} from "type-decoder";

/**
 * @type { TechnicalCategory }
 */
export type TechnicalCategory = {
  /**
   * @type { string }
   * @memberof TechnicalCategory
   */
  title: string;
  /**
   * @type { IconEnum }
   * @memberof TechnicalCategory
   */
  icon: IconEnum;
  /**
   * @type { TechnicalItem[] }
   * @memberof TechnicalCategory
   */
  items: TechnicalItem[];
};

export function decodeTechnicalCategory(
  rawInput: unknown,
): TechnicalCategory | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedIcon = decodeIconEnum(rawInput["icon"]);
    const decodedItems = decodeArray(rawInput["items"], decodeTechnicalItem);

    if (
      decodedTitle === null ||
      decodedIcon === null ||
      decodedItems === null
    ) {
      return null;
    }

    return {
      title: decodedTitle,
      icon: decodedIcon,
      items: decodedItems,
    };
  }
  return null;
}

/**
 * @type { IconEnum }
 */
export type IconEnum = "cpu" | "database" | "cloud";

export function decodeIconEnum(rawInput: unknown): IconEnum | null {
  switch (rawInput) {
    case "cpu":
    case "database":
    case "cloud":
      return rawInput;
  }
  return null;
}

export function _decodeIconEnum(rawInput: unknown): IconEnum | undefined {
  switch (rawInput) {
    case "cpu":
    case "database":
    case "cloud":
      return rawInput;
  }
  return;
}

/**
 * @type { TechnicalItem }
 */
export type TechnicalItem = {
  /**
   * @type { string }
   * @memberof TechnicalItem
   */
  title: string;
  /**
   * @type { string }
   * @memberof TechnicalItem
   */
  badge: string;
  /**
   * @type { string }
   * @memberof TechnicalItem
   */
  desc: string;
};

export function decodeTechnicalItem(rawInput: unknown): TechnicalItem | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedBadge = decodeString(rawInput["badge"]);
    const decodedDesc = decodeString(rawInput["desc"]);

    if (
      decodedTitle === null ||
      decodedBadge === null ||
      decodedDesc === null
    ) {
      return null;
    }

    return {
      title: decodedTitle,
      badge: decodedBadge,
      desc: decodedDesc,
    };
  }
  return null;
}

/**
 * @type { HomeConfig }
 */
export type HomeConfig = {
  /**
   * @type { string[] }
   * @memberof HomeConfig
   */
  secondSubtitles: string[];
  /**
   * @type { string }
   * @memberof HomeConfig
   */
  linkSize: string;
  /**
   * @type { number }
   * @memberof HomeConfig
   */
  constantAvatarLazyLoaderDelay: number;
};

export function decodeHomeConfig(rawInput: unknown): HomeConfig | null {
  if (isJSON(rawInput)) {
    const decodedSecondSubtitles = decodeArray(
      rawInput["secondSubtitles"],
      decodeString,
    );
    const decodedLinkSize = decodeString(rawInput["linkSize"]);
    const decodedConstantAvatarLazyLoaderDelay = decodeNumber(
      rawInput["constantAvatarLazyLoaderDelay"],
    );

    if (
      decodedSecondSubtitles === null ||
      decodedLinkSize === null ||
      decodedConstantAvatarLazyLoaderDelay === null
    ) {
      return null;
    }

    return {
      secondSubtitles: decodedSecondSubtitles,
      linkSize: decodedLinkSize,
      constantAvatarLazyLoaderDelay: decodedConstantAvatarLazyLoaderDelay,
    };
  }
  return null;
}

/**
 * @type { ProjectItem }
 */
export type ProjectItem = {
  /**
   * @type { string }
   * @memberof ProjectItem
   */
  title: string;
  /**
   * @type { string[] }
   * @memberof ProjectItem
   */
  tags: string[];
  /**
   * @type { ProjectItemProblem }
   * @memberof ProjectItem
   */
  problem: ProjectItemProblem;
  /**
   * @type { ProjectItemEngineering }
   * @memberof ProjectItem
   */
  engineering: ProjectItemEngineering;
  /**
   * @type { ProjectItemImpact }
   * @memberof ProjectItem
   */
  impact: ProjectItemImpact;
  /**
   * @type { ProjectItemArchitecture }
   * @memberof ProjectItem
   */
  architecture: ProjectItemArchitecture;
};

export function decodeProjectItem(rawInput: unknown): ProjectItem | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedTags = decodeArray(rawInput["tags"], decodeString);
    const decodedProblem = decodeProjectItemProblem(rawInput["problem"]);
    const decodedEngineering = decodeProjectItemEngineering(
      rawInput["engineering"],
    );
    const decodedImpact = decodeProjectItemImpact(rawInput["impact"]);
    const decodedArchitecture = decodeProjectItemArchitecture(
      rawInput["architecture"],
    );

    if (
      decodedTitle === null ||
      decodedTags === null ||
      decodedProblem === null ||
      decodedEngineering === null ||
      decodedImpact === null ||
      decodedArchitecture === null
    ) {
      return null;
    }

    return {
      title: decodedTitle,
      tags: decodedTags,
      problem: decodedProblem,
      engineering: decodedEngineering,
      impact: decodedImpact,
      architecture: decodedArchitecture,
    };
  }
  return null;
}

/**
 * @type { ProjectItemProblem }
 */
export type ProjectItemProblem = {
  /**
   * @type { string }
   * @memberof ProjectItemProblem
   */
  title: string;
  /**
   * @type { string }
   * @memberof ProjectItemProblem
   */
  description: string;
};

export function decodeProjectItemProblem(
  rawInput: unknown,
): ProjectItemProblem | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedDescription = decodeString(rawInput["description"]);

    if (decodedTitle === null || decodedDescription === null) {
      return null;
    }

    return {
      title: decodedTitle,
      description: decodedDescription,
    };
  }
  return null;
}

/**
 * @type { ProjectItemEngineering }
 */
export type ProjectItemEngineering = {
  /**
   * @type { string }
   * @memberof ProjectItemEngineering
   */
  title: string;
  /**
   * @type { string }
   * @memberof ProjectItemEngineering
   */
  description: string;
};

export function decodeProjectItemEngineering(
  rawInput: unknown,
): ProjectItemEngineering | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedDescription = decodeString(rawInput["description"]);

    if (decodedTitle === null || decodedDescription === null) {
      return null;
    }

    return {
      title: decodedTitle,
      description: decodedDescription,
    };
  }
  return null;
}

/**
 * @type { ProjectItemImpact }
 */
export type ProjectItemImpact = {
  /**
   * @type { string }
   * @memberof ProjectItemImpact
   */
  value: string;
  /**
   * @type { string }
   * @memberof ProjectItemImpact
   */
  description: string;
};

export function decodeProjectItemImpact(
  rawInput: unknown,
): ProjectItemImpact | null {
  if (isJSON(rawInput)) {
    const decodedValue = decodeString(rawInput["value"]);
    const decodedDescription = decodeString(rawInput["description"]);

    if (decodedValue === null || decodedDescription === null) {
      return null;
    }

    return {
      value: decodedValue,
      description: decodedDescription,
    };
  }
  return null;
}

/**
 * @type { ProjectItemArchitecture }
 */
export type ProjectItemArchitecture = {
  /**
   * @type { string }
   * @memberof ProjectItemArchitecture
   */
  title: string;
  /**
   * @type { ProjectItemArchitectureControlPlane }
   * @memberof ProjectItemArchitecture
   */
  controlPlane: ProjectItemArchitectureControlPlane;
  /**
   * @type { ProjectItemArchitectureDataPlane }
   * @memberof ProjectItemArchitecture
   */
  dataPlane: ProjectItemArchitectureDataPlane;
};

export function decodeProjectItemArchitecture(
  rawInput: unknown,
): ProjectItemArchitecture | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedControlPlane = decodeProjectItemArchitectureControlPlane(
      rawInput["controlPlane"],
    );
    const decodedDataPlane = decodeProjectItemArchitectureDataPlane(
      rawInput["dataPlane"],
    );

    if (
      decodedTitle === null ||
      decodedControlPlane === null ||
      decodedDataPlane === null
    ) {
      return null;
    }

    return {
      title: decodedTitle,
      controlPlane: decodedControlPlane,
      dataPlane: decodedDataPlane,
    };
  }
  return null;
}

/**
 * @type { ProjectItemArchitectureControlPlane }
 */
export type ProjectItemArchitectureControlPlane = {
  /**
   * @type { string }
   * @memberof ProjectItemArchitectureControlPlane
   */
  label: string;
  /**
   * @type { string[] }
   * @memberof ProjectItemArchitectureControlPlane
   */
  items: string[];
};

export function decodeProjectItemArchitectureControlPlane(
  rawInput: unknown,
): ProjectItemArchitectureControlPlane | null {
  if (isJSON(rawInput)) {
    const decodedLabel = decodeString(rawInput["label"]);
    const decodedItems = decodeArray(rawInput["items"], decodeString);

    if (decodedLabel === null || decodedItems === null) {
      return null;
    }

    return {
      label: decodedLabel,
      items: decodedItems,
    };
  }
  return null;
}

/**
 * @type { ProjectItemArchitectureDataPlane }
 */
export type ProjectItemArchitectureDataPlane = {
  /**
   * @type { string }
   * @memberof ProjectItemArchitectureDataPlane
   */
  label: string;
  /**
   * @type { string[] }
   * @memberof ProjectItemArchitectureDataPlane
   */
  nodes: string[];
};

export function decodeProjectItemArchitectureDataPlane(
  rawInput: unknown,
): ProjectItemArchitectureDataPlane | null {
  if (isJSON(rawInput)) {
    const decodedLabel = decodeString(rawInput["label"]);
    const decodedNodes = decodeArray(rawInput["nodes"], decodeString);

    if (decodedLabel === null || decodedNodes === null) {
      return null;
    }

    return {
      label: decodedLabel,
      nodes: decodedNodes,
    };
  }
  return null;
}

/**
 * @type { GitHubConfig }
 */
export type GitHubConfig = {
  /**
   * @type { string }
   * @memberof GitHubConfig
   */
  githubApiUrl: string | null;
  /**
   * @type { string }
   * @memberof GitHubConfig
   */
  githubApiVersion: string | null;
  /**
   * @type { string }
   * @memberof GitHubConfig
   */
  githubUserName: string | null;
  /**
   * @type { number }
   * @memberof GitHubConfig
   */
  githubPageIterations: number | null;
};

export function decodeGitHubConfig(rawInput: unknown): GitHubConfig | null {
  if (isJSON(rawInput)) {
    const decodedGithubApiUrl = decodeString(rawInput["githubApiUrl"]);
    const decodedGithubApiVersion = decodeString(rawInput["githubApiVersion"]);
    const decodedGithubUserName = decodeString(rawInput["githubUserName"]);
    const decodedGithubPageIterations = decodeNumber(
      rawInput["githubPageIterations"],
    );

    return {
      githubApiUrl: decodedGithubApiUrl,
      githubApiVersion: decodedGithubApiVersion,
      githubUserName: decodedGithubUserName,
      githubPageIterations: decodedGithubPageIterations,
    };
  }
  return null;
}

/**
 * @type { ExperienceItem }
 */
export type ExperienceItem = {
  /**
   * @type { string }
   * @memberof ExperienceItem
   */
  role: string;
  /**
   * @type { string }
   * @memberof ExperienceItem
   */
  company: string;
  /**
   * @type { string }
   * @memberof ExperienceItem
   */
  period: string;
  /**
   * @type { string }
   * @memberof ExperienceItem
   */
  description: string;
  /**
   * @type { string }
   * @memberof ExperienceItem
   */
  scaleImpact: string;
};

export function decodeExperienceItem(rawInput: unknown): ExperienceItem | null {
  if (isJSON(rawInput)) {
    const decodedRole = decodeString(rawInput["role"]);
    const decodedCompany = decodeString(rawInput["company"]);
    const decodedPeriod = decodeString(rawInput["period"]);
    const decodedDescription = decodeString(rawInput["description"]);
    const decodedScaleImpact = decodeString(rawInput["scaleImpact"]);

    if (
      decodedRole === null ||
      decodedCompany === null ||
      decodedPeriod === null ||
      decodedDescription === null ||
      decodedScaleImpact === null
    ) {
      return null;
    }

    return {
      role: decodedRole,
      company: decodedCompany,
      period: decodedPeriod,
      description: decodedDescription,
      scaleImpact: decodedScaleImpact,
    };
  }
  return null;
}

/**
 * @type { PhilosophyIcon }
 */
export type PhilosophyIcon = "bolt" | "pulse" | "shield";

export function decodePhilosophyIcon(rawInput: unknown): PhilosophyIcon | null {
  switch (rawInput) {
    case "bolt":
    case "pulse":
    case "shield":
      return rawInput;
  }
  return null;
}

export function _decodePhilosophyIcon(
  rawInput: unknown,
): PhilosophyIcon | undefined {
  switch (rawInput) {
    case "bolt":
    case "pulse":
    case "shield":
      return rawInput;
  }
  return;
}

/**
 * @type { PhilosophyItem }
 */
export type PhilosophyItem = {
  /**
   * @type { string }
   * @memberof PhilosophyItem
   */
  title: string;
  /**
   * @type { string }
   * @memberof PhilosophyItem
   */
  quote: string;
  /**
   * @type { PhilosophyIcon }
   * @memberof PhilosophyItem
   */
  icon: PhilosophyIcon;
};

export function decodePhilosophyItem(rawInput: unknown): PhilosophyItem | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedQuote = decodeString(rawInput["quote"]);
    const decodedIcon = decodePhilosophyIcon(rawInput["icon"]);

    if (
      decodedTitle === null ||
      decodedQuote === null ||
      decodedIcon === null
    ) {
      return null;
    }

    return {
      title: decodedTitle,
      quote: decodedQuote,
      icon: decodedIcon,
    };
  }
  return null;
}

/**
 * @type { SocialsItem }
 */
export type SocialsItem = {
  /**
   * @type { string }
   * @memberof SocialsItem
   */
  label: string;
  /**
   * @type { string }
   * @memberof SocialsItem
   */
  url: string;
};

export function decodeSocialsItem(rawInput: unknown): SocialsItem | null {
  if (isJSON(rawInput)) {
    const decodedLabel = decodeString(rawInput["label"]);
    const decodedUrl = decodeString(rawInput["url"]);

    if (decodedLabel === null || decodedUrl === null) {
      return null;
    }

    return {
      label: decodedLabel,
      url: decodedUrl,
    };
  }
  return null;
}

/**
 * @type { ContactConfig }
 */
export type ContactConfig = {
  /**
   * @type { string }
   * @memberof ContactConfig
   */
  subtitle: string;
  /**
   * @type { string }
   * @memberof ContactConfig
   */
  title: string;
  /**
   * @type { string }
   * @memberof ContactConfig
   */
  highlight: string;
  /**
   * @type { string }
   * @memberof ContactConfig
   */
  description: string;
  /**
   * @type { string }
   * @memberof ContactConfig
   */
  ctaText: string;
  /**
   * @type { SocialsItem[] }
   * @memberof ContactConfig
   */
  socials: SocialsItem[];
};

export function decodeContactConfig(rawInput: unknown): ContactConfig | null {
  if (isJSON(rawInput)) {
    const decodedSubtitle = decodeString(rawInput["subtitle"]);
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedHighlight = decodeString(rawInput["highlight"]);
    const decodedDescription = decodeString(rawInput["description"]);
    const decodedCtaText = decodeString(rawInput["ctaText"]);
    const decodedSocials = decodeArray(rawInput["socials"], decodeSocialsItem);

    if (
      decodedSubtitle === null ||
      decodedTitle === null ||
      decodedHighlight === null ||
      decodedDescription === null ||
      decodedCtaText === null ||
      decodedSocials === null
    ) {
      return null;
    }

    return {
      subtitle: decodedSubtitle,
      title: decodedTitle,
      highlight: decodedHighlight,
      description: decodedDescription,
      ctaText: decodedCtaText,
      socials: decodedSocials,
    };
  }
  return null;
}

/**
 * @type { MetricsItem }
 */
export type MetricsItem = {
  /**
   * @type { string }
   * @memberof MetricsItem
   */
  label: string;
  /**
   * @type { string }
   * @memberof MetricsItem
   */
  value: string;
};

export function decodeMetricsItem(rawInput: unknown): MetricsItem | null {
  if (isJSON(rawInput)) {
    const decodedLabel = decodeString(rawInput["label"]);
    const decodedValue = decodeString(rawInput["value"]);

    if (decodedLabel === null || decodedValue === null) {
      return null;
    }

    return {
      label: decodedLabel,
      value: decodedValue,
    };
  }
  return null;
}

/**
 * @type { FooterConfig }
 */
export type FooterConfig = {
  /**
   * @type { FooterConfigBrand }
   * @memberof FooterConfig
   */
  brand: FooterConfigBrand;
  /**
   * @type { SocialsItem[] }
   * @memberof FooterConfig
   */
  navLinks: SocialsItem[];
  /**
   * @type { SocialsItem[] }
   * @memberof FooterConfig
   */
  connectLinks: SocialsItem[];
  /**
   * @type { MetricsItem[] }
   * @memberof FooterConfig
   */
  metrics: MetricsItem[];
  /**
   * @type { string }
   * @memberof FooterConfig
   */
  copyright: string;
};

export function decodeFooterConfig(rawInput: unknown): FooterConfig | null {
  if (isJSON(rawInput)) {
    const decodedBrand = decodeFooterConfigBrand(rawInput["brand"]);
    const decodedNavLinks = decodeArray(
      rawInput["navLinks"],
      decodeSocialsItem,
    );
    const decodedConnectLinks = decodeArray(
      rawInput["connectLinks"],
      decodeSocialsItem,
    );
    const decodedMetrics = decodeArray(rawInput["metrics"], decodeMetricsItem);
    const decodedCopyright = decodeString(rawInput["copyright"]);

    if (
      decodedBrand === null ||
      decodedNavLinks === null ||
      decodedConnectLinks === null ||
      decodedMetrics === null ||
      decodedCopyright === null
    ) {
      return null;
    }

    return {
      brand: decodedBrand,
      navLinks: decodedNavLinks,
      connectLinks: decodedConnectLinks,
      metrics: decodedMetrics,
      copyright: decodedCopyright,
    };
  }
  return null;
}

/**
 * @type { FooterConfigBrand }
 */
export type FooterConfigBrand = {
  /**
   * @type { string }
   * @memberof FooterConfigBrand
   */
  title: string;
  /**
   * @type { string }
   * @memberof FooterConfigBrand
   */
  description: string;
};

export function decodeFooterConfigBrand(
  rawInput: unknown,
): FooterConfigBrand | null {
  if (isJSON(rawInput)) {
    const decodedTitle = decodeString(rawInput["title"]);
    const decodedDescription = decodeString(rawInput["description"]);

    if (decodedTitle === null || decodedDescription === null) {
      return null;
    }

    return {
      title: decodedTitle,
      description: decodedDescription,
    };
  }
  return null;
}
