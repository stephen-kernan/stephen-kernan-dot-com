import { AboutPageSection } from "./types";
import { AspectRatio, ObjectPosition } from "@/types/ImageConfig";
import { EasyImage } from "@/components/EasyImage/EasyImage";

const sections: AboutPageSection[] = [
  {
    title: "About me",
    image: {
      url: "/us.webp",
      aspectRatio: AspectRatio.HORIZONTAL,
    },
    text: [
      "I am married to the love of my life, Ashley. We've been together for almost 10 years now and she makes me a better person.",
    ],
  },
  {
    image: {
      url: "/closeup.webp",
      aspectRatio: AspectRatio.VERTICAL,
    },
    title: "Hobbies",
    text: ["Video games", "Reading", "Writing code"],
  },
  {
    image: {
      url: "/linus.webp",
      aspectRatio: AspectRatio.HORIZONTAL,
    },
    title: "Pets",
    text: [
      "Pongo: a german shepherd x lab mix",
      "Linus: an orange cat (👻)",
      "Belle: a different kind of cat",
    ],
  },
  {
    image: {
      url: "/pongo.webp",
      aspectRatio: AspectRatio.SQUARE,
      objectPosition: ObjectPosition.TOP,
    },
    title: "Favorite things",
    text: ["Lamy Safari Pen", ""],
  },
];

export default function About() {
  return (
    <div className="split-page">
      <div className="main-content">
        {sections.map((section) => (
          <div key={section.image.url}>
            {section.title && <h2>{section.title}</h2>}
            {section.text?.map((text, idx: number) => (
              <p key={section.image.url + idx}>{text}</p>
            ))}
            <div className="mobile">
              <EasyImage {...section.image} />
            </div>
          </div>
        ))}
      </div>
      <div className="side-content">
        <div className="side-image-gallery">
          {sections.map((section: AboutPageSection) => (
            <EasyImage key={section.image.url} {...section.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
