import { HomeIcon, LineChart, Triangle, User, Users } from "lucide-react";
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

export default function Menu() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
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
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex flex-row justify-between h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Company name</h1>
          <div className="mr-5">
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger>
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
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="flex items-center justify-center bg-white border rounded-xl"
                >
                  <p className="">Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
      </div>
    </div>
  );
}
