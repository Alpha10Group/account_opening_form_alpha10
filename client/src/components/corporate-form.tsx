import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { corporateFormSchema, type CorporateFormData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import DeclarationsSection from "./declarations-section";
import FileUpload from "./file-upload";
import ProductsServicesSection from "./products-services-section";
import BankDetailsSection from "./bank-details-section";

interface CorporateFormProps {
  onSuccess: (referenceNumber: string) => void;
}

function PaperHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary text-white font-bold px-3 py-1.5 text-sm uppercase tracking-wide">
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-[9px] mt-0.5">{message}</p>;
}

function LabeledBox({ children, label, fullWidth = false }: { children: React.ReactNode; label: string; fullWidth?: boolean }) {
  return (
    <div className={`border border-primary px-2 py-1 min-h-[40px] flex flex-col ${fullWidth ? "" : ""}`}>
      <span className="text-xs text-gray-700">{label}</span>
      {children}
    </div>
  );
}

type OfficerPrefix = "officer1" | "officer2" | "officer3" | "officer4";

function OfficerSection({
  prefix,
  number,
  form,
  includeBirthCertificate = false,
}: {
  prefix: OfficerPrefix;
  number: number;
  form: any;
  includeBirthCertificate?: boolean;
}) {
  const { register, control } = form;

  const idOptions = [
    { value: "international_passport", label: "Int'l Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "voters_card", label: "Permanent Voter's Card" },
    { value: "national_id", label: "National Identity Card" },
    ...(includeBirthCertificate ? [{ value: "birth_certificate", label: "Birth Certificate (Minors)" }] : []),
  ];

  return (
    <>
      <PaperHeader>
        Details of Directors/Executives/Trustees/Executors/Administrators/Principal Officers/Signatories ({number})
      </PaperHeader>

      {/* Row: Title | BVN */}
      <div className="flex border-b border-gray-300 min-h-[40px]">
        <div className="flex-1 border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Title:</span>
          <input {...register(`${prefix}.title`)} data-testid={`input-${prefix}-title`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
        <div className="w-[35%] px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">BVN:</span>
          <input {...register(`${prefix}.bvn`)} maxLength={11} data-testid={`input-${prefix}-bvn`} className="w-full text-xs focus:outline-none bg-transparent flex-1 tracking-widest" />
        </div>
      </div>

      {/* Row: Surname | First Name | Other Name */}
      <div className="flex border-b border-gray-300 min-h-[40px]">
        <div className="w-1/3 border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Surname:</span>
          <input {...register(`${prefix}.surname`)} data-testid={`input-${prefix}-surname`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
        <div className="w-1/3 border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">First Name:</span>
          <input {...register(`${prefix}.firstName`)} data-testid={`input-${prefix}-firstname`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
        <div className="flex-1 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Other Name:</span>
          <input {...register(`${prefix}.otherNames`)} data-testid={`input-${prefix}-othernames`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
      </div>

      {/* Row: Date of Birth | Gender | Marital Status */}
      <div className="flex border-b border-gray-300 min-h-[44px]">
        <div className="w-[22%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Date Of Birth:</span>
          <input type="date" {...register(`${prefix}.dateOfBirth`)} data-testid={`input-${prefix}-dob`} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
        </div>
        <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Gender <em className="not-italic">(Tick Box)</em></span>
          <div className="flex gap-2 mt-1">
            {[{ value: "male", label: "Male" }, { value: "female", label: "Female" }].map(opt => (
              <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                <input type="radio" value={opt.value} {...register(`${prefix}.gender`)} className="accent-primary" />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex-1 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Marital Status <em className="not-italic">(Tick Box)</em></span>
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
            {[
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "separated", label: "Separated" },
              { value: "widowed", label: "Widowed" },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                <input type="radio" value={opt.value} {...register(`${prefix}.maritalStatus`)} className="accent-primary" />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Nationality | State of Origin | Local Govt Area */}
      <div className="flex border-b border-gray-300 min-h-[44px]">
        <div className="w-[40%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Nationality <em className="not-italic">(Tick Box)</em></span>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Controller
              control={control}
              name={`${prefix}.nationality`}
              render={({ field }) => (
                <>
                  <label className="flex items-center gap-1 text-xs cursor-pointer whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={field.value === "Nigerian"}
                      onChange={(e) => field.onChange(e.target.checked ? "Nigerian" : "")}
                      className="accent-primary"
                    />
                    <span>Nigerian</span>
                  </label>
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <span className="text-[10px] text-gray-500 italic whitespace-nowrap">Other <em className="not-italic">(Others Specify)</em></span>
                    <input
                      value={field.value === "Nigerian" ? "" : (field.value || "")}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={field.value === "Nigerian"}
                      className="flex-1 text-xs border-b border-gray-400 focus:outline-none focus:border-primary bg-transparent min-w-0 disabled:opacity-40"
                    />
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className="w-[30%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">State Of Origin:</span>
          <input {...register(`${prefix}.stateOfOrigin`)} data-testid={`input-${prefix}-state`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
        <div className="flex-1 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Local Govt Area:</span>
          <input {...register(`${prefix}.localGovernment`)} data-testid={`input-${prefix}-lga`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
      </div>

      {/* Row: Contact Number | Email Address */}
      <div className="flex border-b border-gray-300 min-h-[40px]">
        <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Contact Number:</span>
          <input {...register(`${prefix}.phoneNumber`)} data-testid={`input-${prefix}-phone`} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
        </div>
        <div className="flex-1 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Email Address:</span>
          <input type="email" {...register(`${prefix}.email`)} data-testid={`input-${prefix}-email`} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
        </div>
      </div>

      {/* Row: Means of Identification */}
      <div className="border-b border-gray-300 px-2 py-2">
        <div className="text-[10px] text-gray-500 mb-1.5">Means of Identification <em className="not-italic">(TickBox)</em></div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {idOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
              <input type="radio" value={opt.value} {...register(`${prefix}.identificationType`)} data-testid={`radio-${prefix}-id-${opt.value}`} className="accent-primary" />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Row: ID Issuance date | Expiry Date | ID Number | TIN */}
      <div className="flex border-b border-gray-300 min-h-[40px]">
        <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">I.D. Issuance date:</span>
          <input type="date" {...register(`${prefix}.identificationIssueDate`)} data-testid={`input-${prefix}-id-issue`} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
        </div>
        <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">Expiry Date:</span>
          <input type="date" {...register(`${prefix}.identificationExpiryDate`)} data-testid={`input-${prefix}-id-expiry`} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
        </div>
        <div className="w-[35%] border-r border-gray-300 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">ID Number:</span>
          <input {...register(`${prefix}.identificationNumber`)} data-testid={`input-${prefix}-id-number`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
        <div className="flex-1 px-2 py-1 flex flex-col">
          <span className="text-[10px] text-gray-500">TIN:</span>
          <input {...register(`${prefix}.tin`)} data-testid={`input-${prefix}-tin`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
        </div>
      </div>

      {/* Row: Occupation */}
      <div className="border-b border-gray-300 px-2 py-1 min-h-[40px] flex flex-col">
        <span className="text-[10px] text-gray-500">Occupation:</span>
        <input {...register(`${prefix}.occupation`)} data-testid={`input-${prefix}-occupation`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
      </div>

      {/* Row: Place of Work */}
      <div className="border-b border-gray-300 px-2 py-1 min-h-[40px] flex flex-col">
        <span className="text-[10px] text-gray-500">Place of Work:</span>
        <input {...register(`${prefix}.employerName`)} data-testid={`input-${prefix}-employer`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
      </div>

      {/* Row: Job Title/Designation */}
      <div className="border-b border-gray-300 px-2 py-1 min-h-[40px] flex flex-col">
        <span className="text-[10px] text-gray-500">Job Title/Designation:</span>
        <input {...register(`${prefix}.jobTitle`)} data-testid={`input-${prefix}-jobtitle`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
      </div>

      {/* Row: Work Address */}
      <div className="border-b border-gray-300 px-2 py-1 min-h-[44px] flex flex-col">
        <span className="text-[10px] text-gray-500">Work Address:</span>
        <input {...register(`${prefix}.employerAddress`)} data-testid={`input-${prefix}-work-address`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
      </div>

      {/* Row: Residential Address */}
      <div className="border-b border-gray-300 px-2 py-1 min-h-[44px] flex flex-col">
        <span className="text-[10px] text-gray-500">Residential Address:</span>
        <input {...register(`${prefix}.residentialAddress`)} data-testid={`input-${prefix}-res-address`} className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
      </div>

      {/* PEP Question */}
      <div className="px-2 py-3 border-b border-gray-300">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-semibold">Are you a Politically Exposed Person (PEP)?</span>
          {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map(opt => (
            <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
              <input type="radio" value={opt.value} {...register(`${prefix}.isPep`)} data-testid={`radio-${prefix}-pep-${opt.value}`} className="accent-primary" />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-2 leading-relaxed">
          <strong>Politically Exposed Persons (PEP)</strong> are persons (and their relatives/close associates) who are or have been in prominent public positions (such as Heads of State, Governors, Local Government Chairpersons, Politicians, Government Officials, Judicial Officials, Military Officials, Executives of Federal and State Government Corporations & Parastatals, Political Party Officials, Monarchs and members of Royal Families, etc.) in Nigeria and foreign countries.
        </p>
      </div>
    </>
  );
}

const emptyOfficer = {
  title: "", bvn: "", surname: "", firstName: "", otherNames: "",
  dateOfBirth: "", gender: undefined, maritalStatus: undefined,
  nationality: "", stateOfOrigin: "", localGovernment: "",
  phoneNumber: "", email: "",
  identificationType: undefined, identificationIssueDate: "", identificationExpiryDate: "",
  identificationNumber: "", tin: "",
  occupation: "", employerName: "", jobTitle: "", employerAddress: "", residentialAddress: "",
  isPep: undefined,
};

const emptyMandate = { passportPhotoUrl: "", name: "", signatureFileUrl: "", date: "", classOfSignatory: "" };

export default function CorporateForm({ onSuccess }: CorporateFormProps) {
  const { toast } = useToast();
  const form = useForm<CorporateFormData>({
    resolver: zodResolver(corporateFormSchema),
    defaultValues: {
      accountType: "corporate",
      applicationDate: "",
      companyCategoryLimitedLiability: false,
      companyCategoryPublicListed: false,
      companyCategoryPartnership: false,
      companyCategorySoleProprietorship: false,
      companyCategoryMDAs: false,
      companyCategorySchools: false,
      companyCategoryCooperative: false,
      companyCategoryClubAssociation: false,
      companyCategoryTrustFoundation: false,
      companyCategoryEstate: false,
      companyCategoryOthers: false,
      companyCategoryOthersText: "",
      companyName: "",
      rcNumber: "",
      dateOfIncorporation: "",
      country: "",
      businessNature: "",
      sector: "",
      registeredAddress: "",
      operatingAddress: "",
      taxIdentificationNumber: "",
      companyEmail: "",
      companyPhone: "",
      companyPhone2: "",
      scumlNumber: "",
      officer1: { ...emptyOfficer },
      officer2: { ...emptyOfficer },
      officer3: { ...emptyOfficer },
      officer4: { ...emptyOfficer },
      primaryBankName: "",
      primaryAccountNumber: "",
      primaryAccountName: "",
      secondaryBankName: "",
      secondaryAccountNumber: "",
      secondaryAccountName: "",
      mandateSignatory1: { ...emptyMandate },
      mandateSignatory2: { ...emptyMandate },
      mandateSignatory3: { ...emptyMandate },
      mandateSignatory4: { ...emptyMandate },
      mandateRule: undefined,
      indemnityEmail1: "",
      indemnityEmail2: "",
      indemnityPhone1: "",
      indemnityPhone2: "",
      indemnitySignature1Url: "",
      indemnitySignatureDate1: "",
      indemnitySignature2Url: "",
      indemnitySignatureDate2: "",
      productsServices: {
        discretionaryNGN: [],
        discretionaryForeign: [],
        shariaCompliant: [],
        separatelyManaged: [],
        securitiesTrading: [],
        nonDiscretionary: [],
        registrarLiaisonServices: false,
        othersSelected: false,
        othersDescription: "",
        advisoryServices: "",
        initialInvestmentAmount: "",
        clientRiskProfile: undefined,
      },
      declarations: {
        declareAtLeast18: false,
        declareMinInvestmentPeriod: false,
        declareApplicationOnOwnBehalf: false,
        declareEstatementRisk: false,
        declareMaterialChange: false,
        declarePastPerformance: false,
        declareInfoComplete: false,
        indemnityAccepted: true,
        termsAccepted: false,
        authorityDiscretionary: false,
        authorityNonDiscretionary: false,
        signatureName: "",
        signatureDate: "",
        signatureFileUrl: "",
        secondSignatureName: "",
        secondSignatureDate: "",
        secondSignatureFileUrl: "",
        isPoliticallyExposed: undefined as any,
        pepDetails: "",
        isFatcaApplicable: undefined as any,
        fatcaCountry: "",
        fatcaTin: "",
      },
    },
  });

  const { register, formState: { errors } } = form;

  const submitMutation = useMutation({
    mutationFn: async (data: CorporateFormData) => {
      const res = await apiRequest("POST", "/api/applications", data);
      return res.json();
    },
    onSuccess: (data) => {
      onSuccess(data.referenceNumber);
    },
    onError: (error: Error) => {
      toast({ title: "Submission Failed", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: CorporateFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-2 border-gray-300 bg-white text-gray-900">

          {/* Form Header */}
          <div className="text-center py-3 border-b border-gray-300">
            <div className="font-bold text-lg uppercase">Account Opening Form</div>
            <div className="font-bold text-sm uppercase">Corporate</div>
            <div className="text-xs">(TO BE COMPLETED IN CAPITAL LETTERS)</div>
          </div>

          {/* Date */}
          <div className="px-3 py-2 border-b border-gray-300">
            <div className="text-[10px] text-gray-600 mb-1">Date: (DD/ MM/ YYYY) :</div>
            <input
              type="date"
              {...register("applicationDate")}
              data-testid="input-application-date"
              className="border border-gray-400 text-xs px-1 py-0.5 focus:outline-none focus:border-primary"
            />
          </div>

          {/* COMPANY CATEGORY */}
          <PaperHeader>Company Category</PaperHeader>
          <div className="px-3 py-3 border-b border-gray-300 space-y-2">
            {[
              [
                { field: "companyCategoryLimitedLiability", label: "Limited Liability Company" },
                { field: "companyCategoryPublicListed", label: "Public Listed Company" },
                { field: "companyCategoryPartnership", label: "Partnership" },
                { field: "companyCategorySoleProprietorship", label: "Sole Proprietorship" },
              ],
              [
                { field: "companyCategoryMDAs", label: "Ministries, Departments & Agencies (MDAs)" },
                { field: "companyCategorySchools", label: "Schools" },
                { field: "companyCategoryCooperative", label: "Cooperative/Mutual Society" },
              ],
              [
                { field: "companyCategoryClubAssociation", label: "Club/Association" },
                { field: "companyCategoryTrustFoundation", label: "Trust/Foundation" },
                { field: "companyCategoryEstate", label: "Estate" },
                { field: "companyCategoryOthers", label: "Others" },
              ],
            ].map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap gap-x-6 gap-y-1.5">
                {row.map(({ field, label }) => (
                  <label key={field} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(field as any)}
                      data-testid={`checkbox-${field}`}
                      className="w-3 h-3 accent-primary flex-shrink-0"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* COMPANY/ESTATE DETAILS */}
          <PaperHeader>Company/Estate Details</PaperHeader>

          {[
            { field: "companyName", label: "Company/Business/Estate Name", type: "text" },
            { field: "rcNumber", label: "Certificate of Incorporation/Registration Number", type: "text" },
            { field: "dateOfIncorporation", label: "Date of Incorporation/Registration", type: "date" },
            { field: "country", label: "Country of Incorporation/Registration", type: "text" },
            { field: "businessNature", label: "Type/Nature of Business", type: "text" },
            { field: "sector", label: "Sector/Industry", type: "text" },
          ].map(({ field, label, type }) => (
            <div key={field} className="border-b border-gray-300 px-2 py-1 min-h-[44px] flex flex-col">
              <span className="text-[10px] text-gray-500">{label}</span>
              <input
                type={type}
                {...register(field as any)}
                data-testid={`input-${field}`}
                className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1"
              />
              <FieldError message={(errors as any)?.[field]?.message} />
            </div>
          ))}

          <div className="border-b border-gray-300 px-2 py-1 min-h-[60px] flex flex-col">
            <span className="text-[10px] text-gray-500">Operating Business Address</span>
            <textarea
              {...register("registeredAddress")}
              data-testid="input-registeredAddress"
              rows={2}
              className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1 resize-none"
            />
            <FieldError message={errors.registeredAddress?.message} />
          </div>

          <div className="border-b border-gray-300 px-2 py-1 min-h-[60px] flex flex-col">
            <span className="text-[10px] text-gray-500">Corporate Business Address (If different from above)</span>
            <textarea
              {...register("operatingAddress")}
              data-testid="input-operatingAddress"
              rows={2}
              className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1 resize-none"
            />
          </div>

          {[
            { field: "taxIdentificationNumber", label: "Tax Identification Number (TIN)", type: "text" },
            { field: "companyEmail", label: "Email Address", type: "email" },
            { field: "companyPhone", label: "Phone Number 1", type: "text" },
            { field: "companyPhone2", label: "Phone Number 2", type: "text" },
            { field: "scumlNumber", label: "Special Control Unit Against Money Laundering (SCUML) Reg. No.", type: "text" },
          ].map(({ field, label, type }) => (
            <div key={field} className="border-b border-gray-300 px-2 py-1 min-h-[44px] flex flex-col">
              <span className="text-[10px] text-gray-500">{label}</span>
              <input
                type={type}
                {...register(field as any)}
                data-testid={`input-${field}`}
                className="w-full text-xs focus:outline-none bg-transparent flex-1"
              />
              <FieldError message={(errors as any)?.[field]?.message} />
            </div>
          ))}

          {/* OFFICERS (1-4) */}
          <OfficerSection prefix="officer1" number={1} form={form} includeBirthCertificate={false} />
          <OfficerSection prefix="officer2" number={2} form={form} includeBirthCertificate={false} />
          <OfficerSection prefix="officer3" number={3} form={form} includeBirthCertificate={true} />
          <OfficerSection prefix="officer4" number={4} form={form} includeBirthCertificate={true} />

          {/* BANK DETAILS FOR INVESTMENT REPAYMENTS */}
          <PaperHeader>Bank Details (For Investment Repayments, Liquidation &amp; Proceeds of Sale Payments)</PaperHeader>

          <div className="px-3 pt-2 pb-1">
            <p className="text-xs font-semibold text-gray-700 mb-1">Primary Bank Account Details</p>
            <div className="border border-gray-300">
              <div className="flex border-b border-gray-300 min-h-[40px]">
                <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Bank Name:</span>
                  <input {...register("primaryBankName")} data-testid="input-primaryBankName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                  <FieldError message={errors.primaryBankName?.message} />
                </div>
                <div className="flex-1 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Name:</span>
                  <input {...register("primaryAccountName")} data-testid="input-primaryAccountName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                  <FieldError message={errors.primaryAccountName?.message} />
                </div>
              </div>
              <div className="flex min-h-[40px]">
                <div className="w-1/2 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Number (NUBAN):</span>
                  <input {...register("primaryAccountNumber")} data-testid="input-primaryAccountNumber" maxLength={10} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
                  <FieldError message={errors.primaryAccountNumber?.message} />
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 pt-1 pb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">Secondary Bank Account Details</p>
            <div className="border border-gray-300">
              <div className="flex border-b border-gray-300 min-h-[40px]">
                <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Bank Name:</span>
                  <input {...register("secondaryBankName")} data-testid="input-secondaryBankName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                </div>
                <div className="flex-1 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Name:</span>
                  <input {...register("secondaryAccountName")} data-testid="input-secondaryAccountName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                </div>
              </div>
              <div className="flex min-h-[40px]">
                <div className="w-1/2 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Number (NUBAN):</span>
                  <input {...register("secondaryAccountNumber")} data-testid="input-secondaryAccountNumber" maxLength={10} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
                </div>
              </div>
            </div>
          </div>

          {/* ACCOUNT MANDATE */}
          <PaperHeader>Account Mandate</PaperHeader>
          <div className="px-3 py-4 border-b border-gray-300">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {([
                { prefix: "mandateSignatory1", testSuffix: "1" },
                { prefix: "mandateSignatory2", testSuffix: "2" },
                { prefix: "mandateSignatory3", testSuffix: "3" },
                { prefix: "mandateSignatory4", testSuffix: "4" },
              ] as { prefix: "mandateSignatory1" | "mandateSignatory2" | "mandateSignatory3" | "mandateSignatory4"; testSuffix: string }[]).map(({ prefix: sigPrefix, testSuffix }) => (
                <div key={sigPrefix} className="flex gap-3 items-start">
                  <div className="w-28 h-36 border-2 border-gray-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <FileUpload
                      form={form}
                      fieldName={`${sigPrefix}.passportPhotoUrl`}
                      testId={`${sigPrefix}-passport`}
                      label="Passport"
                      description=""
                      variant="photo"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col">
                      <div className="border-b border-gray-400 min-h-[28px] flex items-end pb-0.5">
                        <input {...register(`${sigPrefix}.name`)} data-testid={`input-${sigPrefix}-name`} className="w-full text-xs focus:outline-none uppercase bg-transparent" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Name</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-2 border-gray-400 p-1 min-h-[44px] flex items-center justify-center">
                        <FileUpload
                          form={form}
                          fieldName={`${sigPrefix}.signatureFileUrl`}
                          testId={`${sigPrefix}-signature`}
                          label="Upload Signature"
                          description=""
                          variant="signature"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Signature</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-b border-gray-400 min-h-[28px] flex items-end pb-0.5">
                        <input type="date" {...register(`${sigPrefix}.date`)} data-testid={`input-${sigPrefix}-date`} className="w-full text-xs focus:outline-none bg-transparent" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Date</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-b border-gray-400 min-h-[28px] flex items-end pb-0.5">
                        <input {...register(`${sigPrefix}.classOfSignatory`)} data-testid={`input-${sigPrefix}-class`} className="w-full text-xs focus:outline-none uppercase bg-transparent" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Class of Signatory</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandate Rule */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <span className="font-semibold">Mandate Rule:</span>
              {[
                { value: "a_only", label: "A only" },
                { value: "b_only", label: "B only" },
                { value: "a_and_b", label: "A & B" },
                { value: "either_to_sign", label: "Either to Sign" },
                { value: "sole", label: "Sole" },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" value={opt.value} {...register("mandateRule")} data-testid={`radio-mandate-${opt.value}`} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <ProductsServicesSection form={form} prefix="productsServices" />

        {/* INDEMNITY FOR REDEMPTION REQUESTS */}
        <div className="border-2 border-gray-300 bg-white text-gray-900">
          <PaperHeader>Indemnity for Redemption Requests/Instructions Sent by Clients Through Electronic Mail</PaperHeader>
          <div className="px-3 py-3 space-y-3 text-xs leading-relaxed">
            <p>
              I/We hereby authorize Alpha10, its affiliates and subsidiaries to honour redemption requests and instructions
              sent by electronic mail and text messages in respect of my/our investment holdings in the company and in this
              regard, confirm
            </p>

            <div className="flex flex-wrap items-end gap-3 border-b border-gray-300 pb-3">
              <div className="flex-1 min-w-[200px]">
                <span className="text-[10px] text-gray-500 font-semibold block text-center mb-0.5">Email address</span>
                <input {...register("indemnityEmail1")} type="email" placeholder="email@example.com" data-testid="input-indemnity-email1" className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary" />
              </div>
              <span className="text-xs mb-1">and</span>
              <div className="flex-1 min-w-[200px]">
                <span className="text-[10px] text-gray-500 font-semibold block text-center mb-0.5">Email address</span>
                <input {...register("indemnityEmail2")} type="email" placeholder="email@example.com" data-testid="input-indemnity-email2" className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span>as my/our designated email address(es) and</span>
              <div className="min-w-[160px]">
                <input {...register("indemnityPhone1")} placeholder="Phone Number" data-testid="input-indemnity-phone1" className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary" />
                <span className="text-[10px] text-gray-500 font-semibold block text-center">Phone Number</span>
              </div>
              <span>and</span>
              <div className="min-w-[160px]">
                <input {...register("indemnityPhone2")} placeholder="Phone Number" data-testid="input-indemnity-phone2" className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary" />
                <span className="text-[10px] text-gray-500 font-semibold block text-center">Phone Number</span>
              </div>
              <span>as my designated contact number for this purpose.</span>
            </div>

            <p>
              While Alpha10 will take internal measures to verify electronic communications, I/we in consideration of
              Alpha10 honouring my/our requests and instructions sent by electronic mail, hereby undertake to indemnify
              the company and its affiliates and subsidiaries against any losses, liabilities, damages, claims,
              proceedings, cost or expenses of whatever that may be incurred by the company as a result of any issue
              arising from the honouring of my/our redemption requests and instructions sent by electronic mail from
              my/our designated <strong>email address(es) stated above.</strong>
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2">
              {[
                { sigUrl: "indemnitySignature1Url", sigDate: "indemnitySignatureDate1", testIdDate: "input-indemnity-sig1-date" },
                { sigUrl: "indemnitySignature2Url", sigDate: "indemnitySignatureDate2", testIdDate: "input-indemnity-sig2-date" },
              ].map((sig, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-1">
                    <div className="border border-gray-400 min-h-[60px] flex items-center justify-center p-1">
                      <FileUpload form={form} fieldName={sig.sigUrl} testId={sig.sigUrl} label="Upload Signature" description="" variant="signature" />
                    </div>
                    <p className="text-[10px] text-primary mt-1">Account Holder's Signature</p>
                  </div>
                  <div className="w-32">
                    <div className="border border-gray-400 min-h-[60px] flex items-end px-1 pb-1">
                      <input type="date" {...register(sig.sigDate as any)} data-testid={sig.testIdDate} className="w-full text-xs focus:outline-none bg-transparent" />
                    </div>
                    <p className="text-[10px] text-primary mt-1">Date</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BankDetailsSection />

        <DeclarationsSection form={form} prefix="declarations" accountType="corporate" showSecondSignature={false} hideIndemnity={true} />

        <div className="flex justify-end gap-4 pt-6 pb-8">
          <Button type="submit" disabled={submitMutation.isPending} data-testid="button-submit">
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
