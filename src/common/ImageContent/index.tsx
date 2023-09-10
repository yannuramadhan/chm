import { ImageContentProps } from "../types";

export const ImageContent = ({ src, width, height }: ImageContentProps) => (
  <img src={`https://api.whnmandiri.co.id/${src}`} alt={src} width={width} height={height} />
);
