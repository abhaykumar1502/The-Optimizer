import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import {
  Brain, TrendingUp, DollarSign, AlertTriangle,
  Database, BarChart3, Phone, MessageSquare, Shield, Cpu,
  ArrowRight, CheckCircle, ChevronRight,
  Mic, LineChart, Fingerprint, Clock, Lock, Eye, VolumeX
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const roiData = [
  { metric: 'Recovery Rate', value: 35, label: '+35%' },
  { metric: 'Collection Rate', value: 30, label: '+30%' },
  { metric: 'PTP Rate', value: 107, label: '+107%' },
  { metric: 'Cost Reduction', value: 78, label: '+78%' },
  { metric: 'Missed Reminders', value: -35, label: '-35%' },
]

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{count}{suffix}</span>
}

function Nav() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#61be72]" />
          <span className="text-lg font-semibold tracking-tight">TheOptimizer</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#case-studies" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</a>
          <a href="#roi" className="text-sm text-gray-400 hover:text-white transition-colors">Research</a>
          <a href="#compliance" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-[#314934] text-white text-sm rounded-md hover:bg-[#3d5f42] transition-colors">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-white/10 rounded-md">
                Login
              </button>
              <button onClick={() => navigate('/login')} className="px-4 py-2 bg-[#314934] text-white text-sm rounded-md hover:bg-[#3d5f42] transition-colors">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(49,73,52,0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#314934]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#fbf6c5]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#61be72]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Brain className="w-4 h-4 text-[#61be72]" />
            <span className="text-xs font-mono-data text-gray-400 uppercase tracking-wider">AI-Powered Loan Recovery</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight mb-6">
            Revolutionizing<br />
            <span className="text-gradient">Loan Recovery</span> with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            From 18% to 96.5% collection success rates. Powered by NLP, Sentiment Analysis & Predictive Analytics.
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-[#314934] text-white rounded-md hover:bg-[#3d5f42] transition-all flex items-center gap-2">
              View Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#features" className="px-8 py-3 border border-white/20 text-white rounded-md hover:bg-white/5 transition-all">
              Read Research
            </a>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: 96.5, suffix: '%', label: 'Collection Rate' },
            { value: 35, suffix: '%', label: 'Cost Reduction' },
            { value: 80, suffix: '%', label: 'AI Queries Handled' },
            { value: 10, suffix: '+', label: 'Languages' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-[#fbf6c5]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 mt-1 font-mono-data uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Loan Recovery Crisis</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Traditional approaches are failing borrowers and lenders alike</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: '< 20% Success Rate', desc: 'Traditional human agents achieve dismally low collection rates across the industry', color: '#ef4444' },
            { icon: DollarSign, title: '$4.92B Market', desc: 'Global debt collection software market projected by 2028, growing at 8.7% CAGR', color: '#f59e0b' },
            { icon: AlertTriangle, title: '39% Borrowers', desc: 'Have experienced abusive or harassing recovery calls, damaging brand reputation', color: '#ef4444' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card-hover rounded-lg p-8"
            >
              <card.icon className="w-10 h-10 mb-4" style={{ color: card.color }} />
              <h3 className="text-2xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: Database, title: 'Data Ingestion', desc: 'Borrower profiles, payment histories, and behavioral data consolidated into unified records' },
    { icon: BarChart3, title: 'Predictive Scoring', desc: 'XGBoost ML models assign Repayment Propensity Scores from 0-100 for each account' },
    { icon: Phone, title: 'AI Voice Call', desc: 'NLP-powered voicebots initiate personalized, multilingual conversations 24/7' },
    { icon: MessageSquare, title: 'Sentiment Analysis', desc: 'BERT models analyze emotional tone in real-time, detecting distress or hostility' },
    { icon: Shield, title: 'Payment / Escalation', desc: 'Successful PTP recording or seamless handoff to human agents for complex cases' },
  ]

  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">AI-Powered Recovery Pipeline</h2>
          <p className="text-gray-400">A 5-step intelligent workflow that transforms recovery outcomes</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 flex items-center gap-4"
            >
              <div className="flex-1 glass-card-hover rounded-lg p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#314934] rounded-full flex items-center justify-center text-xs font-bold text-[#fbf6c5]">
                  {i + 1}
                </div>
                <step.icon className="w-8 h-8 text-[#61be72] mb-3 mt-2" />
                <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block w-5 h-5 text-gray-600 flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechSection() {
  const techs = [
    { icon: MessageSquare, name: 'NLP', desc: 'Natural language understanding for contextual conversations' },
    { icon: Mic, name: 'ASR / TTS', desc: 'Automatic speech recognition and text-to-speech synthesis' },
    { icon: Cpu, name: 'XGBoost ML', desc: 'Gradient boosted trees for repayment prediction scoring' },
    { icon: Fingerprint, name: 'Sentiment (BERT)', desc: 'Deep learning emotion detection during live calls' },
    { icon: Shield, name: 'Compliance Engine', desc: 'Automated RBI regulation enforcement and monitoring' },
    { icon: LineChart, name: 'Predictive Analytics', desc: 'Real-time forecasting of recovery outcomes and risks' },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Key Technologies</h2>
          <p className="text-gray-400">Enterprise-grade AI stack powering the recovery engine</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover rounded-lg p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-[#314934]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <tech.icon className="w-6 h-6 text-[#61be72]" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Real-World Deployments</h2>
          <p className="text-gray-400">Proven results from production AI recovery systems</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              flag: '\ud83c\uddee\ud83c\uddf3', company: 'Rezo.ai', location: 'India',
              stats: [
                { label: 'Collection Efficiency', before: '85%', after: '97%' },
                { label: 'CSAT Score', before: '62%', after: '89%' },
                { label: 'Human Escalation', before: '100%', after: '22%' },
              ],
              tags: ['10+ languages', '500+ dialects', '2-week deployment']
            },
            {
              flag: '\ud83c\uddf2\ud83c\uddfd', company: 'Apifonica', location: 'Mexico',
              stats: [
                { label: 'PTP Rate', before: '0.14%', after: '0.29%', multiplier: '2.07\u00d7' },
                { label: 'Campaign Cost', before: '$39,500', after: '$8,500', saved: '$31,000 saved' },
                { label: 'Campaign Time', before: '2 months', after: '1 day' },
              ],
              tags: ['$31,000 saved', '40-60% optimal automation', '$10K recovered']
            },
          ].map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card-hover rounded-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cs.flag}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{cs.company}</h3>
                  <p className="text-sm text-gray-400">{cs.location}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {cs.stats.map((s, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">{s.before}</span>
                      <ArrowRight className="w-3 h-3 text-[#61be72]" />
                      <span className="text-sm font-semibold text-[#61be72]">{s.after}</span>
                      {'multiplier' in s && <span className="text-xs text-[#fbf6c5] ml-1">({s.multiplier})</span>}
                      {'saved' in s && <span className="text-xs text-[#fbf6c5] ml-1">{s.saved}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-[#314934]/30 text-[#61be72] text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ROISection() {
  return (
    <section id="roi" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Proven Results Across Deployments</h2>
          <p className="text-gray-400">Average improvement metrics across all AI-powered recovery implementations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-lg p-8"
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={roiData} layout="vertical" margin={{ left: 40, right: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#666" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="metric" stroke="#999" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}%`, 'Improvement']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {roiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#fbf6c5' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  )
}

function ComplianceSection() {
  return (
    <section id="compliance" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Built for RBI Compliance</h2>
          <p className="text-gray-400">Every call meets regulatory standards automatically</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Clock, title: 'Contact Window', desc: '8AM\u20137PM enforced automatically for all outbound calls' },
            { icon: Eye, title: 'AI Disclosure', desc: 'Mandatory AI identity disclosure at the start of every call' },
            { icon: Lock, title: 'Auto Recording', desc: 'All calls recorded, transcribed, and archived for 7 years' },
            { icon: VolumeX, title: 'Profanity Filter', desc: 'Real-time NLP filter prevents abusive language usage' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                <item.icon className="w-5 h-5 text-[#61be72]" />
              </div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#61be72]" />
            <span className="text-sm font-semibold">TheOptimizer</span>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Built on AI Research by Abhay Kumar Singh, Vipin Sharma, MD Ahsan Iqbal, Shivansh Setia &mdash; Chitkara University
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/login')} className="text-xs text-gray-400 hover:text-white transition-colors">Login</button>
            <button onClick={() => navigate('/dashboard')} className="text-xs text-gray-400 hover:text-white transition-colors">Dashboard</button>
            <a href="#features" className="text-xs text-gray-400 hover:text-white transition-colors">Research</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <TechSection />
      <CaseStudiesSection />
      <ROISection />
      <ComplianceSection />
      <Footer />
    </div>
  )
}
