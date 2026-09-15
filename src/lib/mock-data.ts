export type BatchStatus =
  | "Processing"
  | "Under Review"
  | "Validation Failed"
  | "Completed"
  | "Archived";

export type Batch = {
  id: string;
  title: string;
  orderType: string;
  employees: number;
  valid: number;
  errors: number;
  status: BatchStatus;
  created: string;
};

export const batches: Batch[] = [
  {
    id: "APPRAISAL-2026-001",
    title: "Annual Increment 2026",
    orderType: "Increment",
    employees: 3000,
    valid: 2992,
    errors: 8,
    status: "Processing",
    created: "15 Sep 2026",
  },
  {
    id: "PROMOTION-2026-002",
    title: "Mid-Year Promotions 2026",
    orderType: "Promotion",
    employees: 245,
    valid: 245,
    errors: 0,
    status: "Under Review",
    created: "12 Sep 2026",
  },
  {
    id: "GRADE-2026-003",
    title: "Grade Restructure 2026",
    orderType: "Grade Change",
    employees: 86,
    valid: 84,
    errors: 2,
    status: "Validation Failed",
    created: "10 Sep 2026",
  },
  {
    id: "SALARY-2026-004",
    title: "Salary Revision Q2",
    orderType: "Salary Revision",
    employees: 412,
    valid: 412,
    errors: 0,
    status: "Completed",
    created: "02 Sep 2026",
  },
  {
    id: "APPRAISAL-2025-011",
    title: "Annual Increment 2025",
    orderType: "Increment",
    employees: 2874,
    valid: 2874,
    errors: 0,
    status: "Archived",
    created: "18 Sep 2025",
  },
];

export type Employee = {
  empId: string;
  name: string;
  department: string;
  designation: string;
  grade: string;
  salary: string;
  effective: string;
  email: string;
};

export const employees: Employee[] = [
  {
    empId: "EMP0102",
    name: "Anita Raghavan",
    department: "Finance",
    designation: "Senior Analyst",
    grade: "G-6",
    salary: "₹ 9,20,000",
    effective: "01 Apr 2026",
    email: "anita.r@company.com",
  },
  {
    empId: "EMP0145",
    name: "Arun Kumar",
    department: "Operations",
    designation: "Executive",
    grade: "G-4",
    salary: "₹ 6,40,000",
    effective: "01 Apr 2026",
    email: "arun.k@company",
  },
  {
    empId: "EMP0231",
    name: "Bhavna Mehta",
    department: "Human Resources",
    designation: "HR Partner",
    grade: "G-7",
    salary: "₹ 11,10,000",
    effective: "01 Apr 2026",
    email: "bhavna.m@company.com",
  },
  {
    empId: "EMP0389",
    name: "Priya S",
    department: "Engineering",
    designation: "Engineer II",
    grade: "G-5",
    salary: "—",
    effective: "01 Apr 2026",
    email: "priya.s@company.com",
  },
  {
    empId: "EMP0442",
    name: "Rahul Nair",
    department: "Engineering",
    designation: "Lead Engineer",
    grade: "G-8",
    salary: "₹ 18,60,000",
    effective: "01 Apr 2026",
    email: "rahul.n@company.com",
  },
  {
    empId: "EMP0517",
    name: "Sneha Iyer",
    department: "Marketing",
    designation: "Manager",
    grade: "G-8",
    salary: "₹ 16,20,000",
    effective: "01 Apr 2026",
    email: "sneha.i@company.com",
  },
  {
    empId: "EMP0603",
    name: "Imran Sheikh",
    department: "Procurement",
    designation: "Officer",
    grade: "G-5",
    salary: "₹ 7,85,000",
    effective: "01 Apr 2026",
    email: "imran.s@company.com",
  },
  {
    empId: "EMP0712",
    name: "Karthik R",
    department: "Operations",
    designation: "Supervisor",
    grade: "G-6",
    salary: "₹ 8,40,000",
    effective: "01 Apr 2026",
    email: "karthik.r@company.com",
  },
  {
    empId: "EMP0808",
    name: "Meera Joshi",
    department: "Legal",
    designation: "Counsel",
    grade: "G-9",
    salary: "₹ 21,40,000",
    effective: "01 Apr 2026",
    email: "meera.j@company.com",
  },
  {
    empId: "EMP0914",
    name: "Vikram Desai",
    department: "Finance",
    designation: "Deputy Manager",
    grade: "G-7",
    salary: "₹ 12,90,000",
    effective: "01 Apr 2026",
    email: "vikram.d@company.com",
  },
];

export const validationErrors = [
  { row: 145, empId: "EMP0145", name: "Arun Kumar", error: "Email address is invalid" },
  { row: 389, empId: "EMP0389", name: "Priya S", error: "Salary value is missing" },
  { row: 712, empId: "EMP0712", name: "Karthik R", error: "Duplicate Employee ID" },
  { row: 981, empId: "EMP0981", name: "Nisha Varma", error: "Effective date is missing" },
  { row: 1204, empId: "EMP1204", name: "Sanjay Pillai", error: "Department code not recognised" },
  { row: 1533, empId: "EMP1533", name: "Divya Menon", error: "Grade not mapped to template" },
  { row: 2110, empId: "EMP2110", name: "Rohit Bansal", error: "Salary value is missing" },
  { row: 2748, empId: "EMP2748", name: "Faisal Ahmed", error: "Email address is invalid" },
];

export type OrderStatus = "Under Review" | "Approved" | "Returned" | "Rejected" | "Signed" | "Archived";

export type Order = {
  orderNumber: string;
  empId: string;
  employee: string;
  department: string;
  orderType: string;
  batch: string;
  submittedBy: string;
  submittedDate: string;
  effective: string;
  version: string;
  status: OrderStatus;
  financialYear: string;
};

export const orders: Order[] = [
  {
    orderNumber: "INC/2026/000145",
    empId: "EMP0102",
    employee: "Anita Raghavan",
    department: "Finance",
    orderType: "Increment",
    batch: "APPRAISAL-2026-001",
    submittedBy: "HR User",
    submittedDate: "15 Sep 2026",
    effective: "01 Apr 2026",
    version: "v1.0",
    status: "Under Review",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "INC/2026/000146",
    empId: "EMP0231",
    employee: "Bhavna Mehta",
    department: "Human Resources",
    orderType: "Increment",
    batch: "APPRAISAL-2026-001",
    submittedBy: "HR User",
    submittedDate: "15 Sep 2026",
    effective: "01 Apr 2026",
    version: "v1.0",
    status: "Approved",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "PRO/2026/000021",
    empId: "EMP0442",
    employee: "Rahul Nair",
    department: "Engineering",
    orderType: "Promotion",
    batch: "PROMOTION-2026-002",
    submittedBy: "HR User",
    submittedDate: "12 Sep 2026",
    effective: "01 Oct 2026",
    version: "v1.1",
    status: "Returned",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "PRO/2026/000022",
    empId: "EMP0517",
    employee: "Sneha Iyer",
    department: "Marketing",
    orderType: "Promotion + Increment",
    batch: "PROMOTION-2026-002",
    submittedBy: "HR User",
    submittedDate: "12 Sep 2026",
    effective: "01 Oct 2026",
    version: "v1.0",
    status: "Under Review",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "GRD/2026/000007",
    empId: "EMP0603",
    employee: "Imran Sheikh",
    department: "Procurement",
    orderType: "Grade Change",
    batch: "GRADE-2026-003",
    submittedBy: "HR User",
    submittedDate: "10 Sep 2026",
    effective: "01 Oct 2026",
    version: "v1.0",
    status: "Rejected",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "INC/2026/000147",
    empId: "EMP0808",
    employee: "Meera Joshi",
    department: "Legal",
    orderType: "Increment",
    batch: "APPRAISAL-2026-001",
    submittedBy: "HR User",
    submittedDate: "15 Sep 2026",
    effective: "01 Apr 2026",
    version: "v1.0",
    status: "Signed",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "SAL/2026/000310",
    empId: "EMP0914",
    employee: "Vikram Desai",
    department: "Finance",
    orderType: "Salary Revision",
    batch: "SALARY-2026-004",
    submittedBy: "HR User",
    submittedDate: "02 Sep 2026",
    effective: "01 Sep 2026",
    version: "v1.0",
    status: "Archived",
    financialYear: "FY 2026-27",
  },
  {
    orderNumber: "INC/2025/002233",
    empId: "EMP0712",
    employee: "Karthik R",
    department: "Operations",
    orderType: "Increment",
    batch: "APPRAISAL-2025-011",
    submittedBy: "HR User",
    submittedDate: "18 Sep 2025",
    effective: "01 Apr 2025",
    version: "v2.0",
    status: "Archived",
    financialYear: "FY 2025-26",
  },
];

export const emailStatuses = [
  { employee: "Anita Raghavan", email: "anita.r@company.com", status: "Sent", sent: "15 Sep 2026 12:04" },
  { employee: "Bhavna Mehta", email: "bhavna.m@company.com", status: "Sent", sent: "15 Sep 2026 12:04" },
  { employee: "Arun Kumar", email: "arun.k@company", status: "Failed", sent: "15 Sep 2026 12:05" },
  { employee: "Rahul Nair", email: "rahul.n@company.com", status: "Sent", sent: "15 Sep 2026 12:06" },
  { employee: "Priya S", email: "priya.s@company.com", status: "Retry Required", sent: "15 Sep 2026 12:07" },
  { employee: "Sneha Iyer", email: "sneha.i@company.com", status: "Pending", sent: "—" },
  { employee: "Imran Sheikh", email: "imran.s@company.com", status: "Sent", sent: "15 Sep 2026 12:09" },
  { employee: "Karthik R", email: "karthik.r@company.com", status: "Failed", sent: "15 Sep 2026 12:10" },
];

export const auditTrail = [
  {
    time: "15 Sep 2026 10:32",
    user: "HR User",
    action: "Uploaded Excel",
    entity: "Batch APPRAISAL-2026-001",
    details: "3,000 records uploaded",
  },
  {
    time: "15 Sep 2026 10:33",
    user: "System",
    action: "Validation Completed",
    entity: "Batch APPRAISAL-2026-001",
    details: "2,992 valid, 8 errors",
  },
  {
    time: "15 Sep 2026 10:35",
    user: "HR User",
    action: "Generated Orders",
    entity: "Batch APPRAISAL-2026-001",
    details: "2,992 PDFs generated",
  },
  {
    time: "15 Sep 2026 11:10",
    user: "HR Reviewer",
    action: "Approved Order",
    entity: "INC/2026/000145",
    details: "Approved without remarks",
  },
  {
    time: "15 Sep 2026 11:22",
    user: "HR Reviewer",
    action: "Returned Order",
    entity: "PRO/2026/000021",
    details: "Remarks: Effective date to be corrected",
  },
  {
    time: "15 Sep 2026 11:48",
    user: "Authorized Signatory",
    action: "Digitally Signed",
    entity: "Batch APPRAISAL-2026-001",
    details: "2,820 orders signed",
  },
  {
    time: "15 Sep 2026 12:04",
    user: "System",
    action: "Email Dispatch",
    entity: "Batch APPRAISAL-2026-001",
    details: "2,800 sent, 20 failed",
  },
  {
    time: "15 Sep 2026 12:30",
    user: "System",
    action: "Archived to DMS",
    entity: "Batch APPRAISAL-2026-001",
    details: "2,795 documents archived",
  },
];

export const templates = [
  { name: "Increment Order Template", type: "Increment", version: "v3.2", updated: "01 Sep 2026", status: "Active" },
  { name: "Promotion Order Template", type: "Promotion", version: "v2.4", updated: "24 Aug 2026", status: "Active" },
  {
    name: "Promotion + Increment Template",
    type: "Promotion + Increment",
    version: "v1.8",
    updated: "24 Aug 2026",
    status: "Active",
  },
  { name: "Grade Change Template", type: "Grade Change", version: "v1.3", updated: "10 Jul 2026", status: "Draft" },
  { name: "Salary Revision Template", type: "Salary Revision", version: "v2.0", updated: "15 Jun 2026", status: "Active" },
];

export const adminUsers = [
  { name: "Ananya Rao", login: "HR User", role: "HR User", permissions: ["Upload Excel", "Generate Orders", "Submit for Approval"] },
  { name: "Suresh Patel", login: "HR Reviewer", role: "HR Reviewer", permissions: ["Review Orders", "Approve", "Return", "Reject"] },
  { name: "Latha Krishnan", login: "HR Head", role: "HR Head", permissions: ["Final Approval", "View All Batches", "Reports"] },
  { name: "R. Venkatesh", login: "Authorized Signatory", role: "Authorized Signatory", permissions: ["Digital Signature", "View Orders"] },
  { name: "Deepak Sharma", login: "System Administrator", role: "System Administrator", permissions: ["Manage Users", "Manage Roles", "Manage Templates", "Audit Trail"] },
];

export const roles = [
  { role: "HR User", users: 12, description: "Prepares batches, uploads data and generates orders." },
  { role: "HR Reviewer", users: 6, description: "Reviews generated orders and approves or returns them." },
  { role: "HR Head", users: 2, description: "Provides final approval before signature." },
  { role: "Authorized Signatory", users: 3, description: "Applies the digital signature to approved orders." },
  { role: "System Administrator", users: 2, description: "Full administrative access to configuration." },
];

export const permissionMatrix = [
  { permission: "Upload Excel", hrUser: true, reviewer: false, head: false, signatory: false, admin: true },
  { permission: "Generate Orders", hrUser: true, reviewer: false, head: false, signatory: false, admin: true },
  { permission: "Approve / Return", hrUser: false, reviewer: true, head: true, signatory: false, admin: true },
  { permission: "Digital Signature", hrUser: false, reviewer: false, head: false, signatory: true, admin: false },
  { permission: "Send Email", hrUser: true, reviewer: false, head: true, signatory: false, admin: true },
  { permission: "Archive to DMS", hrUser: false, reviewer: false, head: true, signatory: false, admin: true },
  { permission: "Manage Users & Roles", hrUser: false, reviewer: false, head: false, signatory: false, admin: true },
];

export const workflowStages = [
  "Upload",
  "Validation",
  "Generation",
  "Review",
  "Approval",
  "Signature",
  "Email",
  "Archive",
];
