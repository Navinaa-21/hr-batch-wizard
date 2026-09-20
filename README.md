# HR Order Flow

Build a frontend-only prototype for an internal HR Order Management System.

IMPORTANT:

This is ONLY a UI/UX prototype for now.

Do NOT build a backend.

Do NOT connect to a real database.

Do NOT implement real authentication.

Do NOT integrate real email, digital signature, or DMS systems.

Use mock/static data wherever needed.

Keep the implementation simple and suitable for a free-tier prototype.

The main purpose is to demonstrate the complete workflow to HR and management.

Project Purpose

The system will automate the HR order process:

Excel Upload → Validation → Preview → PDF Generation → Approval → Digital Signature → Email → DMS Archive

The organization has approximately 2,500–3,000 employees, so the UI must clearly support BULK processing through batches.

Design

Create a clean, modern enterprise HR application.

Style:

Professional and minimal

White/light background

Blue as the primary accent

Clean cards and tables

Simple icons

Good spacing

Responsive desktop-first design

Avoid excessive animations

Do not make it look like a consumer/social media application

Application name:
"HR Order Management System"

Navigation

Create a left sidebar with:

Dashboard

Create Order

Batches

Approval Queue

Orders

Archive

Templates

Audit Trail

Administration

At the bottom show:

Logged-in user: "HR User"

Role: "HR User"

1. Login Page

Create a simple company-style login page.

Show:

HR Order Management System

Email/Employee ID field

Password field

Sign In button

Since this is only a prototype, the login button can directly open the Dashboard.

Do not implement real authentication.

2. Dashboard

Create a dashboard showing an overview of HR order processing.

Top cards:

Total Batches: 12

Total Orders: 3,248

Pending Approval: 124

Completed: 2,980

Add a "Create New Batch" primary button.

Add a "Recent Batches" table with mock data:

Batch ID | Order Type | Employees | Valid | Errors | Status | Created Date

Example:

APPRAISAL-2026-001 | Increment | 3,000 | 2,992 | 8 | Processing | 15 Sep 2026

PROMOTION-2026-002 | Promotion | 245 | 245 | 0 | Under Review | 12 Sep 2026

GRADE-2026-003 | Grade Change | 86 | 84 | 2 | Validation Failed | 10 Sep 2026

Clicking a batch should open its Batch Details page.

3. Create Order

Create a step-based workflow.

Step 1: Select Order Type

Options:

Increment Order

Promotion Order

Promotion + Increment

Grade Change

Salary Revision

Other

Show each as a selectable card.

After selecting an order type, show a Continue button.

Step 2: Upload Excel

Create a large drag-and-drop upload area.

Text:
"Upload approved employee Excel file"

Show:

Supported format: .xlsx

Maximum file size: 10 MB

Include a sample file name:
"Annual_Increment_2026.xlsx"

Since this is a prototype, clicking Upload/Continue should simulate a successful upload.

Step 3: Validation

Show:

Batch ID:
APPRAISAL-2026-001

Uploaded Records:
3,000

Valid Records:
2,992

Records with Errors:
8

Create a progress/status section.

Show an Errors table:

Row | Employee ID | Employee Name | Error

145 | EMP0145 | Arun Kumar | Email address is invalid
389 | EMP0389 | Priya S | Salary value is missing
712 | EMP0712 | Karthik R | Duplicate Employee ID

Clearly distinguish valid and invalid records.

Add:
"Continue with 2,992 valid records"

Step 4: Preview

Show a table of employee orders.

Columns:
Employee ID
Employee Name
Department
Designation
Salary
Effective Date
Preview

Include around 8–10 mock employees.

Each row should have a "View" button.

Clicking View should open an order preview.

Step 5: Generate Orders

Show a confirmation screen:

"Ready to generate 2,992 orders"

Show:

Order Type

Batch ID

Valid Employees

Template

Effective Date

Button:
"Generate Orders"

When clicked, show a simulated progress screen:

Generating employee orders...

2,850 / 2,992

Progress bar

Show:

Generated: 2,850

Remaining: 142

Failed: 0

After completion show:

"2,992 orders generated successfully"

Button:
"View Batch"

4. Batch Details

Create a detailed page for a batch.

Header:

APPRAISAL-2026-001
Annual Increment 2026

Status:
Processing

Show workflow progress:

Upload → Validation → Generation → Review → Approval → Signature → Email → Archive

Highlight the current stage.

Show statistics:

Uploaded: 3,000
Valid: 2,992
Errors: 8
Generated: 2,992
Approved: 2,850
Signed: 2,820
Sent: 2,800
Archived: 2,795

Below this, show tabs:

Employees
Approvals
Email Status
Archive
Audit Trail

5. Approval Queue

Create a page showing orders waiting for review.

Table:

Order Number
Employee
Order Type
Batch
Submitted By
Submitted Date
Status
Action

Example statuses:

Under Review

Approved

Returned

Rejected

Clicking an order should open Order Details.

6. Order Details

Create an order detail page.

Show:

Employee Information:

Employee ID

Employee Name

Department

Designation

Grade

Order Information:

Order Type

Order Number

Salary

Effective Date

Created Date

Version

Show a PDF-like document preview on the right/center.

Below it show action buttons:

Approve
Return
Reject

For Return/Reject, show a remarks input.

Also show an approval history:

HR User → Submitted
HR Reviewer → Approved
Head HR → Pending

7. Orders

Create a searchable order list.

Search by:

Employee ID

Employee Name

Order Number

Department

Filters:

Order Type

Status

Financial Year

Show a table with:
Order Number
Employee
Order Type
Effective Date
Version
Status
Actions

8. Archive

Create an archive/search page representing the DMS.

Show filters:

Employee ID

Employee Name

Department

Order Type

Financial Year

Order Number

Show archived documents with:
Employee
Order Number
Order Type
Effective Date
Archived Date
Version
Status

Use a "View Document" button.

This is only a mock DMS interface. Do not connect to a real DMS.

9. Email Status

Inside Batch Details, show email tracking.

Columns:

Employee
Email
Status
Sent Date
Retry

Statuses:

Pending

Sent

Failed

Retry Required

Include a few mock failed emails and a "Retry" button.

The button only needs to simulate the action.

10. Audit Trail

Create an Audit Trail page.

Show:

Timestamp
User
Action
Entity
Details

Example:

15 Sep 2026 10:32
HR User
Uploaded Excel
Batch APPRAISAL-2026-001
3,000 records uploaded

15 Sep 2026 10:35
HR User
Generated Orders
2,992 PDFs generated

15 Sep 2026 11:10
HR Reviewer
Approved Order
INC/2026/000145

11. Templates

Create a Template Management page.

Show:

Template Name
Order Type
Version
Last Updated
Status
Actions

Examples:
Increment Order Template
Promotion Order Template
Promotion + Increment Template
Grade Change Template
Salary Revision Template

Include:
"Create Template"
"Edit"
"View"

For now these buttons can open simple mock dialogs. Do not build a real template engine.

12. Administration

Create a simple Administration page with:

Users
Roles
Permissions

Example users:

HR User
HR Reviewer
HR Head
Authorized Signatory
System Administrator

Show role badges and permissions.

This is only UI for now. Do not implement real RBAC.

Important UX Requirement

The main workflow should feel like one connected process:

Create Order
→ Select Order Type
→ Upload Excel
→ Validation
→ Preview
→ Generate
→ Batch Details
→ Approval
→ Signature
→ Email
→ Archive

Use realistic mock data for approximately 3,000 employees.

Do NOT create 3,000 individual mock rows. Use around 10–20 sample rows but display aggregate counts such as 3,000, 2,992, etc.

Important

Keep this version focused on frontend demonstration.

Do not add:

AI features

Chatbot

LLM

Real email integration

Real digital signature

Real DMS

Real database

Payment

External APIs

The goal is to create a polished clickable prototype that demonstrates how the real HR Order Management System will work.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hr-batch-wizard.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6a81fd75-eced-42bf-b20c-d0a9797bc58a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
