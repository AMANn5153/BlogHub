import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import AppSidebar from "../../components/Sidebar/AppSidebar.jsx"

const AdminLayout = ({children}) => {
    return(
        <SidebarProvider defaultOpen = {false} >
            <AppSidebar />
                <SidebarTrigger />
            <main>
                {children}
            </main>
      </SidebarProvider>
    )
}

export default AdminLayout;