import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Toaster } from "sonner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main className="min-h-[calc(100vh-240px)]">
        {children}
        <Toaster richColors position="top-center" />
      </main>
      <Footer />
    </>
  );
}
