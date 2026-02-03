import { CiUser } from "react-icons/ci";
import UserAddress from "@/components/userAddress/userAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import UserData from "@/components/userData/userData";
import UserPassword from "@/components/userPassword/userPassword";
import { IoMdHome } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";


export default async function Profile() {
  const data = await getServerSession(authOptions);
  return (
    <>
      <div className="max-w-6xl mx-auto my-2">
        <div className="grid grid-cols-1 md:grid-cols-4 p-1 mb-5">
          <div className="col-span-1 md:col-span-4 flex flex-wrap items-center gap-5 bg-gray-100 p-5 m-3 rounded-xl shadow-xl">
            <CiUser className="size-5 md:size-8 bg-cyan-600 p-1 rounded-2xl text-cyan-200" />
            <div className="flex flex-col gap-0.5 capitalize">
              <h3 className="md:text-xl text-base font-bold">
                {data?.user?.name} .User
              </h3>
              <span className="text-base">{data?.user?.email}</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 bg-blur p-5 m-3">
            <h4 className="text-xl flex gap-2 items-center">
              <IoMdHome  className="size-5 md:size-8 bg-cyan-600 p-1 rounded-2xl text-cyan-200" />
              Add your address
            </h4>
            <UserAddress />
          </div>
          <div className="col-span-1 md:col-span-2 bg-blur p-5 m-3">
            <h4 className="text-xl flex gap-2 items-center">
              <GrUpdate className="size-5 md:size-7 bg-cyan-600 p-1 rounded-2xl text-cyan-200" />
              Update your data
              </h4>
            <UserData />
            <h4 className="text-xl flex gap-2 items-center">
              <GrUpdate  className="size-5 md:size-7 bg-cyan-600 p-1 rounded-2xl text-cyan-200" />
              Update your password
            </h4>
            <UserPassword />
          </div>
        </div>
      </div>
    </>
  );
}
