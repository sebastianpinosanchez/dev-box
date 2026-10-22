import { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import {
  Box,
  Search,
  Sun,
  Moon,
  Monitor,
  ShieldCheck,
  Command as CommandIcon,
  ChevronRight,
  Code2,
  Braces,
  LockKeyhole,
  Type,
  Clock3,
  Globe,
  BookOpen,
  Shapes,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider, useTheme } from '@/components/shared/ThemeProvider';
import { tools } from '@/tools/registry';
import { categories } from '@/lib/tool';
import { readSetting, writeSetting } from '@/lib/settings';
const icons = {
  Encoding: Code2,
  'Formatting & Data': Braces,
  'Crypto & Security': LockKeyhole,
  Text: Type,
  'Time & Scheduling': Clock3,
  'Web & Network': Globe,
  Reference: BookOpen,
  Misc: Shapes,
};
function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { setTheme, resolved } = useTheme();
  const active = tools.find((tool) => location.pathname === `/${tool.meta.id}`);
  useEffect(() => {
    if (active) {
      writeSetting('last-tool', active.meta.id);
      document.title = `${active.meta.name} · DevBox`;
    }
  }, [active]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  const saved = readSetting<string>('last-tool', 'base64');
  const initial = tools.some((t) => t.meta.id === saved) ? saved : 'base64';
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="gap-5 px-5 pt-6 pb-3">
          <Link to="/base64" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-sm">
              <Box className="size-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              DevBox<span className="text-primary ml-1">.</span>
            </span>
          </Link>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-3 left-3 size-3.5" />
            <Input
              aria-label="Filter tools"
              placeholder="Find a tool…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background h-9 pl-9 text-xs"
            />
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          {categories.map((category) => {
            const matches = tools.filter(
              (t) =>
                t.meta.category === category &&
                `${t.meta.name} ${t.meta.keywords.join(' ')} ${t.meta.description}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
            );
            const Icon = icons[category];
            return matches.length ? (
              <SidebarGroup key={category}>
                <details open>
                  <summary className="cursor-pointer list-none">
                    <SidebarGroupLabel className="flex gap-2 text-[10px] font-semibold tracking-widest uppercase">
                      <Icon className="size-3" />
                      {category}
                      <ChevronRight className="ml-auto size-3" />
                    </SidebarGroupLabel>
                  </summary>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {matches.map((tool) => (
                        <SidebarMenuItem key={tool.meta.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={active?.meta.id === tool.meta.id}
                            className="h-8 text-xs"
                          >
                            <Link to={`/${tool.meta.id}`}>
                              <span
                                className={`size-1 rounded-full ${active?.meta.id === tool.meta.id ? 'bg-primary' : 'bg-muted-foreground/40'}`}
                              />
                              <span>{tool.meta.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </details>
              </SidebarGroup>
            ) : null;
          })}
        </SidebarContent>
        <SidebarFooter className="border-t p-5">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Offline & private
            <Badge variant="outline" className="ml-auto text-[9px]">
              v1.0
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-[11px]">
            {tools.length} tools. One local workspace.
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b px-5 md:px-10">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-muted-foreground text-xs">
            Developer toolkit
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Runs on your device
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-3"
              onClick={() => setOpen(true)}
            >
              <Search className="size-3.5" />
              <span className="hidden md:inline">Search tools</span>
              <kbd className="bg-muted text-muted-foreground hidden rounded px-1 text-[10px] md:inline">
                ⌘ K
              </kbd>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change theme">
                  {resolved === 'dark' ? (
                    <Moon className="size-4" />
                  ) : (
                    <Sun className="size-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setTheme('light')}>
                  <Sun />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('dark')}>
                  <Moon />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('system')}>
                  <Monitor />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="min-w-0 flex-1">
          <Suspense
            fallback={
              <p className="text-muted-foreground p-10" role="status">
                Opening tool…
              </p>
            }
          >
            <Routes>
              <Route
                path="/"
                element={<Navigate to={`/${initial}`} replace />}
              />
              {tools.map(({ meta, Component }) => (
                <Route
                  key={meta.id}
                  path={`/${meta.id}`}
                  element={<Component key={meta.id} />}
                />
              ))}
              <Route
                path="*"
                element={
                  <div className="p-10">
                    <h1 className="mb-3 text-2xl">Tool not found</h1>
                    <Button asChild>
                      <Link to="/base64">Open Base64</Link>
                    </Button>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
        <footer className="text-muted-foreground flex items-center justify-between border-t px-5 py-4 text-[10px] md:px-10">
          <span>BUILT FOR YOUR EVERYDAY DEVELOPMENT</span>
          <span className="flex items-center gap-1">
            <CommandIcon className="size-3" />K to jump anywhere
          </span>
        </footer>
      </SidebarInset>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Find a tool"
        description="Search all local developer utilities."
      >
        <CommandInput placeholder="What are you working on?" />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {categories.map((category) => (
            <CommandGroup key={category} heading={category}>
              {tools
                .filter((t) => t.meta.category === category)
                .map((tool) => (
                  <CommandItem
                    key={tool.meta.id}
                    value={`${tool.meta.name} ${tool.meta.keywords.join(' ')} ${tool.meta.description}`}
                    onSelect={() => {
                      navigate(`/${tool.meta.id}`);
                      setOpen(false);
                    }}
                  >
                    <tool.meta.icon className="size-4" />
                    {tool.meta.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
      <Toaster theme={resolved} />
    </SidebarProvider>
  );
}
export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}
