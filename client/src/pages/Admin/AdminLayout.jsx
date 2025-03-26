import { Diversity1Sharp } from "@mui/icons-material";
import AppSidebar from "../../components/Sidebar/AppSidebar.jsx";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="relative flex flex-row min-h-svh flex-col bg-background">
         <SidebarProvider>
          <AppSidebar />

        {/* Main Content */}
        <main className="flex flex-1">
          <header className="flex items-center justify-between px-4 h-12">
            <SidebarTrigger/>
          </header>
          {children}
        </main>
    </SidebarProvider>
    </div>
 
  );
};

export default AdminLayout;