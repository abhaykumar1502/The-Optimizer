import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Users, TrendingUp, Phone, DollarSign } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'



export default function OverviewPage() {
  const { data: kpi, isLoading: kpiLoading } = trpc.kpi.getLatest.useQuery()
  const { data: trend } = trpc.kpi.getTrend.useQuery({ months: 6 })
  const { data: borrowerStats } = trpc.borrowers.getStats.useQuery()

  const segmentData = borrowerStats ? [
    { name: 'Sub-Standard', value: borrowerStats.bySegment.sub_standard, color: '#f59e0b' },
    { name: 'Doubtful', value: borrowerStats.bySegment.doubtful, color: '#ef4444' },
    { name: 'Loss', value: borrowerStats.bySegment.loss, color: '#666666' },
  ] : []

  const kpiCards = [
    { label: 'Total Accounts', value: kpi?.accountsManaged ?? 0, suffix: '', icon: Users, trend: '+3%', trendUp: true },
    { label: 'Collection Efficiency', value: kpi?.collectionEfficiency ?? 0, suffix: '%', icon: TrendingUp, trend: '+0.3%', trendUp: true },
    { label: 'Active AI Calls', value: kpi?.totalCalls ?? 0, suffix: '', icon: Phone, trend: '+12 this hour', trendUp: true, live: true },
    { label: 'Cost Saved This Month', value: kpi?.costSaved ? Math.round(kpi.costSaved / 1000) : 0, suffix: 'K', prefix: '$', icon: DollarSign, trend: '+15%', trendUp: true },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className="w-5 h-5 text-[#61be72]" />
              {card.live && <span className="w-2 h-2 bg-[#fbf6c5] rounded-full live-pulse" />}
            </div>
            {kpiLoading ? (
              <Skeleton className="h-10 w-24 bg-white/5" />
            ) : (
              <div className="text-3xl font-semibold text-white">
                {card.prefix}{typeof card.value === 'number' ? card.value.toLocaleString() : card.value}{card.suffix}
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 font-mono-data uppercase tracking-wider">{card.label}</span>
              <span className="text-xs text-[#22c55e]">{card.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Collection Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Collection Efficiency Trend</h3>
          <p className="text-xs text-gray-500 mb-4">6-month trajectory</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} tickFormatter={(v) => {
                const d = new Date(v)
                return d.toLocaleDateString('en-IN', { month: 'short' })
              }} />
              <YAxis domain={[80, 100]} stroke="#666" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'Efficiency']}
              />
              <Line type="monotone" dataKey="collectionEfficiency" stroke="#fbf6c5" strokeWidth={2} dot={{ fill: '#fbf6c5', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Borrower Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Borrower Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">By NPA segment</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={segmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {segmentData.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm text-gray-300">{s.name}</span>
                </div>
                <span className="text-sm text-white font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NPA Classification Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-lg overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h3 className="text-white font-semibold">NPA Classification</h3>
          <p className="text-xs text-gray-500">Recovery approach by asset classification</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Classification</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Days Past Due</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Total Accounts</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Recovery Approach</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cls: 'Sub-Standard', dpd: '90\u2013365 days', accounts: borrowerStats?.bySegment.sub_standard || 0, approach: 'Automated AI Calling', status: 'On Track', statusColor: '#22c55e' },
                { cls: 'Doubtful', dpd: '12+ months', accounts: borrowerStats?.bySegment.doubtful || 0, approach: 'AI + Human Escalation', status: 'Monitoring', statusColor: '#f59e0b' },
                { cls: 'Loss Assets', dpd: 'Written off', accounts: borrowerStats?.bySegment.loss || 0, approach: 'Specialist + Legal', status: 'Escalated', statusColor: '#ef4444' },
              ].map((row, i) => (
                <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{row.cls}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{row.dpd}</td>
                  <td className="px-6 py-4 text-sm text-white">{row.accounts}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{row.approach}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{ background: `${row.statusColor}20`, color: row.statusColor }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
