import {
  ArrowRight,
  HomeIcon,
  LineChart,
  Triangle,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
export default function Menu({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-row border-r">
        <nav className="flex flex-col gap-4 z-20">
          <div className="flex border-b p-2 pl-5">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>

            <h1
              className={`${
                !open && "hidden"
              } text-xl font-semibold origin-left duration-200 flex items-center pl-3`}
            >
              Company
            </h1>
          </div>

          <div
            className={`${
              open ? "w-72" : "w-20"
            } h-screen p-3 pt-2 relative duration-300`}
          >
            <ArrowRight
              src="/assets/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          border-2 rounded-full ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <ul className="">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center 
          `}
              >
                <div className="flex items-center justify-center px-2 py-2 rounded-xl bg-slate-200">
                  <TooltipProvider delayDuration={10}>
                    <Tooltip>
                      <TooltipTrigger>
                        <HomeIcon strokeWidth={1.3} />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex items-center justify-center bg-white border rounded-xl m-5"
                      >
                        <p className="">Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span
                  className={`${
                    !open && "hidden"
                  } pl-2 origin-left duration-200`}
                >
                  Dashboard
                </span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center 
          `}
              >
                <div className="flex items-center justify-center px-2 py-2 rounded-xl hover:bg-slate-200">
                  <TooltipProvider delayDuration={10}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Users strokeWidth={1.3} />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex items-center justify-center bg-white border rounded-xl m-5"
                      >
                        <p className="">Users</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span
                  className={`${
                    !open && "hidden"
                  } pl-2 origin-left duration-200`}
                >
                  Users
                </span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center 
          `}
              >
                <div className="flex items-center justify-center px-2 py-2 rounded-xl hover:bg-slate-200">
                  <TooltipProvider delayDuration={10}>
                    <Tooltip>
                      <TooltipTrigger>
                        <LineChart strokeWidth={1.3} />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex items-center justify-center bg-white border rounded-xl m-5"
                      >
                        <p className="">Analytics</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span
                  className={`${
                    !open && "hidden"
                  } pl-2 origin-left duration-200`}
                >
                  Analytics
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="min-h-[calc(110vh_-_56px)]">
        <header className="sticky top-0 z-10 w-full flex flex-row justify-end h-[57px] items-center gap-1 border-b bg-background px-4 bg-white">
          <div className="mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-slate-200 rounded-full p-1.5 border-none outline-none">
                <User strokeWidth={1.5} className="" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border mr-8 mt-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div
          className={`${
            open ? "pl-64" : "pl-14"
          } h-screen p-3 pt-8 relative duration-300`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
