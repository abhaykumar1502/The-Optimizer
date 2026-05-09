import { Outlet, useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Users, Phone, Shield, Brain, BookOpen,
  Settings, LogOut, Menu, X, ChevronLeft, ChevronRight,
  Bell
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/borrowers', label: 'Borrower Segments', icon: Users },
  { path: '/dashboard/calls', label: 'Call Analytics', icon: Phone },
  { path: '/dashboard/compliance', label: 'Compliance Monitor', icon: Shield },
  { path: '/dashboard/insights', label: 'AI Insights', icon: Brain },
  { path: '/dashboard/case-studies', label: 'Case Studies', icon: BookOpen },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const pageTitle = navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#314934] flex flex-col transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <Brain className="w-7 h-7 text-[#fbf6c5] flex-shrink-0" />
          {!collapsed && <span className="ml-3 font-semibold text-white">TheOptimizer</span>}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#314934] border border-white/20 rounded-full items-center justify-center hover:bg-[#3d5f42] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-white/10 border-l-[3px] border-[#fbf6c5] text-[#fbf6c5]'
                    : 'border-l-[3px] border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* User section */}
        <div className={`border-t border-white/10 p-4 ${collapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-[#fbf6c5]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-[#fbf6c5]">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-white/50 truncate">{user?.email || ''}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className={`mt-3 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors ${collapsed ? 'justify-center w-full' : ''}`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
              <p className="text-xs text-gray-500 font-mono-data hidden sm:block">
                Dashboard / {pageTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 font-mono-data hidden md:block">
              {currentTime.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              {' '}
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#fbf6c5] rounded-full" />
            </button>
            <div className="w-8 h-8 bg-[#314934] rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
