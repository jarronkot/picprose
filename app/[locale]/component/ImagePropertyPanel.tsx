"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Select,
  SelectItem,
  SliderValue,
  Selection,
  SelectSection,
  Input,
  Divider,
  Slider,
  Accordion,
  AccordionItem,
  Card,
  Listbox,
  CardBody,
  ListboxItem,
  Textarea,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { TwitterPicker, CirclePicker } from "react-color";
 
import { config } from "@/config";
import {useTranslations} from 'next-intl';
import { useShapesContext } from "../context/useShapesContext";

export const ImagePropertyPanel = (props) => {
  const {selectedShape, setSelectedShape} = useShapesContext();
  const titleArr = config.title;

  const [titleValue, setTitleValue] = React.useState(
    titleArr[Math.floor(Math.random() * 4)]
  );
  const [subTitleValue, setSubTitleValue] = React.useState(config.subTitle);
  const [authorValue, setAuthorValue] = React.useState(config.author);
  const [fontValue, setFontValue] = React.useState(config.font);
  const [iconValue, setIconValue] = React.useState(config.icon);
  const [backColor, setBackColor] = React.useState(config.backColor);
  const [backBlurLevel, setBackBlurLevel] = React.useState(config.backBlurLevel);
  const [deviconValue, setDevIconValue] = React.useState<Selection>(
    new Set(config.deviconValue)
  );
  const [aspectValue, setAspectValue] = React.useState(config.aspect);
  const [blurValue, setBlurValue] = React.useState<SliderValue>(config.blur);
  const [blurTransValue, setBlurTransValue] = React.useState<SliderValue>(config.blurTrans);
  const inputRef = React.useRef(null);
  const [logoPosition, setLogoPosition] = React.useState(config.logoPosition);
  const t = useTranslations('RightPropertyPanel');
  const handleFileChange = (event) => {
    if (event.target.files[0] != null) {
      const file = URL.createObjectURL(event.target.files[0]);
      setIconValue(file);
      setDevIconValue(new Set([""]));
    }
  };

  const handleAspectSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAspectValue(e.target.value);
  };

  const onFontSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontValue(e.target.value);
  };

  const getColorPlaceHolder = () => {
    backColor.replace("#", "");
  };

  const [propertyInfo, setPropertyInfo] = React.useState({
    font: "",
    title: "",
    subTitle: "",
    author: "",
    icon: "",
    devicon: "",
    color: "",
    aspect: "",
    blur: "",
    blurTrans: "",
    logoPosition: "",
  });

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      author: authorValue,
    }));
  }, [authorValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      title: titleValue,
    }));
  }, [titleValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      icon: iconValue,
    }));
  }, [iconValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      font: fontValue,
    }));
  }, [fontValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      logoPosition: logoPosition,
    }));
  }, [logoPosition]);

  React.useEffect(() => {
    var icon = "";
    if (deviconValue.size > 0) {
      icon = Array.from(deviconValue)[0].toString();
    }

    setPropertyInfo((preValue) => ({
      ...preValue,
      devicon: icon,
    }));
  }, [deviconValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      color: backColor,
    }));
  }, [backColor]);

  React.useEffect(() => {
 
    if(selectedShape&&selectedShape.type === 'image') {
      selectedShape.blur = blurTransValue as number/100.0;
      setSelectedShape({...selectedShape})
    } 
 

  }, [blurTransValue]);


  function updateProp<T>(prop : {key:string, value:T}) {
    if(selectedShape&&selectedShape.type === 'image') {
      // selectedShape.blur = blurTransValue as number/100.0;
      setSelectedShape({...selectedShape, ...prop})
    } 
  }
  React.useEffect(() => {
    var blurLevel: string = "backdrop-blur-none";
    if (typeof blurValue === "number") {
      if (blurValue == 0) {
        blurLevel = "backdrop-blur-none";
      } else if (blurValue == 20) {
        blurLevel = "backdrop-blur-sm";
      } else if (blurValue == 40) {
        blurLevel = "backdrop-blur";
      } else if (blurValue == 60) {
        blurLevel = "backdrop-blur-md";
      } else if (blurValue == 80) {
        blurLevel = "backdrop-blur-lg";
      } else if (blurValue == 100) {
        blurLevel = "backdrop-blur-xl";
      }
    }
    setPropertyInfo((preValue) => ({
      ...preValue,
      blur: blurLevel,
    }));
  }, [blurValue]);

  React.useEffect(() => {
    setPropertyInfo((preValue) => ({
      ...preValue,
      aspect: aspectValue,
    }));
  }, [aspectValue]);

 

  const dowloadImage = (imgFormat: string) => {
    props.onImageDowloadClick(imgFormat);
  };

  const img_aspect_x_list = [
    // 横屏
    { label: "1 : 1", value: "aspect-square", description: "900x450" },
    { label: "2 : 1", value: "aspect-[2/1]", description: "900x450" },
    { label: "3 : 2", value: "aspect-[3/2]", description: "900x450" },
    { label: "4 : 3", value: "aspect-[4/3]", description: "900x450" },
    { label: "16: 9", value: "aspect-[16/9]", description: "900x450" },
  ];

  const img_aspect_y_list = [
    //  竖屏
    { label: "1:2", value: "aspect-[1/2]", description: "900x450" },
    { label: "2:3", value: "aspect-[2/3]", description: "900x450" },
    { label: "3:4", value: "aspect-[3/4]", description: "900x450" },
    { label: "9:16", value: "aspect-[9/16]", description: "900x450" },
  ];

  const font_list = [
    {
      label: "Font-DingTalk",
      value: "font-dingtalk",
      description: "The largest land animal",
    },
    {
      label: "Font-Alibaba",
      value: "font-alibaba",
      description: "The largest land animal",
    },
    {
      label: "Font-OpenSans",
      value: "font-opensans",
      description: "The largest land animal",
    },
    {
      label: "Font-Anke",
      value: "font-anke",
      description: "The second most popular pet in the world",
    },
    {
      label: "Font-Roboto",
      value: "font-roboto-mono",
      description: "The most popular pet in the world",
    },
    {
      label: "Font-KingSoft",
      value: "font-kingsoft",
      description: "The largest land animal",
    },
    {
      label: "Font-XinYiGuanHei",
      value: "font-xinyiguanhei",
      description: "The largest land animal",
    },
  ];

  const backStyle = {
    fontSize: "20px",
    backgroundColor: backColor,
    borderWidth: "6px",
    borderColor: "#E9E9EB",
  };

  const handleColorChangeComplete = (color) => {
    setBackColor(color.hex.toUpperCase());
  };

  const handleColorBlurChangeComplete = (level) => {
    setBackBlurLevel(level);
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="verflow-y-auto overflow-x-hidden justify-center flex flex-wrap px-4">
        <Select
          label={t('aspect')}
          className="max-w-xs py-2"
          defaultSelectedKeys={["aspect-[16/9]"]}
          onChange={handleAspectSelectionChange}
        >
          <SelectSection showDivider title="横屏">
            {img_aspect_x_list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection showDivider title="竖屏">
            {img_aspect_y_list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
        <Divider />
        <div className="flex w-full py-2">
          <div className="w-4/5">
            <Input
              type="url"
              label={t('mask')}
              value={backColor}
              placeholder={backColor}
            />
          </div>
          <div className="flex-grow" />
          <div className="w-1/6 ml-2 mt-1">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  color="primary"
                  variant="bordered"
                  size="lg"
                  style={backStyle}
                ></Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
              >
                <DropdownItem key="text">
                  <div className="m-2">
                    <CirclePicker
                      colors={[
                        "#1f2937",
                        "#e91e63",
                        "#9c27b0",
                        "#673ab7",
                        "#3f51b5",
                        "#2196f3",
                        "#03a9f4",
                        "#00bcd4",
                        "#009688",
                        "#4caf50",
                        "#8bc34a",
                        "#cddc39",
                      ]}
                      onChangeComplete={handleColorChangeComplete}
                    />
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Slider
          label={t('transparence')}
          value={selectedShape?.blur}
          onChange={(value) => {
            updateProp<number>({"blur": value})
          }}
          size="sm"
          step={1}
          className="max-w-md my-2"
        />
      </div>
    </div>
  );
};
