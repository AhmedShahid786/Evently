import { Sidebar } from "@/components/SidebarMenu/SidebarMenu";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import Head from "next/head";

export default async function Layout({ children }) {
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user.role === "user") redirect("/");
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="Manage your events, categories, subcategories and users."
        />
      </Head>
      <main className="min-w-screen min-h-screen bg-black flex">
        <aside className="w-16 min-h-screen" aria-label="Sidebar navigation">
          <Sidebar />
        </aside>
        <section className="w-full h-full">{children}</section>
      </main>
    </>
  );
}
