import {
  decodeDatabase,
  decodeFramework,
  decodeLanguage,
  decodeTool,
  type Database,
  type Framework,
  type Language,
  type Tool,
} from "$generated/types";

export function decodeTech(
  tech: string
): Language | Framework | Tool | Database | null {
  const decodedLang = decodeLanguage(tech);
  const decodedFramework = decodeFramework(tech);
  const decodedTool = decodeTool(tech);
  const decodedDatabase = decodeDatabase(tech);
  switch (tech) {
    case "scss":
      return "sass";
    default:
      break;
  }
  return decodedLang ?? decodedFramework ?? decodedTool ?? decodedDatabase;
}
