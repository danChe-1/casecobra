"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImgUrl,
  color,
}: {
  croppedImgUrl: string;
  color: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });
  let caseBackgroundColor = "bg-zinc-950";
  if (color === "blue") caseBackgroundColor = "bg-blue-950";
  if (color === "rose") caseBackgroundColor = "bg-rose-950";
  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);
  return (
    <AspectRatio className="relative" ref={ref} ratio={3000 / 2001}>
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          src={croppedImgUrl}
          width={renderedDimensions.width / (3000 / 637)}
          alt="your case"
          className={cn(
            "phone-skew relative rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
            caseBackgroundColor,
          )}
        />
      </div>
      <div className="relative z-40 h-full w-full">
        <img
          src="/clearphone.png"
          className="pointer-events-none h-full w-full rounded-md antialiased"
          alt="phone"
        />
      </div>
    </AspectRatio>
  );
};
export default PhonePreview;
