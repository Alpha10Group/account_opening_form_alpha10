import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const accountTypeEnum = pgEnum("account_type", ["individual", "joint", "corporate"]);
export const applicationStatusEnum = pgEnum("application_status", ["pending", "approved", "rejected"]);

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountType: accountTypeEnum("account_type").notNull(),
  status: applicationStatusEnum("status").notNull().default("pending"),
  referenceNumber: text("reference_number").notNull().unique(),
  formData: jsonb("form_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsServicesSchema = z.object({
  discretionaryNGN: z.array(z.string()).optional(),
  discretionaryForeign: z.array(z.string()).optional(),
  shariaCompliant: z.array(z.string()).optional(),
  separatelyManaged: z.array(z.string()).optional(),
  securitiesTrading: z.array(z.string()).optional(),
  nonDiscretionary: z.array(z.string()).optional(),
  mutualFunds: z.array(z.string()).optional(),
  incomeDistribution: z.string().optional(),
  registrarLiaisonServices: z.boolean().optional(),
  othersSelected: z.boolean().optional(),
  othersDescription: z.string().optional(),
  advisoryServices: z.string().optional(),
  initialInvestmentAmount: z.string().optional(),
  clientRiskProfile: z.enum(["low", "medium", "high"]).optional(),
});

export const declarationsSchema = z.object({
  declareAtLeast18: z.boolean().refine(v => v === true, "You must confirm you are at least 18 years"),
  declareMinInvestmentPeriod: z.boolean().refine(v => v === true, "You must accept the minimum investment period terms"),
  declareApplicationOnOwnBehalf: z.boolean().refine(v => v === true, "You must confirm this declaration"),
  declareEstatementRisk: z.boolean().refine(v => v === true, "You must accept e-statement terms"),
  declareMaterialChange: z.boolean().refine(v => v === true, "You must accept material change terms"),
  declarePastPerformance: z.boolean().refine(v => v === true, "You must accept past performance terms"),
  declareInfoComplete: z.boolean().refine(v => v === true, "You must declare information is complete"),
  indemnityAccepted: z.boolean().refine(v => v === true, "You must accept the indemnity clause"),
  termsAccepted: z.boolean().refine(v => v === true, "You must accept the terms and conditions"),
  signatureName: z.string().min(1, "Signature name is required"),
  signatureDate: z.string().min(1, "Signature date is required"),
  signatureFileUrl: z.string().optional(),
  secondSignatureName: z.string().optional(),
  secondSignatureDate: z.string().optional(),
  secondSignatureFileUrl: z.string().optional(),
  isPoliticallyExposed: z.enum(["yes", "no"]),
  pepDetails: z.string().optional(),
  isFatcaApplicable: z.enum(["yes", "no"]),
  fatcaCountry: z.string().optional(),
  fatcaTin: z.string().optional(),
});

export const individualFormSchema = z.object({
  accountType: z.literal("individual"),
  title: z.string().min(1, "Title is required"),
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First name is required"),
  otherNames: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  gender: z.enum(["male", "female"]),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  nationality: z.string().min(1, "Nationality is required"),
  countryOfResidence: z.string().min(1, "Country of residence is required"),
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  localGovernment: z.string().min(1, "Local government is required"),
  homeTown: z.string().min(1, "Home town is required"),
  religion: z.string().optional(),
  motherMaidenName: z.string().min(1, "Mother's maiden name is required"),

  passportPhotoUrl: z.string().optional(),

  residentialAddress: z.string().min(1, "Residential address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  mailingAddress: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingState: z.string().optional(),
  mailingCountry: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  alternativePhone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  preferredCommunication: z.enum(["email", "sms", "both"]),

  identificationType: z.enum(["national_id", "drivers_license", "international_passport", "voters_card"]),
  identificationNumber: z.string().min(1, "ID number is required"),
  identificationIssueDate: z.string().min(1, "Issue date is required"),
  identificationExpiryDate: z.string().min(1, "Expiry date is required"),
  idDocumentUrl: z.string().optional(),
  proofOfAddressUrl: z.string().optional(),

  bvn: z.string().min(11, "BVN must be 11 digits").max(11, "BVN must be 11 digits"),
  tin: z.string().optional(),

  employmentStatus: z.enum(["employed", "self_employed", "unemployed", "retired", "student"]),
  employerName: z.string().optional(),
  employerAddress: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  annualIncome: z.string().min(1, "Annual income is required"),
  sourceOfFunds: z.string().min(1, "Source of funds is required"),

  accountCurrency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  accountPurpose: z.string().min(1, "Purpose of account is required"),
  initialDepositAmount: z.string().optional(),

  primaryBankName: z.string().min(1, "Primary bank name is required"),
  primaryAccountNumber: z.string().min(1, "Primary account number is required"),
  primaryAccountName: z.string().min(1, "Primary account name is required"),
  primarySortCode: z.string().optional(),

  secondaryBankName: z.string().optional(),
  secondaryAccountNumber: z.string().optional(),
  secondaryAccountName: z.string().optional(),
  secondarySortCode: z.string().optional(),

  nextOfKinFullName: z.string().min(1, "Next of kin name is required"),
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinPhone: z.string().min(1, "Phone number is required"),
  nextOfKinAddress: z.string().min(1, "Address is required"),
  nextOfKinEmail: z.string().optional(),
  nextOfKinDateOfBirth: z.string().optional(),
  nextOfKinGender: z.enum(["male", "female"]).optional(),

  productsServices: productsServicesSchema.optional(),

  declarations: declarationsSchema,
});

export const jointAccountHolderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First name is required"),
  otherNames: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().optional(),
  gender: z.enum(["male", "female"]),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  nationality: z.string().min(1, "Nationality is required"),
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  motherMaidenName: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  residentialAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().optional(),
  passportPhotoUrl: z.string().optional(),
  identificationType: z.enum(["national_id", "drivers_license", "international_passport", "voters_card"]),
  identificationNumber: z.string().min(1, "ID number is required"),
  identificationIssueDate: z.string().optional(),
  identificationExpiryDate: z.string().optional(),
  idDocumentUrl: z.string().optional(),
  bvn: z.string().min(11, "BVN must be 11 digits").max(11, "BVN must be 11 digits"),
  tin: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  employerName: z.string().optional(),
  employerAddress: z.string().optional(),
  annualIncome: z.string().min(1, "Annual income is required"),
  sourceOfFunds: z.string().min(1, "Source of funds is required"),
});

export const jointFormSchema = z.object({
  accountType: z.literal("joint"),
  accountName: z.string().min(1, "Joint account name is required"),
  accountCurrency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  accountPurpose: z.string().min(1, "Purpose is required"),
  operatingMandate: z.enum(["jointly", "either_or_survivor", "any_one_to_sign"]),
  primaryBankName: z.string().min(1, "Primary bank name is required"),
  primaryAccountNumber: z.string().min(1, "Primary account number is required"),
  primaryAccountName: z.string().min(1, "Primary account name is required"),
  primarySortCode: z.string().optional(),
  secondaryBankName: z.string().optional(),
  secondaryAccountNumber: z.string().optional(),
  secondaryAccountName: z.string().optional(),
  secondarySortCode: z.string().optional(),
  primaryHolder: jointAccountHolderSchema,
  secondaryHolder: jointAccountHolderSchema,
  nextOfKinFullName: z.string().min(1, "Next of kin name is required"),
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinPhone: z.string().min(1, "Phone number is required"),
  nextOfKinAddress: z.string().min(1, "Address is required"),
  nextOfKinEmail: z.string().optional(),
  nextOfKinDateOfBirth: z.string().optional(),
  proofOfAddressUrl: z.string().optional(),
  productsServices: productsServicesSchema.optional(),
  declarations: declarationsSchema,
});

export const directorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  residentialAddress: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  bvn: z.string().min(11, "BVN must be 11 digits").max(11, "BVN must be 11 digits"),
  identificationType: z.enum(["national_id", "drivers_license", "international_passport", "voters_card"]),
  identificationNumber: z.string().min(1, "ID number is required"),
  passportPhotoUrl: z.string().optional(),
});

export const signatorySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  bvn: z.string().min(11, "BVN must be 11 digits").max(11, "BVN must be 11 digits"),
  identificationType: z.enum(["national_id", "drivers_license", "international_passport", "voters_card"]),
  identificationNumber: z.string().min(1, "ID number is required"),
  signatureMandate: z.string().min(1, "Mandate is required"),
  signatureFileUrl: z.string().optional(),
});

export const corporateFormSchema = z.object({
  accountType: z.literal("corporate"),
  companyName: z.string().min(1, "Company name is required"),
  rcNumber: z.string().min(1, "RC number is required"),
  dateOfIncorporation: z.string().min(1, "Date of incorporation is required"),
  taxIdentificationNumber: z.string().min(1, "TIN is required"),
  businessNature: z.string().min(1, "Nature of business is required"),
  registeredAddress: z.string().min(1, "Registered address is required"),
  operatingAddress: z.string().min(1, "Operating address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  companyPhone: z.string().min(1, "Phone number is required"),
  companyEmail: z.string().email("Invalid email address"),
  website: z.string().optional(),
  companyLogoUrl: z.string().optional(),

  accountCurrency: z.enum(["NGN", "USD", "GBP", "EUR"]),
  accountPurpose: z.string().min(1, "Purpose is required"),
  expectedMonthlyTurnover: z.string().min(1, "Expected turnover is required"),
  sourceOfFunds: z.string().min(1, "Source of funds is required"),
  initialDepositAmount: z.string().optional(),

  primaryBankName: z.string().min(1, "Primary bank name is required"),
  primaryAccountNumber: z.string().min(1, "Primary account number is required"),
  primaryAccountName: z.string().min(1, "Primary account name is required"),
  primarySortCode: z.string().optional(),
  secondaryBankName: z.string().optional(),
  secondaryAccountNumber: z.string().optional(),
  secondaryAccountName: z.string().optional(),
  secondarySortCode: z.string().optional(),

  directors: z.array(directorSchema).min(1, "At least one director is required"),
  signatories: z.array(signatorySchema).min(1, "At least one signatory is required"),

  operatingMandate: z.enum(["any_one", "any_two", "all_signatories"]),

  cacDocumentUrl: z.string().optional(),
  memorandumUrl: z.string().optional(),
  boardResolutionUrl: z.string().optional(),
  proofOfAddressUrl: z.string().optional(),

  productsServices: productsServicesSchema.optional(),

  declarations: declarationsSchema,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type IndividualFormData = z.infer<typeof individualFormSchema>;
export type JointFormData = z.infer<typeof jointFormSchema>;
export type CorporateFormData = z.infer<typeof corporateFormSchema>;

export * from "./models/auth";
