import ContentMetadata from "@/types/ContentMetadata";
import { FC } from "react";

import { formatDate } from "@/actions/formatDate";
import { slugifyTitle } from "@/actions/slugifyTitle";

export const Byline: FC<ContentMetadata> = ({ date, title }) => {
  return (
    <div className="muted-text byline">
      by Stephen Kernan on{" "}
      <span style={{ viewTransitionName: `date-${slugifyTitle(title)}` }}>
        {formatDate(date)}
      </span>
    </div>
  );
};
