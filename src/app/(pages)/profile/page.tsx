import { CiUser } from "react-icons/ci";
import UserAddress from "@/components/userAddress/userAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import UserData from "@/components/userData/userData";
import UserPassword from "@/components/userPassword/userPassword";
import { Settings, MapPin, ShieldAlert } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default async function Profile() {
  const data = await getServerSession(authOptions);

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen relative flex flex-col justify-between overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <header className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10">
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-stone-900 font-medium">System Portal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900">
              Identity & <span className="font-serif italic text-emerald-600">Settings</span>
            </h1>
          </div>

          <p className="max-w-xs text-sm text-stone-500 font-light leading-relaxed">
            Manage system permissions, default delivery assignments, and identity profiles.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 flex-1 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          <div className="col-span-1 lg:col-span-1 border border-stone-200 bg-white p-6 rounded-xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200/60 flex items-center justify-center text-stone-400">
              <CiUser className="size-8" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">Verified Operator</span>
              <h3 className="text-md font-bold uppercase tracking-wide text-stone-900 truncate max-w-full px-2">
                {data?.user?.name}
              </h3>
              <p className="text-xs font-mono text-stone-500 lowercase break-all px-1">
                {data?.user?.email}
              </p>
            </div>
            <div className="w-full border-t border-dashed border-stone-200 pt-4 text-left">
              <div className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">System Node</div>
              <div className="text-xs font-medium text-stone-800 font-mono mt-0.5">USR-ID_019488</div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="border border-stone-200 bg-white p-6 rounded-xl flex flex-col">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3 mb-4">
                <MapPin className="size-4 text-emerald-600" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                  Logistics Routing Address
                </h4>
              </div>
              <div className="flex-1">
                <UserAddress />
              </div>
            </div>

            <div className="border border-stone-200 bg-white p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Settings className="size-4 text-emerald-600" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                  Security & Profile Parameters
                </h4>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-2 border-none">
                <AccordionItem value="profile-data" className="border border-stone-200 rounded-lg px-4 bg-stone-50/50">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="text-xs font-mono text-stone-700 uppercase tracking-wide text-left">
                      Modify Identity Metadata
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 border-t border-dashed border-stone-200/60">
                    <UserData />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="profile-security" className="border border-stone-200 rounded-lg px-4 bg-stone-50/50">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="text-xs font-mono text-stone-700 uppercase tracking-wide text-left">
                      Update Access Cipher
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 border-t border-dashed border-stone-200/60">
                    <UserPassword />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-3 flex items-start gap-2.5 mt-2">
                <ShieldAlert className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-light text-amber-800 leading-relaxed">
                  Modifying profile credentials will prompt validation workflows next time you pass active gates.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}