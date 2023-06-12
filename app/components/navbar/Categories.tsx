"use client";

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { BsSnow } from "react-icons/bs"
import { FaSkiing } from 'react-icons/fa'
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5"
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property has modern.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is the countryside.",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has got pools.",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on the islands.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle.",
  },
  {
    label: "Camp",
    icon: GiForestCamp,
    description: "This property has camping activities.",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is very cold.",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert.",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has a barn.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is exclusive.",
  },
];

function Categories() {
  const params = useSearchParams()
  const category = params?.get("category") 
  
  const pathname = usePathname()
  const isMainPage = pathname == '/'

  if (!isMainPage) {
    return null
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
