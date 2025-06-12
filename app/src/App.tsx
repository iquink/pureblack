import { useState, useEffect, useMemo } from "react";
import {
  ConfigProvider,
  Layout,
  Typography,
  Button,
  Switch,
  Select,
} from "antd";
import "./App.css";
import { generateWallpaper } from "./utils/generateWallpaper";
import { getTheme } from "./theme";
import { useTranslation } from "react-i18next";
import { languageOptions } from "./i18n/languageOptions";
import logo from "./assets/logo.png";

const { Content } = Layout;
const { Text } = Typography;

const App = () => {
  const { t, i18n } = useTranslation();

  const prefersDarkMode = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return prefersDarkMode ? "dark" : "light";
  });

  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [language, setLanguage] = useState(i18n.language || "en-US");

  useEffect(() => {
    const realWidth = window.screen.width * window.devicePixelRatio;
    const realHeight = window.screen.height * window.devicePixelRatio;
    setScreenSize({
      width: Math.round(realWidth),
      height: Math.round(realHeight),
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleLanguageChange = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <ConfigProvider theme={getTheme(themeMode)}>
      <Layout
        className={`main-layout ${themeMode === "dark" ? "dark" : "light"}`}
      >
        <Content className="content">
          <img
            src={logo}
            alt={t("logoAlt")}
            className="logo"
            role="img"
          />
          <div
            className="controls-bar"
            role="group"
            aria-label={t("controlsBar")}
          >
            <Select
              value={language}
              onChange={handleLanguageChange}
              options={languageOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              style={{ width: 120 }}
              aria-label={t("selectLanguage")}
            />
            <Switch
              checked={themeMode === "dark"}
              onChange={() =>
                setThemeMode(themeMode === "dark" ? "light" : "dark")
              }
              checkedChildren={t("theme.dark")}
              unCheckedChildren={t("theme.light")}
              aria-label={t("toggleTheme")}
            />
          </div>
          <Text className="info-text">{t("welcome")}</Text>
          <Text className="info-text">{t("NoMore")}</Text>
          <Text className="info-text">
            {t("screenResolution", {
              width: screenSize.width,
              height: screenSize.height,
            })}
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() =>
              generateWallpaper(screenSize.width, screenSize.height)
            }
            className="download-btn"
          >
            {t("downloadWallpaper")}
          </Button>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
