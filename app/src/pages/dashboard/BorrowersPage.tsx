import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, Phone, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const statusColors: Record<string, string> = {
  active_ptp: '#22c55e',
  follow_up: '#f59e0b',
  escalated: '#ef4444',
  paid: '#3b82f6',
  no_contact: '#666666',
}

const statusLabels: Record<string, string> = {
  active_ptp: 'Active PTP',
  follow_up: 'Follow-up',
  escalated: 'Escalated',
  paid: 'Paid',
  no_contact: 'No Contact',
}

export default function BorrowersPage() {
  const [segment, setSegment] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [selectedBorrower, setSelectedBorrower] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const { data, isLoading } = trpc.borrowers.list.useQuery({
    segment: segment || undefined,
    status: status || undefined,
    search: search || undefined,
    page,
    pageSize: 10,
  })

  const { data: detail } = trpc.borrowers.getById.useQuery(
    { id: selectedBorrower! },
    { enabled: selectedBorrower !== null }
  )

  const getRpsColor = (score: number) => {
    if (score <= 40) return '#22c55e'
    if (score <= 70) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="glass-card rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs font-mono-data uppercase tracking-wider">Filters</span>
          </div>

          <select
            value={segment}
            onChange={(e) => { setSegment(e.target.value); setPage(1) }}
            className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#fbf6c5]"
          >
            <option value="">All Segments</option>
            <option value="sub_standard">Sub-Standard</option>
            <option value="doubtful">Doubtful</option>
            <option value="loss">Loss</option>
          </select>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#fbf6c5]"
          >
            <option value="">All Statuses</option>
            <option value="active_ptp">Active PTP</option>
            <option value="follow_up">Follow-up</option>
            <option value="escalated">Escalated</option>
            <option value="paid">Paid</option>
            <option value="no_contact">No Contact</option>
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fbf6c5]"
            />
          </div>

          {(segment || status || search) && (
            <button
              onClick={() => { setSegment(''); setStatus(''); setSearch(''); setPage(1) }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Borrower ID</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Loan Amount</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">DPD</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">RPS Score</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-mono-data text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-white/[0.03]">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-6 py-4"><Skeleton className="h-4 w-20 bg-white/5" /></td>
                    ))}
                  </tr>
                ))
              ) : data?.items.map((borrower) => (
                <tr
                  key={borrower.id}
                  onClick={() => setSelectedBorrower(borrower.id)}
                  className="border-t border-white/[0.03] hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono-data text-gray-400">{borrower.borrowerId}</td>
                  <td className="px-6 py-4 text-sm text-white">{borrower.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">₹{parseFloat(borrower.loanAmount).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{borrower.dpd}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${borrower.rpsScore}%`, background: getRpsColor(borrower.rpsScore ?? 50) }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{borrower.rpsScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${statusColors[borrower.status ?? 'no_contact']}20`, color: statusColors[borrower.status ?? 'no_contact'] }}
                    >
                      {statusLabels[borrower.status ?? 'no_contact']}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.total > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <span className="text-xs text-gray-500">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, data.total)} of {data.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-xs bg-white/5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!data || page * 10 >= data.total}
                className="px-3 py-1 text-xs bg-white/5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedBorrower && detail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedBorrower(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-black/95 backdrop-blur-2xl border-l border-white/10 z-50 overflow-y-auto scrollbar-thin"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{detail.name}</h3>
                    <p className="text-sm text-gray-400 font-mono-data">{detail.borrowerId}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBorrower(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Loan Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Loan Amount', value: `\u20b9${parseFloat(detail.loanAmount).toLocaleString('en-IN')}` },
                    { label: 'Loan Type', value: detail.loanType?.charAt(0).toUpperCase() + (detail.loanType?.slice(1) ?? '') },
                    { label: 'Interest Rate', value: `${detail.interestRate}%` },
                    { label: 'EMI Amount', value: `\u20b9${parseFloat(detail.emiAmount ?? '0').toLocaleString('en-IN')}` },
                    { label: 'Tenure', value: `${detail.loanTenure} months` },
                    { label: 'DPD', value: `${detail.dpd} days` },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-mono-data uppercase mb-1">{item.label}</p>
                      <p className="text-sm text-white font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Risk Score */}
                <div className="bg-white/[0.03] rounded-lg p-4 mb-6">
                  <p className="text-xs text-gray-500 font-mono-data uppercase mb-2">Repayment Propensity Score</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15" fill="none"
                          stroke={getRpsColor(detail.rpsScore ?? 50)}
                          strokeWidth="3"
                          strokeDasharray={`${(detail.rpsScore ?? 0) * 0.942} 94.2`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold text-white">{detail.rpsScore}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">{detail.defaultReason}</p>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs mt-1"
                        style={{ background: `${statusColors[detail.status ?? 'no_contact']}20`, color: statusColors[detail.status ?? 'no_contact'] }}
                      >
                        {statusLabels[detail.status ?? 'no_contact']}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white/[0.03] rounded-lg p-4 mb-6">
                  <p className="text-xs text-gray-500 font-mono-data uppercase mb-2">Contact Information</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300"><span className="text-gray-500">Phone:</span> {detail.phone}</p>
                    <p className="text-sm text-gray-300"><span className="text-gray-500">Email:</span> {detail.email}</p>
                    <p className="text-sm text-gray-300"><span className="text-gray-500">Location:</span> {detail.city}, {detail.state}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#314934] text-white rounded-lg hover:bg-[#3d5f42] transition-colors">
                    <Phone className="w-4 h-4" /> Initiate AI Call
                  </button>
                  <button className="flex-1 px-4 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors">
                    Mark as PTP
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
