"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackEvent, type EventName, type EventParams } from "@/utils/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: EventName;
  params?: EventParams;
  children: ReactNode;
};

const TrackedLink = ({
  event,
  params,
  children,
  href,
  onClick,
  ...rest
}: TrackedLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, params);
    onClick?.(e);
  };

  return (
    <a href={href} {...rest} onClick={handleClick}>
      {children}
    </a>
  );
};

export default TrackedLink;
