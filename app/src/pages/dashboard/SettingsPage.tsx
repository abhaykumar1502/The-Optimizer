import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { User, Bell, Moon, Sun, Lock, Trash2, Save } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [dailySummaries, setDailySummaries] = useState(true)
  const [violationAlerts, setViolationAlerts] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#314934]/30 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-[#61be72]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">User Profile</h3>
            <p className="text-xs text-gray-500">Manage your account information</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-500 font-mono-data uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fbf6c5] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-mono-data uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fbf6c5] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-mono-data uppercase tracking-wider mb-2">Role</label>
            <input
              type="text"
              value="Analyst"
              disabled
              className="w-full bg-white/[0.02] border border-white/5 rounded-md px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-mono-data uppercase tracking-wider mb-2">Organization</label>
            <input
              type="text"
              value="TheOptimizer"
              disabled
              className="w-full bg-white/[0.02] border border-white/5 rounded-md px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#314934]/30 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#61be72]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Notification Preferences</h3>
            <p className="text-xs text-gray-500">Control how you receive alerts</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Email Alerts', desc: 'Receive email notifications for critical events', value: emailAlerts, set: setEmailAlerts },
            { label: 'Daily Summaries', desc: 'Get a daily digest of recovery metrics', value: dailySummaries, set: setDailySummaries },
            { label: 'Violation Alerts', desc: 'Instant alerts for compliance violations', value: violationAlerts, set: setViolationAlerts },
          ].map((toggle, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
              <div>
                <p className="text-sm text-white">{toggle.label}</p>
                <p className="text-xs text-gray-500">{toggle.desc}</p>
              </div>
              <button
                onClick={() => toggle.set(!toggle.value)}
                className={`w-10 h-5 rounded-full transition-colors relative ${toggle.value ? 'bg-[#314934]' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${toggle.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#314934]/30 rounded-lg flex items-center justify-center">
            {darkMode ? <Moon className="w-5 h-5 text-[#61be72]" /> : <Sun className="w-5 h-5 text-[#61be72]" />}
          </div>
          <div>
            <h3 className="text-white font-semibold">Appearance</h3>
            <p className="text-xs text-gray-500">Choose your preferred theme</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setDarkMode(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${darkMode ? 'bg-[#314934]/30 border-[#314934] text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <Moon className="w-4 h-4" /> Dark
          </button>
          <button
            onClick={() => setDarkMode(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${!darkMode ? 'bg-[#314934]/30 border-[#314934] text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
          >
            <Sun className="w-4 h-4" /> Light
          </button>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#314934]/30 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#61be72]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Account Security</h3>
            <p className="text-xs text-gray-500">Manage password and account</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-white/[0.03] rounded-lg hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-white">Change Password</span>
            </div>
            <span className="text-xs text-gray-500">Coming soon</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-red-500/5 rounded-lg hover:bg-red-500/10 transition-colors border border-red-500/10">
            <div className="flex items-center gap-3">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Delete Account</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Save */}
      <div className="flex items-center justify-end gap-4">
        {saved && <span className="text-sm text-[#22c55e]">Settings saved successfully!</span>}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#314934] text-white rounded-md hover:bg-[#3d5f42] transition-colors"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  )
}
