"use client";
import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { LeftResourcePanel } from "./LeftResourcePanel";
import { RightPropertyPanel } from "./RightPropertyPanel";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ComponentToImg } from "./ComponentToImg";
import { Canvas } from "./Canvas";

export default function Home() {
  const child1Ref = React.useRef<ComponentToImg>(null);
  const [message, setMessage] = React.useState({});

  const [propertyInfo, setPropertyInfo] = React.useState({
    font: "",
    title: "",
    subTitle: "",
    author: "",
    icon: "",
    color: "",
    devicon: "",
    aspect: "",
    blur: "",
    blurTrans: "",
    logoPosition: "",
  });

  const onChildData = (data: {}) => {
    setMessage(data);
  };
  const onImageDowloadClick = (imgFormat: string) => {
    if (child1Ref.current) {
      child1Ref.current.downloadImage(imgFormat);
    }
  };

  const onPropInfoChange = (propInfo) => {
    setPropertyInfo(propInfo);
  };

  return (
    
      
          <Canvas/>
 
  );
}
