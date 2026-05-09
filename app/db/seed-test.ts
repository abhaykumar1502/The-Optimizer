import { getDb } from "../api/queries/connection";
import { borrowers } from "./schema";

const db = getDb();

async function seed() {
  console.log("Testing insert...");
  await db.insert(borrowers).values({
    borrowerId: "BRW-0001",
    name: "Rajesh Kumar",
    loanAmount: "500000.00",
    loanType: "personal",
    dpd: 45,
    rpsScore: 72,
    defaultReason: "Job loss",
    status: "follow_up",
    segment: "sub_standard",
    phone: "+91-98765-43201",
    email: "rajesh.k@email.com",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    loanTenure: 36,
    interestRate: "12.50",
    emiAmount: "16750.00",
  });
  console.log("Insert successful!");
}

seed().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
