import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingDown, Clock, Globe, Lightbulb } from 'lucide-react'

const caseStudies = [
  {
    flag: '\ud83c\uddee\ud83c\uddf3',
    company: 'Rezo.ai',
    location: 'India',
    tag: 'Voicebot Recovery',
    beforeAfter: [
      { label: 'Collection Efficiency', before: '70%', after: '96.8%', improvement: true },
      { label: 'Agent Productivity', before: '60 calls/day', after: '300+ calls/day', improvement: true },
      { label: 'CSAT Score', before: '60%', after: '89%', improvement: true },
      { label: 'Human Escalation', before: '40%', after: '22%', improvement: true },
    ],
    highlights: [
      { icon: Clock, label: 'Deployment', value: '2 weeks' },
      { icon: Globe, label: 'Languages', value: '10+ (500+ dialects)' },
      { icon: TrendingDown, label: 'Query Resolution', value: '99.8%' },
    ],
    lesson: 'AI voicebots outperform human agents in scalability while maintaining compliance. The key was iterative NLP training on regional dialects and continuous sentiment model refinement.',
  },
  {
    flag: '\ud83c\uddf2\ud83c\uddfd',
    company: 'Apifonica',
    location: 'Mexico',
    tag: 'Automated Campaigns',
    beforeAfter: [
      { label: 'PTP Rate (Human)', before: '0.14%', after: '0.29%', multiplier: '2.07\u00d7 better' },
      { label: 'Campaign Cost', before: '$39,500 (human)', after: '$8,500 (AI)', saved: '$31,000 saved' },
      { label: 'Payments Recovered', before: '$0', after: '$10,000', note: 'from near-uncollectible' },
      { label: 'Campaign Duration', before: '2 months', after: '1 day', note: 'same 15K contacts' },
    ],
    highlights: [
      { icon: TrendingDown, label: 'Cost Savings', value: '$31,000' },
      { icon: Globe, label: 'Optimal Automation', value: '40\u201360%' },
      { icon: Clock, label: 'Time Reduction', value: '60x faster' },
    ],
    lesson: 'Optimal automation sits at 40\u201360% \u2014 full automation risks borrower alienation. Hybrid AI-human workflows maximize both cost efficiency and customer satisfaction.',
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-lg p-6 lg:p-8"
          >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cs.flag}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{cs.company}</h3>
                  <p className="text-sm text-gray-400">{cs.location}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#314934] text-[#fbf6c5] text-xs rounded-full font-medium">
                {cs.tag}
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before/After */}
              <div>
                <h4 className="text-sm font-mono-data text-gray-400 uppercase tracking-wider mb-4">Before / After</h4>
                <div className="space-y-3">
                  {cs.beforeAfter.map((row, j) => (
                    <div key={j} className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                      <span className="text-sm text-gray-300">{row.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 line-through">{row.before}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#61be72]" />
                        <span className="text-sm font-semibold text-[#61be72]">{row.after}</span>
                        {'multiplier' in row && <span className="text-xs text-[#fbf6c5]">({row.multiplier})</span>}
                        {'saved' in row && <span className="text-xs text-[#fbf6c5]">{row.saved}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-sm font-mono-data text-gray-400 uppercase tracking-wider mb-4">Key Metrics</h4>
                <div className="space-y-3">
                  {cs.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-lg">
                      <div className="w-10 h-10 bg-[#314934]/30 rounded-lg flex items-center justify-center">
                        <h.icon className="w-5 h-5 text-[#61be72]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono-data uppercase">{h.label}</p>
                        <p className="text-lg font-semibold text-white">{h.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Lesson */}
            <div className="mt-6 p-4 bg-[#314934]/20 border border-[#314934]/30 rounded-lg flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#fbf6c5] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 italic">{cs.lesson}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
