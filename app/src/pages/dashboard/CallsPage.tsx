import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts'
import { Phone, Clock, TrendingUp, AlertTriangle, Play, Headphones } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const sentimentConfig: Record<string, { emoji: string; color: string; label: string }> = {
  cooperative: { emoji: '\ud83d\ude0a', color: '#22c55e', label: 'Cooperative' },
  neutral: { emoji: '\ud83d\u1010', color: '#f59e0b', label: 'Neutral' },
  distressed: { emoji: '\ud83d\ude29', color: '#ef4444', label: 'Distressed' },
  angry: { emoji: '\ud83d\ude20', color: '#3b82f6', label: 'Angry' },
}

const outcomeLabels: Record<string, string> = {
  ptp: 'Promise to Pay',
  paid: 'Payment Received',
  escalated: 'Escalated',
  no_response: 'No Response',
  callback_requested: 'Callback Requested',
  disconnected: 'Disconnected',
}

export default function CallsPage() {
  const { data: stats, isLoading: statsLoading } = trpc.calls.getStats.useQuery({ period: 'today' })
  const { data: trend } = trpc.calls.getTrend.useQuery({ days: 30 })
  const { data: calls } = trpc.calls.list.useQuery({ page: 1, pageSize: 15 })

  const statCards = [
    { label: 'Total Calls Today', value: stats?.totalCalls ?? 0, suffix: '', icon: Phone },
    { label: 'Avg Duration', value: stats?.avgDuration ? Math.floor(stats.avgDuration / 60) : 0, suffix: 'm', sub: stats?.avgDuration ? `${stats.avgDuration % 60}s` : '', icon: Clock },
    { label: 'PTP Rate', value: stats?.ptpRate ?? 0, suffix: '%', icon: TrendingUp },
    { label: 'Escalation Rate', value: stats?.escalationRate ?? 0, suffix: '%', icon: AlertTriangle },
  ]

  return (
    <div className="space-y-6">
      {/* Windmap placeholder - decorative panel */}
      <div className="relative h-[30vh] glass-card rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#314934]/10 via-transparent to-[#fbf6c5]/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Headphones className="w-12 h-12 text-[#61be72]/30 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-mono-data">Call Flow Velocity Visualization</p>
            <p className="text-xs text-gray-600 mt-1">Real-time particle flow of AI call routing</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
        <span className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono-data">Call Flow Velocity</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-lg p-5"
          >
            <card.icon className="w-5 h-5 text-[#61be72] mb-3" />
            {statsLoading ? (
              <Skeleton className="h-8 w-20 bg-white/5" />
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-white">{card.value}</span>
                <span className="text-sm text-gray-400">{card.suffix}</span>
                {card.sub && <span className="text-sm text-gray-400">{card.sub}</span>}
              </div>
            )}
            <span className="text-xs text-gray-500 font-mono-data uppercase tracking-wider">{card.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calls by Hour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Calls by Hour</h3>
          <p className="text-xs text-gray-500 mb-4">8AM \u2013 7PM (RBI compliant window)</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats?.byHour || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" stroke="#666" fontSize={11} tickFormatter={(v) => `${v}:00`} />
              <YAxis stroke="#666" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value: number) => [value, 'Calls']}
                labelFormatter={(v) => `${v}:00`}
              />
              <Bar dataKey="count" fill="#fbf6c5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* PTP Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Daily PTP Rate</h3>
          <p className="text-xs text-gray-500 mb-4">30-day trend</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#666" fontSize={11} tickFormatter={(v) => {
                const d = new Date(v)
                return `${d.getDate()}/${d.getMonth() + 1}`
              }} />
              <YAxis domain={[40, 80]} stroke="#666" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'PTP Rate']}
              />
              <Line type="monotone" dataKey="ptpRate" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Calls Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-lg overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h3 className="text-white font-semibold">Recent Calls</h3>
          <p className="text-xs text-gray-500">Latest AI and human agent interactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Call ID</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Borrower</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Sentiment</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Outcome</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Recording</th>
              </tr>
            </thead>
            <tbody>
              {calls?.items.map((call) => {
                const sent = sentimentConfig[call.sentiment ?? 'neutral'] ?? sentimentConfig.neutral
                return (
                  <tr key={call.id} className="border-t border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                    <td className="px-6 py-3 text-sm font-mono-data text-gray-400">{call.callId}</td>
                    <td className="px-6 py-3 text-sm text-white">{call.borrowerName}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">
                      {Math.floor((call.durationSeconds ?? 0) / 60)}m {(call.durationSeconds ?? 0) % 60}s
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span>{sent.emoji}</span>
                        <span className="text-sm" style={{ color: sent.color }}>{sent.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-300">
                      {outcomeLabels[call.outcome ?? 'no_response']}
                    </td>
                    <td className="px-6 py-3">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <Play className="w-3 h-3 text-[#61be72]" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
