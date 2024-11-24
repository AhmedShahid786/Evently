import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth()
  if(!session) redirect("/login")
  if(session.user.role == "user") redirect("/")
  return (
    <html>
      <body className="min-w-screen min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-full">
            <div className="w-full flex justify-between items-center my-4">
              <SidebarTrigger />
              <h1 className="font-bold font-sans text-3xl text-slate-500">
                Admin Panel
              </h1>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <div>{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
