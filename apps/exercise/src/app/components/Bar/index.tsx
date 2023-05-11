import { SVGProps } from "react"

export const Bar = ({ x, y, width, height, fill }: SVGProps<SVGRectElement>) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
    />
  )
}
