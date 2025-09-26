import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
