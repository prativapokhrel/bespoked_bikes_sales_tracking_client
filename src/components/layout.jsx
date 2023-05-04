import { HomeIcon, UserIcon, CurrencyDollarIcon, RectangleStackIcon, UserGroupIcon } from "@heroicons/react/24/outline";


import clsx from "clsx";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Customers", href: "/customers", icon: UserIcon },
  { name: "Sales", href: "/sales", icon: CurrencyDollarIcon },
  { name: "Products", href: "/products", icon: RectangleStackIcon },
  { name: "Salespeople", href: "/salespeople", icon: UserGroupIcon },

];

export default function Layout({ children }) {
  return (
    <div className="flex w-full">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 h-screen w-[20%]">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={clsx(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          item.current
                            ? "text-white"
                            : "text-indigo-200 group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                      {item.count ? (
                        <span
                          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                          aria-hidden="true"
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <main className="w-[80%] overflow-x-hidden">
        <div key={children} className="p-5">{children}</div>
      </main>
    </div>
  );
}
