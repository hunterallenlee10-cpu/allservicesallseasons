// Start to Finish stories, built from his real photos in the order they happened.
// Titles and stage labels say only what is visible. No towns, prices, durations or names.
import type { PhotoId } from "./photos";
import type { ServiceId } from "./services";

export type Stage = { photo: PhotoId; label: string };

export type Project = {
  id: string;
  title: string;
  // The job ticked in the Punch List when "Want one like this?" is pressed.
  quoteJob: ServiceId;
  stages: Stage[];
};

export const PROJECTS: Project[] = [
  {
    id: "gazebo",
    title: "Backyard gazebo",
    quoteJob: "renovations",
    stages: [
      { photo: "04", label: "The patio" },
      { photo: "05", label: "Kit sorted" },
      { photo: "06", label: "Frame up" },
      { photo: "07", label: "Roof going on" },
      { photo: "08", label: "Done" },
    ],
  },
  {
    id: "basement",
    title: "Basement refresh",
    quoteJob: "renovations",
    stages: [
      { photo: "09", label: "Dark panelling" },
      { photo: "10", label: "Mid job" },
      { photo: "11", label: "Light and bright" },
      { photo: "12", label: "Finished" },
    ],
  },
  {
    id: "bookshelf",
    title: "Custom bookshelf",
    quoteJob: "renovations",
    stages: [
      { photo: "14", label: "First frame" },
      { photo: "15", label: "Built" },
      { photo: "16", label: "Paint starts" },
      { photo: "17", label: "Painted" },
      { photo: "18", label: "Installed" },
    ],
  },
  {
    id: "garden-beds",
    title: "Garden beds",
    quoteJob: "mulching",
    stages: [
      { photo: "23", label: "End of winter" },
      { photo: "24", label: "Fresh mulch" },
      { photo: "26", label: "The whole front" },
    ],
  },
  {
    // DRAFT: confirm the order of these two with the owner
    id: "deck-steps",
    title: "Deck steps",
    quoteJob: "renovations",
    stages: [
      { photo: "19", label: "Built" },
      { photo: "21", label: "Stained" },
    ],
  },
  {
    id: "mailbox",
    title: "Mailbox post",
    quoteJob: "handyman-services",
    stages: [
      { photo: "31", label: "Knocked off" },
      { photo: "33", label: "Back up, brand new" },
    ],
  },
  {
    id: "window-well",
    title: "Window well",
    quoteJob: "handyman-services",
    stages: [
      { photo: "35", label: "Rusted out" },
      { photo: "36", label: "Replaced" },
    ],
  },
  {
    id: "closet",
    title: "Closet shelving",
    quoteJob: "renovations",
    stages: [
      { photo: "37", label: "Wire shelf" },
      { photo: "38", label: "Solid wood" },
    ],
  },
];
