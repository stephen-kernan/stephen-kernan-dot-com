import ContentMetadata from "@/types/ContentMetadata";
import { FC } from "react";

import { formatDate } from "@/actions/formatDate";

export const Byline: FC<ContentMetadata> = ({ date, lastUpdated }) => {
  return (
    <div className="muted-text byline">
      by Stephen Kernan on {formatDate(date)}
      {lastUpdated && <span>
        <br/>(last updated on {formatDate(lastUpdated)})</span>}
    </div>
  );
};
