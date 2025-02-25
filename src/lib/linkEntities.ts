// import Link from "next/link";
import civData from "../../public/civ_data.json"; // Adjust path if necessary

export function linkEntities(content: string) {
  const entityTypes = ["civilizations", "resources", "wonders", "leaders", "units"];

  let modifiedContent = content;

  entityTypes.forEach((type) => {
    Object.keys(civData[type as keyof typeof civData]).forEach((entity) => {
      const entityUrl = `/${type}/${entity.replace(/\s+/g, "-")}`;
      const entityRegex = new RegExp(`\\b${entity}\\b`, "g"); // Match full words

      modifiedContent = modifiedContent.replace(
        entityRegex,
        `<a href="${entityUrl}" class="text-blue-600 hover:underline">${entity}</a>`
      );
    });
  });

  return modifiedContent;
}
