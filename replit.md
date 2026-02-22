# Alpha10 Group Account Opening Portal

## Overview
A comprehensive account opening form platform for Alpha10 Group (Nigerian financial institution) supporting Individual, Joint, and Corporate account types. Captures all standard KYC/regulatory requirements including personal details, identification, employment, account preferences, products/services selection, document uploads, compliance declarations (PEP, FATCA/CRS), indemnity clauses, and electronic signature capabilities.

## Branding
- **Company**: Alpha10 Group
- **Logo**: attached_assets/LOGO3_1770589302028.JPG
- **Color Scheme**: Black, grey, white, and oxblood (#961A1C)
- **Primary color**: Oxblood (HSL 359 70% 35%)

## Architecture
- **Frontend**: React + TypeScript with Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Form handling**: react-hook-form with zod validation
- **File uploads**: multer with separate image/document endpoints

## Key Features
- Three account types: Individual, Joint, Corporate
- Comprehensive multi-section forms with validation
- Dynamic fields (add/remove directors and signatories for corporate accounts)
- Passport photograph uploads for all account types
- Document uploads (ID documents, proof of address, corporate documents) supporting images and PDFs
- Electronic signature capture via file upload
- Products/Services Required section (Asset Management, Securities Trading, Advisory Services, Risk Profile)
- FATCA/CRS Self-Certification with conditional foreign tax residency fields
- PEP (Politically Exposed Person) declaration
- Terms & Conditions acceptance
- Application submission with unique reference numbers (IND-xxx, JNT-xxx, CRP-xxx)
- Success screen with reference number display

## Project Structure
- `shared/schema.ts` - Database schema and Zod validation schemas for all account types
- `client/src/pages/home.tsx` - Main page with account type selection and form routing
- `client/src/components/individual-form.tsx` - Individual account form
- `client/src/components/joint-form.tsx` - Joint account form (two holders)
- `client/src/components/corporate-form.tsx` - Corporate account form (directors + signatories)
- `client/src/components/declarations-section.tsx` - Shared declarations, FATCA/CRS, PEP, terms & conditions
- `client/src/components/file-upload.tsx` - Reusable file upload component (signature/photo/document variants)
- `client/src/components/products-services-section.tsx` - Products/Services Required section (Asset Management, Securities Trading, etc.)
- `client/src/components/success-screen.tsx` - Post-submission confirmation
- `client/src/components/form-section.tsx` - Reusable form section card
- `client/src/pages/applications.tsx` - Applications dashboard (view/search submitted applications)
- `server/routes.ts` - API routes for application CRUD and file uploads
- `server/storage.ts` - Database storage layer
- `server/db.ts` - Database connection

## Admin Authentication
- Password-based admin login to protect the Applications Dashboard
- ADMIN_PASSWORD stored as environment secret
- SESSION_SECRET required for session management
- Rate limiting: 5 attempts per IP, 15-minute lockout
- PostgreSQL-backed session store (connect-pg-simple, `user_sessions` table, auto-created)
- Sessions persist across server restarts
- Works on any hosting platform (Replit, Railway, etc.)

## API Endpoints
- `POST /api/applications` - Submit a new application (public)
- `GET /api/applications` - List all applications (admin only)
- `GET /api/applications/:id` - Get application by ID (admin only)
- `POST /api/admin/login` - Admin login with password
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/status` - Check admin auth status
- `POST /api/upload-signature?category={cat}` - Upload image files (PNG/JPG/WEBP, max 2MB)
- `POST /api/upload-document?category={cat}` - Upload documents (PNG/JPG/WEBP/PDF, max 5MB)
- `GET /api/uploads/:filename` - Serve uploaded files

## Upload System
- Two separate endpoints with different file type filters and size limits
- Field name is "file" for both endpoints
- Category query parameter creates meaningful filename prefixes (passport-, signature-, document-, cac-, etc.)
- Files stored in `uploads/` directory, served as static assets
- FileUpload component routes to correct endpoint based on variant prop (signature/photo/document)
- PDF files display with icon and download link instead of image thumbnail

## Database
- Single `applications` table with JSONB form data storage
- Account type and status enums
- Unique reference numbers (IND-xxx, JNT-xxx, CRP-xxx)

## Form Sections (All Account Types)
1. Personal Information (place of birth, country of residence, etc.)
2. Identification Details (ID type, number, issue/expiry dates, TIN)
3. Contact Information (with mailing/correspondence address)
4. Employment Details (employer address)
5. Next of Kin (with DOB and gender)
6. Account Details (with initial deposit amount, communication preferences)
7. Passport Photograph Upload
8. Document Uploads (ID document, proof of address)
9. Products/Services Required (Asset Management, Securities Trading, Advisory Services, Risk Profile)
10. Declarations (PEP, FATCA/CRS, Terms & Conditions)
11. Signature Upload
