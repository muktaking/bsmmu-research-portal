import { getUserProfile } from '@/api/profile';
import UserProfile from '@/app/components/userProfile';
import {
  LayoutDashboard,
  User,
  Settings,
  BookOpen,
  FileText,
  Activity,
  Plus,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const user = await getUserProfile();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">PRABD</span>
        </div>

        <nav className="space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active
          />
          <NavItem icon={<FileText size={18} />} label="My Research" />
          <NavItem icon={<BookOpen size={18} />} label="Collections" />
          <NavItem icon={<User size={18} />} label="Profile" />
          <div className="my-4 border-t border-slate-100 dark:border-slate-800" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome, {user?.firstname || 'Researcher'}
              </h1>
              <p className="text-sm text-slate-500">
                Manage your research activities and profile.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
              >
                <Bell size={18} />
              </Button>
              <Button className="rounded-xl font-semibold shadow-lg shadow-blue-600/20">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Stats Widgets */}
            <StatCard
              title="Active Projects"
              value="12"
              subValue="+2 this month"
              icon={<Activity className="text-blue-600" />}
            />
            <StatCard
              title="Published Articles"
              value="45"
              subValue="3 pending"
              icon={<FileText className="text-emerald-600" />}
            />
            <StatCard
              title="Total Citations"
              value="842"
              subValue="+15% growth"
              icon={<BookOpen className="text-purple-600" />}
            />
            <StatCard
              title="Profile Views"
              value="1.2k"
              subValue="Last 30 days"
              icon={<User className="text-orange-600" />}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Area (Profile) */}
            <div className="lg:col-span-2">
              {user ? (
                <UserProfile user={user} />
              ) : (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-600 dark:border-red-900/30 dark:bg-red-900/10">
                  Unable to load user profile.
                </div>
              )}
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <ActivityItem label="Scale 'PHQ-9' validated" time="2h ago" />
                  <ActivityItem
                    label="New article draft created"
                    time="5h ago"
                  />
                  <ActivityItem label="Profile updated" time="Yesterday" />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <ActionButton label="Upload Data" />
                  <ActionButton label="Invite Peer" />
                  <ActionButton label="Export CV" />
                  <ActionButton label="Get Support" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${active ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200'}`}
    >
      {icon}
      {label}
    </div>
  );
}

function StatCard({
  title,
  value,
  subValue,
  icon,
}: {
  title: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </h3>
      <p className="mt-1 text-xs text-slate-400">{subValue}</p>
    </div>
  );
}

function ActivityItem({ label, time }: { label: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      className="h-9 w-full justify-start rounded-xl text-[11px] font-semibold"
    >
      {label}
    </Button>
  );
}
