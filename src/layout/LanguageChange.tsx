import {
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const languageList = [
  {
    id: 1,
    lang: "en",
    name: "English",
    assets: "https://flagcdn.com/64x48/gb.png",
  },
  {
    id: 2,
    lang: "id",
    name: "Indonesia",
    assets: "https://flagcdn.com/64x48/id.png",
  },
];

const LanguageChange = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  return (
    <Menu isLazy placement="bottom-end">
      <MenuButton
        as={IconButton}
        icon={
          <Image
            rounded="full"
            w={8}
            h={8}
            src={`https://flagcdn.com/64x48/${
              i18n.language === "id" ? "id" : "gb"
            }.png`}
          />
        }
        variant="outline"
      />
      <MenuList
        style={{
          width: "20px",
        }}
      >
        {languageList.map((item) => (
          <MenuItem
            key={item.id}
            gap={4}
            display="flex"
            justifyContent="start"
            onClick={() => {
              i18n.changeLanguage(item.lang);
              router.push(router.pathname, router.pathname, {
                locale: item.lang,
              });
            }}
          >
            <Image boxSize={8} borderRadius="full" src={item.assets} />
            <Box>{item.name}</Box>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageChange;
