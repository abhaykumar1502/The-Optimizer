import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'
import { TrendingUp, BarChart3, MessageCircle, Zap, Brain } from 'lucide-react'

const roiData = [
  { metric: 'Recovery Rate', value: 35 },
  { metric: 'Collection Rate', value: 30 },
  { metric: 'PTP Rate', value: 107 },
  { metric: 'Cost Reduction', value: 78 },
]

const sentimentData = [
  { name: 'Cooperative', value: 52, color: '#22c55e' },
  { name: 'Neutral', value: 28, color: '#f59e0b' },
  { name: 'Distressed', value: 12, color: '#ef4444' },
  { name: 'Angry', value: 8, color: '#3b82f6' },
]

const modelMetrics = [
  { label: 'AUC-ROC', value: 0.847, percent: 84.7 },
  { label: 'Precision', value: 0.81, percent: 81 },
  { label: 'Recall', value: 0.79, percent: 79 },
  { label: 'F1-Score', value: 0.80, percent: 80 },
]

const insights = [
  { icon: Brain, text: 'AI models predict repayment with 84.7% accuracy (AUC-ROC)' },
  { icon: TrendingUp, text: 'Sentiment analysis reduces escalation by 78%' },
  { icon: Zap, text: 'AI handles 80% of queries without human intervention' },
  { icon: BarChart3, text: 'Predictive scoring improves contact priority by 35%' },
  { icon: MessageCircle, text: 'Multilingual support covers 10+ languages' },
]

export default function InsightsPage() {
  const { data: adoption } = trpc.kpi.getAdoptionTrend.useQuery()
  const { data: kpi } = trpc.kpi.getLatest.useQuery()

  return (
    <div className="space-y-6">
      {/* Metrics bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Recovery Rate', value: '+35%', color: '#fbf6c5' },
          { label: 'Collection Efficiency', value: `${kpi?.collectionEfficiency ?? 96.8}%`, trend: '\u2191 0.3%', color: '#22c55e' },
          { label: 'Avg Call Duration', value: `${Math.floor((kpi?.avgCallDuration ?? 248) / 60)}m ${(kpi?.avgCallDuration ?? 248) % 60}s`, color: '#fff' },
          { label: 'Cost Per Recovery', value: '$12.40', trend: '\u2193 8%', color: '#22c55e' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-lg p-4"
          >
            <p className="text-xs text-gray-500 font-mono-data uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-xl font-semibold" style={{ color: m.color }}>{m.value}</p>
            {m.trend && <p className="text-xs text-[#22c55e] mt-0.5">{m.trend}</p>}
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Adoption Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">AI Adoption in Debt Collection</h3>
          <p className="text-xs text-gray-500 mb-4">Industry-wide adoption rate (%)</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={adoption || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="#666" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#666" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value: number) => [`${value}%`, 'Adoption']}
              />
              <Line type="monotone" dataKey="adoptionRate" stroke="#fbf6c5" strokeWidth={2} dot={{ fill: '#fbf6c5', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ROI Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Quantified Impact</h3>
          <p className="text-xs text-gray-500 mb-4">Average improvement metrics</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roiData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#666" fontSize={11} tickFormatter={(v) => `+${v}%`} />
              <YAxis type="category" dataKey="metric" stroke="#999" fontSize={11} width={100} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value: number) => [`+${value}%`, 'Improvement']}
              />
              <Bar dataKey="value" fill="#fbf6c5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sentiment Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Sentiment Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Across all AI interactions</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Legend formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Predictive Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-1">Predictive Model Performance</h3>
          <p className="text-xs text-gray-500 mb-4">XGBoost classification metrics</p>
          <div className="grid grid-cols-2 gap-4">
            {modelMetrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white/[0.03] rounded-lg">
                <div className="relative w-16 h-16 mb-2">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke="#fbf6c5"
                      strokeWidth="2.5"
                      strokeDasharray={`${m.percent * 0.942} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">{m.value}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-mono-data uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-lg p-6"
      >
        <h3 className="text-white font-semibold mb-4">Key AI Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#fbf6c5] mt-2 flex-shrink-0" />
              <insight.icon className="w-4 h-4 text-[#61be72] mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-300">{insight.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
