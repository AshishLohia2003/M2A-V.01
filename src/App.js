import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Records from "./scenes/records";
import Downtime from "./scenes/downtime";
import Home from "./scenes/home";
import Records2 from "./scenes/records_2";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Footer from "./scenes/global/Footer";
import { SupabaseProvider } from "./context/supabaseContext2";
import { LimitProvider } from "./context/limitContext";
import MachineProfile2 from "./scenes/machine2";


function App({token}) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  

  return (


    <LimitProvider>

        <SupabaseProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar token={token} setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="/machine2" element={<MachineProfile2 />} />
                    <Route path="/downtime" element={<Downtime />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/records2" element={<Records2 />} />
                  </Routes>
                  <Footer setIsSidebar={setIsSidebar} />
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SupabaseProvider>
    </LimitProvider>

    
  );
}

export default App;
