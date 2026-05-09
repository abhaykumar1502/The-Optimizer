import { getDb } from "../api/queries/connection";
import { borrowers, calls, complianceLogs, kpiSnapshots } from "./schema";

const db = getDb();

const borrowerData = [
  { borrowerId: "BRW-0001", name: "Rajesh Kumar", loanAmount: "500000.00", loanType: "personal" as const, dpd: 45, rpsScore: 72, defaultReason: "Job loss", status: "follow_up" as const, segment: "sub_standard" as const, phone: "+91-98765-43201", email: "rajesh.k@email.com", city: "Mumbai", state: "Maharashtra", pincode: "400001", loanTenure: 36, interestRate: "12.50", emiAmount: "16750.00" },
  { borrowerId: "BRW-0002", name: "Priya Sharma", loanAmount: "1200000.00", loanType: "home" as const, dpd: 120, rpsScore: 35, defaultReason: "Medical emergency", status: "escalated" as const, segment: "doubtful" as const, phone: "+91-98765-43202", email: "priya.s@email.com", city: "Delhi", state: "Delhi", pincode: "110001", loanTenure: 240, interestRate: "9.25", emiAmount: "11000.00" },
  { borrowerId: "BRW-0003", name: "Amit Singh", loanAmount: "800000.00", loanType: "business" as const, dpd: 200, rpsScore: 18, defaultReason: "Business failure", status: "escalated" as const, segment: "loss" as const, phone: "+91-98765-43203", email: "amit.s@email.com", city: "Bangalore", state: "Karnataka", pincode: "560001", loanTenure: 60, interestRate: "14.00", emiAmount: "18666.00" },
  { borrowerId: "BRW-0004", name: "Sunita Patel", loanAmount: "300000.00", loanType: "personal" as const, dpd: 15, rpsScore: 88, defaultReason: "Delayed salary", status: "active_ptp" as const, segment: "sub_standard" as const, phone: "+91-98765-43204", email: "sunita.p@email.com", city: "Ahmedabad", state: "Gujarat", pincode: "380001", loanTenure: 24, interestRate: "11.75", emiAmount: "14125.00" },
  { borrowerId: "BRW-0005", name: "Vikram Reddy", loanAmount: "2500000.00", loanType: "home" as const, dpd: 300, rpsScore: 12, defaultReason: "Property dispute", status: "no_contact" as const, segment: "loss" as const, phone: "+91-98765-43205", email: "vikram.r@email.com", city: "Hyderabad", state: "Telangana", pincode: "500001", loanTenure: 180, interestRate: "8.75", emiAmount: "22350.00" },
  { borrowerId: "BRW-0006", name: "Neha Gupta", loanAmount: "450000.00", loanType: "education" as const, dpd: 60, rpsScore: 55, defaultReason: "Family emergency", status: "follow_up" as const, segment: "sub_standard" as const, phone: "+91-98765-43206", email: "neha.g@email.com", city: "Pune", state: "Maharashtra", pincode: "411001", loanTenure: 48, interestRate: "10.50", emiAmount: "11500.00" },
  { borrowerId: "BRW-0007", name: "Arun Nair", loanAmount: "1500000.00", loanType: "business" as const, dpd: 90, rpsScore: 42, defaultReason: "Market downturn", status: "follow_up" as const, segment: "doubtful" as const, phone: "+91-98765-43207", email: "arun.n@email.com", city: "Chennai", state: "Tamil Nadu", pincode: "600001", loanTenure: 84, interestRate: "13.00", emiAmount: "27800.00" },
  { borrowerId: "BRW-0008", name: "Deepa Joshi", loanAmount: "600000.00", loanType: "personal" as const, dpd: 8, rpsScore: 91, defaultReason: "Payment delay", status: "active_ptp" as const, segment: "sub_standard" as const, phone: "+91-98765-43208", email: "deepa.j@email.com", city: "Jaipur", state: "Rajasthan", pincode: "302001", loanTenure: 36, interestRate: "11.50", emiAmount: "19800.00" },
  { borrowerId: "BRW-0009", name: "Mohan Iyer", loanAmount: "2000000.00", loanType: "home" as const, dpd: 180, rpsScore: 25, defaultReason: "Health issues", status: "escalated" as const, segment: "doubtful" as const, phone: "+91-98765-43209", email: "mohan.i@email.com", city: "Kochi", state: "Kerala", pincode: "682001", loanTenure: 200, interestRate: "9.00", emiAmount: "18000.00" },
  { borrowerId: "BRW-0010", name: "Kavita Rao", loanAmount: "350000.00", loanType: "auto" as const, dpd: 30, rpsScore: 78, defaultReason: "Temporary hardship", status: "follow_up" as const, segment: "sub_standard" as const, phone: "+91-98765-43210", email: "kavita.r@email.com", city: "Mumbai", state: "Maharashtra", pincode: "400050", loanTenure: 48, interestRate: "10.25", emiAmount: "8900.00" },
  { borrowerId: "BRW-0011", name: "Sanjay Mehta", loanAmount: "900000.00", loanType: "business" as const, dpd: 250, rpsScore: 15, defaultReason: "COVID impact", status: "no_contact" as const, segment: "loss" as const, phone: "+91-98765-43211", email: "sanjay.m@email.com", city: "Surat", state: "Gujarat", pincode: "395001", loanTenure: 72, interestRate: "14.50", emiAmount: "19500.00" },
  { borrowerId: "BRW-0012", name: "Ananya Desai", loanAmount: "400000.00", loanType: "personal" as const, dpd: 5, rpsScore: 95, defaultReason: "New borrower", status: "active_ptp" as const, segment: "sub_standard" as const, phone: "+91-98765-43212", email: "ananya.d@email.com", city: "Bangalore", state: "Karnataka", pincode: "560076", loanTenure: 24, interestRate: "11.00", emiAmount: "18750.00" },
  { borrowerId: "BRW-0013", name: "Ravi Khanna", loanAmount: "1800000.00", loanType: "home" as const, dpd: 150, rpsScore: 30, defaultReason: "Divorce", status: "escalated" as const, segment: "doubtful" as const, phone: "+91-98765-43213", email: "ravi.k@email.com", city: "Chandigarh", state: "Punjab", pincode: "160001", loanTenure: 180, interestRate: "8.90", emiAmount: "16200.00" },
  { borrowerId: "BRW-0014", name: "Meena Kapoor", loanAmount: "250000.00", loanType: "education" as const, dpd: 75, rpsScore: 48, defaultReason: "Unemployed", status: "follow_up" as const, segment: "sub_standard" as const, phone: "+91-98765-43214", email: "meena.k@email.com", city: "Lucknow", state: "Uttar Pradesh", pincode: "226001", loanTenure: 36, interestRate: "10.75", emiAmount: "8200.00" },
  { borrowerId: "BRW-0015", name: "Karthik Pillai", loanAmount: "3000000.00", loanType: "business" as const, dpd: 365, rpsScore: 8, defaultReason: "Fraud suspected", status: "escalated" as const, segment: "loss" as const, phone: "+91-98765-43215", email: "karthik.p@email.com", city: "Coimbatore", state: "Tamil Nadu", pincode: "641001", loanTenure: 120, interestRate: "15.00", emiAmount: "43500.00" },
  { borrowerId: "BRW-0016", name: "Pooja Bhatia", loanAmount: "550000.00", loanType: "personal" as const, dpd: 20, rpsScore: 82, defaultReason: "Cash flow issue", status: "active_ptp" as const, segment: "sub_standard" as const, phone: "+91-98765-43216", email: "pooja.b@email.com", city: "Kolkata", state: "West Bengal", pincode: "700001", loanTenure: 30, interestRate: "12.00", emiAmount: "21200.00" },
  { borrowerId: "BRW-0017", name: "Harish Menon", loanAmount: "1000000.00", loanType: "home" as const, dpd: 250, rpsScore: 22, defaultReason: "Relocation", status: "no_contact" as const, segment: "loss" as const, phone: "+91-98765-43217", email: "harish.m@email.com", city: "Thiruvananthapuram", state: "Kerala", pincode: "695001", loanTenure: 200, interestRate: "9.10", emiAmount: "9100.00" },
  { borrowerId: "BRW-0018", name: "Divya Saxena", loanAmount: "650000.00", loanType: "auto" as const, dpd: 55, rpsScore: 62, defaultReason: "Maternity leave", status: "follow_up" as const, segment: "sub_standard" as const, phone: "+91-98765-43218", email: "divya.s@email.com", city: "Indore", state: "Madhya Pradesh", pincode: "452001", loanTenure: 60, interestRate: "10.50", emiAmount: "14000.00" },
  { borrowerId: "BRW-0019", name: "Nitin Verma", loanAmount: "1300000.00", loanType: "business" as const, dpd: 110, rpsScore: 38, defaultReason: "Partner dispute", status: "escalated" as const, segment: "doubtful" as const, phone: "+91-98765-43219", email: "nitin.v@email.com", city: "Nagpur", state: "Maharashtra", pincode: "440001", loanTenure: 96, interestRate: "13.50", emiAmount: "22200.00" },
  { borrowerId: "BRW-0020", name: "Shalini Ghosh", loanAmount: "380000.00", loanType: "personal" as const, dpd: 3, rpsScore: 97, defaultReason: "Excellent record", status: "active_ptp" as const, segment: "sub_standard" as const, phone: "+91-98765-43220", email: "shalini.g@email.com", city: "Bhubaneswar", state: "Odisha", pincode: "751001", loanTenure: 18, interestRate: "11.25", emiAmount: "22300.00" },
];

const callData = [
  { callId: "CALL-0001", borrowerId: 1, durationSeconds: 245, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Borrower agreed to pay EMI by 15th" },
  { callId: "CALL-0002", borrowerId: 2, durationSeconds: 420, sentiment: "distressed" as const, outcome: "escalated" as const, agentType: "human" as const, notes: "Borrower facing medical emergency, needs payment plan" },
  { callId: "CALL-0003", borrowerId: 3, durationSeconds: 180, sentiment: "angry" as const, outcome: "no_response" as const, agentType: "ai" as const, notes: "Call disconnected after 3 minutes" },
  { callId: "CALL-0004", borrowerId: 4, durationSeconds: 120, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Payment confirmed via UPI" },
  { callId: "CALL-0005", borrowerId: 5, durationSeconds: 60, sentiment: "neutral" as const, outcome: "no_response" as const, agentType: "ai" as const, notes: "No answer, voicemail left" },
  { callId: "CALL-0006", borrowerId: 6, durationSeconds: 310, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Partial payment agreed, Rs 5000 by month end" },
  { callId: "CALL-0007", borrowerId: 7, durationSeconds: 380, sentiment: "neutral" as const, outcome: "callback_requested" as const, agentType: "human" as const, notes: "Will discuss with partner and call back" },
  { callId: "CALL-0008", borrowerId: 8, durationSeconds: 95, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Auto-debit successful" },
  { callId: "CALL-0009", borrowerId: 9, durationSeconds: 510, sentiment: "distressed" as const, outcome: "escalated" as const, agentType: "human" as const, notes: "Health issues discussed, requiring specialist intervention" },
  { callId: "CALL-0010", borrowerId: 10, durationSeconds: 200, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Payment next week confirmed" },
  { callId: "CALL-0011", borrowerId: 11, durationSeconds: 45, sentiment: "angry" as const, outcome: "disconnected" as const, agentType: "ai" as const, notes: "Call ended abruptly" },
  { callId: "CALL-0012", borrowerId: 12, durationSeconds: 150, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "First EMI paid promptly" },
  { callId: "CALL-0013", borrowerId: 13, durationSeconds: 340, sentiment: "neutral" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Restructuring proposal discussed" },
  { callId: "CALL-0014", borrowerId: 14, durationSeconds: 280, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Job interview next week, will pay after" },
  { callId: "CALL-0015", borrowerId: 15, durationSeconds: 600, sentiment: "angry" as const, outcome: "escalated" as const, agentType: "human" as const, notes: "Legal notice discussed, fraud case pending" },
  { callId: "CALL-0016", borrowerId: 16, durationSeconds: 180, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Salary credited next Monday" },
  { callId: "CALL-0017", borrowerId: 17, durationSeconds: 90, sentiment: "neutral" as const, outcome: "no_response" as const, agentType: "ai" as const, notes: "Phone switched off" },
  { callId: "CALL-0018", borrowerId: 18, durationSeconds: 260, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Returning from leave next month" },
  { callId: "CALL-0019", borrowerId: 19, durationSeconds: 400, sentiment: "distressed" as const, outcome: "escalated" as const, agentType: "human" as const, notes: "Dispute with business partner ongoing" },
  { callId: "CALL-0020", borrowerId: 20, durationSeconds: 110, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Regular payment, excellent customer" },
  { callId: "CALL-0021", borrowerId: 1, durationSeconds: 130, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Promise kept, EMI received" },
  { callId: "CALL-0022", borrowerId: 6, durationSeconds: 220, sentiment: "neutral" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Family situation improving" },
  { callId: "CALL-0023", borrowerId: 8, durationSeconds: 80, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Another on-time payment" },
  { callId: "CALL-0024", borrowerId: 10, durationSeconds: 170, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Payment as promised" },
  { callId: "CALL-0025", borrowerId: 4, durationSeconds: 100, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Salary payment received" },
  { callId: "CALL-0026", borrowerId: 12, durationSeconds: 140, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Second EMI on time" },
  { callId: "CALL-0027", borrowerId: 16, durationSeconds: 190, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Full payment cleared" },
  { callId: "CALL-0028", borrowerId: 14, durationSeconds: 250, sentiment: "neutral" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Part-time job started" },
  { callId: "CALL-0029", borrowerId: 18, durationSeconds: 200, sentiment: "cooperative" as const, outcome: "ptp" as const, agentType: "ai" as const, notes: "Back to work next week" },
  { callId: "CALL-0030", borrowerId: 20, durationSeconds: 95, sentiment: "cooperative" as const, outcome: "paid" as const, agentType: "ai" as const, notes: "Consistent payer, model customer" },
];

const kpiData = [
  { snapshotDate: new Date("2025-01-01"), collectionEfficiency: "85.20", totalCalls: 3200, ptpRate: "52.10", costSaved: "180000.00", avgCallDuration: 285, escalationRate: "12.50", aiResolutionRate: "72.00", accountsManaged: 1100 },
  { snapshotDate: new Date("2025-02-01"), collectionEfficiency: "87.50", totalCalls: 3400, ptpRate: "55.30", costSaved: "195000.00", avgCallDuration: 278, escalationRate: "11.20", aiResolutionRate: "74.50", accountsManaged: 1150 },
  { snapshotDate: new Date("2025-03-01"), collectionEfficiency: "89.80", totalCalls: 3100, ptpRate: "58.70", costSaved: "210000.00", avgCallDuration: 265, escalationRate: "10.80", aiResolutionRate: "76.00", accountsManaged: 1180 },
  { snapshotDate: new Date("2025-04-01"), collectionEfficiency: "92.10", totalCalls: 3600, ptpRate: "62.40", costSaved: "230000.00", avgCallDuration: 258, escalationRate: "9.50", aiResolutionRate: "78.50", accountsManaged: 1200 },
  { snapshotDate: new Date("2025-05-01"), collectionEfficiency: "94.60", totalCalls: 3800, ptpRate: "65.80", costSaved: "250000.00", avgCallDuration: 252, escalationRate: "8.20", aiResolutionRate: "80.00", accountsManaged: 1220 },
  { snapshotDate: new Date("2025-06-01"), collectionEfficiency: "96.80", totalCalls: 3500, ptpRate: "67.30", costSaved: "275000.00", avgCallDuration: 248, escalationRate: "7.50", aiResolutionRate: "82.00", accountsManaged: 1247 },
];

const complianceData = [
  { ruleName: "Contact Window (8AM–7PM)", status: "compliant" as const, severity: "info" as const, details: "All calls placed within RBI-mandated hours. 0 violations today." },
  { ruleName: "AI Disclosure at Call Start", status: "compliant" as const, severity: "info" as const, details: "AI identity disclosed in 100% of calls." },
  { ruleName: "Call Recording", status: "compliant" as const, severity: "info" as const, details: "All 3,247 calls recorded and archived. Retention: 7 years." },
  { ruleName: "Profanity Filter", status: "compliant" as const, severity: "info" as const, details: "NLP filter active. 0 profanity violations today." },
  { ruleName: "Max Contact Frequency", status: "compliant" as const, severity: "info" as const, details: "All borrowers within 3-contact daily limit." },
  { ruleName: "Contact Window (8AM–7PM)", status: "compliant" as const, severity: "info" as const, details: "All calls placed within RBI-mandated hours. 0 violations." },
  { ruleName: "AI Disclosure at Call Start", status: "compliant" as const, severity: "info" as const, details: "AI identity disclosed in 100% of calls." },
  { ruleName: "Call Recording", status: "compliant" as const, severity: "info" as const, details: "All calls recorded and archived properly." },
  { ruleName: "Profanity Filter", status: "compliant" as const, severity: "info" as const, details: "NLP filter active. 0 violations detected." },
  { ruleName: "Max Contact Frequency", status: "compliant" as const, severity: "info" as const, details: "All borrowers within contact limits." },
];

async function seed() {
  console.log("Seeding database...");

  // Seed borrowers
  for (const b of borrowerData) {
    await db.insert(borrowers).values(b).onDuplicateKeyUpdate({
      set: { updatedAt: new Date() },
    });
  }
  console.log(`✓ Seeded ${borrowerData.length} borrowers`);

  // Seed calls
  for (const c of callData) {
    await db.insert(calls).values(c).onDuplicateKeyUpdate({
      set: { notes: c.notes },
    });
  }
  console.log(`✓ Seeded ${callData.length} calls`);

  // Seed KPI snapshots
  for (const k of kpiData) {
    await db.insert(kpiSnapshots).values(k).onDuplicateKeyUpdate({
      set: { collectionEfficiency: k.collectionEfficiency },
    });
  }
  console.log(`✓ Seeded ${kpiData.length} KPI snapshots`);

  // Seed compliance logs
  for (const cl of complianceData) {
    await db.insert(complianceLogs).values(cl).onDuplicateKeyUpdate({
      set: { details: cl.details },
    });
  }
  console.log(`✓ Seeded ${complianceData.length} compliance logs`);

  console.log("✓ Database seeding complete!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
