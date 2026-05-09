import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Clock, Eye, Lock, VolumeX, Database, AlertTriangle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const ruleIcons: Record<string, React.ElementType> = {
  'Contact Window (8AM\u20137PM)': Clock,
  'AI Disclosure at Call Start': Eye,
  'Call Recording': Lock,
  'Profanity Filter': VolumeX,
  'Max Contact Frequency': Database,
  'Borrower Data Encryption': Shield,
}

export default function CompliancePage() {
  const { data: status, isLoading } = trpc.compliance.getStatus.useQuery()

  const rules = status?.rules ?? [
    { name: 'Contact Window (8AM\u20137PM)', status: 'Active', score: 100 },
    { name: 'AI Disclosure at Call Start', status: 'Active', score: 100 },
    { name: 'Call Recording', status: 'All calls archived', score: 100 },
    { name: 'Profanity Filter', status: '0 violations today', score: 100 },
    { name: 'Max Contact Frequency', status: 'Within limits', score: 100 },
    { name: 'Borrower Data Encryption', status: 'PCI DSS compliant', score: 100 },
  ]

  const score = status?.overallScore ?? 98.4

  return (
    <div className="space-y-6">
      {/* Wave decoration */}
      <div className="relative h-[120px] glass-card rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1512 109" preserveAspectRatio="none">
          <path
            d="M-100 56.5C-100 56.5 144 0 457 0C770 0 880 109 1202 109C1524 109 1612 0.5 1612 0.5"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="12 12"
          />
          <path
            d="M-100 56.5C-100 56.5 144 0 457 0C770 0 880 109 1202 109C1524 109 1612 0.5 1612 0.5"
            stroke="#fbf6c5"
            strokeWidth="2"
            fill="none"
            strokeDasharray="800"
            strokeDashoffset="0"
            opacity="0.5"
          />
        </svg>
        <span className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono-data">Compliance Pulse</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compliance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-lg p-8 flex flex-col items-center justify-center"
        >
          {isLoading ? (
            <Skeleton className="w-40 h-40 rounded-full bg-white/5" />
          ) : (
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="#fbf6c5"
                  strokeWidth="2.5"
                  strokeDasharray={`${score * 0.942} 94.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-semibold text-white">{score}%</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[#22c55e] font-medium">All Systems Compliant</span>
          </div>
          <p className="text-xs text-gray-500">All regulatory requirements met</p>
        </motion.div>

        {/* Rules Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 glass-card rounded-lg p-6"
        >
          <h3 className="text-white font-semibold mb-4">Compliance Rules Status</h3>
          <div className="space-y-0">
            {rules.map((rule, i) => {
              const Icon = ruleIcons[rule.name] || Shield
              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#314934]/30 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#61be72]" />
                    </div>
                    <span className="text-sm text-white">{rule.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-sm text-[#22c55e]">{rule.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Violations Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-lg p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Violations Log</h3>
          <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs rounded-full">30 days</span>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-[#22c55e]" />
          </div>
          <h4 className="text-lg text-white mb-1">No violations in last 30 days</h4>
          <p className="text-sm text-gray-500">All compliance rules are being followed perfectly</p>
        </div>
      </motion.div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: `${score}%`, icon: Shield },
          { label: 'Violations Today', value: '0', icon: AlertTriangle },
          { label: 'Pending Actions', value: '0', icon: Clock },
          { label: 'Last Audit', value: 'Today, 09:00', icon: Eye },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-card rounded-lg p-4 flex items-center gap-3"
          >
            <m.icon className="w-5 h-5 text-[#61be72]" />
            <div>
              <p className="text-lg font-semibold text-white">{m.value}</p>
              <p className="text-xs text-gray-500 font-mono-data uppercase">{m.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
