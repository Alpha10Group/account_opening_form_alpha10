# SecureBank Account Opening Portal

## Overview
A comprehensive account opening form platform for Individual, Joint, and Corporate accounts. Customers can select the account type they want and fill out detailed application forms.

## Architecture
- **Frontend**: React + TypeScript with Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Form handling**: react-hook-form with zod validation

## Key Features
- Three account types: Individual, Joint, Corporate
- Comprehensive multi-section forms with validation
- Dynamic fields (add/remove directors and signatories for corporate accounts)
- Application submission with unique reference numbers
- Success screen with reference number display

## Project Structure
- `shared/schema.ts` - Database schema and Zod validation schemas for all account types
- `client/src/pages/home.tsx` - Main page with account type selection and form routing
- `client/src/components/individual-form.tsx` - Individual account form
- `client/src/components/joint-form.tsx` - Joint account form (two holders)
- `client/src/components/corporate-form.tsx` - Corporate account form (directors + signatories)
- `client/src/components/success-screen.tsx` - Post-submission confirmation
- `client/src/components/form-section.tsx` - Reusable form section card
- `server/routes.ts` - API routes for application CRUD
- `server/storage.ts` - Database storage layer
- `server/db.ts` - Database connection

## API Endpoints
- `POST /api/applications` - Submit a new application
- `GET /api/applications` - List all applications
- `GET /api/applications/:id` - Get application by ID

## Database
- Single `applications` table with JSONB form data storage
- Account type and status enums
- Unique reference numbers (IND-xxx, JNT-xxx, CRP-xxx)
