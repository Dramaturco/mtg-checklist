import { useEffect, useState } from "react"

type CardProps = {
  name: string,
  colorType: string,
  dark?: boolean
}

function mapColorTypeToCSSColor(colortype: string): string {
  const typeMap = new Map<string, string>()
  typeMap.set("Red dark", "bg-red-500")
  typeMap.set("Red light", "bg-red-200")
  typeMap.set("Blue dark", "bg-blue-500")
  typeMap.set("Blue light", "bg-blue-200")
  typeMap.set("Green dark", "bg-green-500")
  typeMap.set("Green light", "bg-green-200")
  typeMap.set("Black dark", "bg-black-500")
  typeMap.set("Black light", "bg-black-200")
  typeMap.set("White dark", "bg-cream-500")
  typeMap.set("White light", "bg-cream-200")
  typeMap.set("Artifact dark", "bg-brown-500")
  typeMap.set("Artifact light", "bg-brown-200")
  typeMap.set("Land dark", "bg-land-500")
  typeMap.set("Land light", "bg-land-200")
  typeMap.set("Multicolor dark", "bg-gold-500")
  typeMap.set("Multicolor light", "bg-gold-200")

  return typeMap.get(colortype) || ""
}
export default function Card({name, colorType, dark}: CardProps){
  const [background, setBackground] = useState("bg-white")
  useEffect(() => {
    const cssColor = mapColorTypeToCSSColor(colorType + (dark ? " dark" : " light"))
    setBackground(cssColor)
  }, [colorType])
  return(
  <div className={`${background} px-2 py-1 border-black border-b-0 border w-1/3 m-auto`}>
    <p>{name}</p>
  </div>)
}