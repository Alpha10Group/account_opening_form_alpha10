import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { individualFormSchema, type IndividualFormData } from "@shared/schema";
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

interface IndividualFormProps {
  onSuccess: (referenceNumber: string) => void;
}

const incomeOptions = [
  { value: "salary", label: "Salary" },
  { value: "investments", label: "Investments/Savings" },
  { value: "business", label: "Business Revenue/Profit" },
  { value: "pension", label: "Pension" },
  { value: "inheritance", label: "Inheritance" },
];

const predefinedIncomeValues = incomeOptions.map((o) => o.value);

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

export default function IndividualForm({ onSuccess }: IndividualFormProps) {
  const { toast } = useToast();
  const form = useForm<IndividualFormData>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: {
      accountType: "individual",
      applicationDate: "",
      title: "",
      surname: "",
      firstName: "",
      otherNames: "",
      dateOfBirth: "",
      placeOfBirth: "",
      gender: undefined,
      maritalStatus: undefined,
      nationality: "",
      countryOfResidence: "",
      stateOfOrigin: "",
      localGovernment: "",
      homeTown: "",
      religion: "",
      motherMaidenName: "",
      passportPhotoUrl: "",
      signatory2PassportUrl: "",
      residentialAddress: "",
      city: "",
      state: "",
      country: "",
      mailingAddress: "",
      mailingCity: "",
      mailingState: "",
      mailingCountry: "",
      phoneNumber: "",
      alternativePhone: "",
      email: "",
      preferredCommunication: undefined,
      identificationType: undefined,
      identificationNumber: "",
      identificationIssueDate: "",
      identificationExpiryDate: "",
      idDocumentUrl: "",
      proofOfAddressUrl: "",
      bvn: "",
      tin: "",
      employmentStatus: undefined,
      employerName: "",
      employerAddress: "",
      occupation: "",
      jobTitle: "",
      annualIncome: "",
      sourceOfRegularIncome: "",
      sourceOfFunds: "",
      accountCurrency: undefined,
      accountPurpose: "",
      initialDepositAmount: "",
      primaryBankName: "",
      primaryAccountNumber: "",
      primaryAccountName: "",
      primarySortCode: "",
      secondaryBankName: "",
      secondaryAccountNumber: "",
      secondaryAccountName: "",
      secondarySortCode: "",
      nextOfKinFullName: "",
      nextOfKinRelationship: "",
      nextOfKinPhone: "",
      nextOfKinAddress: "",
      nextOfKinEmail: "",
      nextOfKinDateOfBirth: "",
      nextOfKinGender: undefined,
      onlineAccess: undefined,
      emailNotifications: undefined,
      adultSponsor1Name: "",
      adultSponsor1Relationship: "",
      adultSponsor1Email: "",
      adultSponsor1Phone: "",
      adultSponsor1Address: "",
      adultSponsor2Name: "",
      adultSponsor2Relationship: "",
      adultSponsor2Email: "",
      adultSponsor2Phone: "",
      adultSponsor2Address: "",
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

  const { register, control, watch, formState: { errors } } = form;

  const submitMutation = useMutation({
    mutationFn: async (data: IndividualFormData) => {
      const res = await apiRequest("POST", "/api/applications", data);
      return res.json();
    },
    onSuccess: (data) => {
      onSuccess(data.referenceNumber);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: IndividualFormData) => {
    submitMutation.mutate(data);
  };

  const sourceOfFundsValue = watch("sourceOfFunds") || "";
  const sourceOfRegularIncomeValue = watch("sourceOfRegularIncome") || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-2 border-gray-300 bg-white text-gray-900">

          {/* Form title + Date */}
          <div className="flex items-start px-3 py-2 border-b border-gray-300 gap-4">
            <div className="flex-none">
              <div className="text-[10px] text-gray-600 mb-1">Date: (DD/ MM/ YYYY) :</div>
              <input
                type="date"
                {...register("applicationDate")}
                data-testid="input-application-date"
                className="border border-gray-400 text-xs px-1 py-0.5 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex-1 text-center">
              <div className="font-bold text-sm">INDIVIDUAL/JOINT</div>
            </div>
            <div className="flex-none w-24" />
          </div>

          {/* BVN */}
          <div className="flex justify-end px-3 py-1.5 border-b border-gray-300 gap-2 items-center">
            <span className="text-xs font-medium">BVN:</span>
            <input
              {...register("bvn")}
              maxLength={11}
              data-testid="input-bvn"
              className="border border-gray-400 text-xs px-1 w-32 h-6 focus:outline-none focus:border-primary uppercase"
            />
            <FieldError message={errors.bvn?.message} />
          </div>

          {/* PERSONAL INFORMATION 1 */}
          <PaperHeader>Personal Information 1</PaperHeader>

          {/* Row: Title | Surname | First Name | Other Name */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-[10%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Title:</span>
              <input {...register("title")} data-testid="input-title" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.title?.message} />
            </div>
            <div className="w-[25%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Surname:</span>
              <input {...register("surname")} data-testid="input-surname" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.surname?.message} />
            </div>
            <div className="w-[35%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">First Name:</span>
              <input {...register("firstName")} data-testid="input-firstname" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Other Name:</span>
              <input {...register("otherNames")} data-testid="input-othernames" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
            </div>
          </div>

          {/* Row: Date of Birth | Gender | Marital Status */}
          <div className="flex border-b border-gray-300 min-h-[48px]">
            <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Date of Birth:</span>
              <input type="date" {...register("dateOfBirth")} data-testid="input-dob" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.dateOfBirth?.message} />
            </div>
            <div className="w-[22%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Gender <em className="not-italic text-[9px]">(Tick Box)</em></span>
              <div className="flex gap-3 mt-1 flex-wrap">
                {[{ value: "male", label: "Male" }, { value: "female", label: "Female" }].map(opt => (
                  <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                    <input type="radio" value={opt.value} {...register("gender")} data-testid={`radio-${opt.value}`} className="accent-primary" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <FieldError message={errors.gender?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Marital Status <em className="not-italic text-[9px]">(Tick Box)</em></span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {[
                  { value: "single", label: "Single" },
                  { value: "married", label: "Married" },
                  { value: "divorced", label: "Divorced" },
                  { value: "separated", label: "Separated" },
                  { value: "widowed", label: "Widowed" },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                    <input type="radio" value={opt.value} {...register("maritalStatus")} className="accent-primary" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <FieldError message={errors.maritalStatus?.message} />
            </div>
          </div>

          {/* Row: Nationality | State of Origin | Local Govt. Area */}
          <div className="flex border-b border-gray-300 min-h-[48px]">
            <div className="w-[40%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Nationality <em className="not-italic text-[9px]">(Tick Box)</em></span>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Controller
                  control={control}
                  name="nationality"
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
                        <span className="text-[10px] text-gray-500 italic whitespace-nowrap">Other (please specify)</span>
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
              <FieldError message={errors.nationality?.message} />
            </div>
            <div className="w-[30%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">State of Origin:</span>
              <input {...register("stateOfOrigin")} data-testid="input-state-origin" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.stateOfOrigin?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Local Govt. Area:</span>
              <input {...register("localGovernment")} data-testid="input-lga" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.localGovernment?.message} />
            </div>
          </div>

          {/* Row: Mobile No (1) | Mobile No (2) */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Mobile No (1):</span>
              <input {...register("phoneNumber")} data-testid="input-phone" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.phoneNumber?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Mobile No (2):</span>
              <input {...register("alternativePhone")} data-testid="input-alt-phone" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
            </div>
          </div>

          {/* Row: Email Address | Mother's Maiden Name */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Email Address:</span>
              <input type="email" {...register("email")} data-testid="input-email" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.email?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Mother's Maiden Name:</span>
              <input {...register("motherMaidenName")} data-testid="input-mother-maiden" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.motherMaidenName?.message} />
            </div>
          </div>

          {/* Row: Means of Identification */}
          <div className="border-b border-gray-300 px-2 py-2">
            <div className="text-[10px] text-gray-500 mb-1.5">Means of Identification <em className="not-italic text-[9px]">(Tick Box)</em></div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {[
                { value: "international_passport", label: "Int'l Passport" },
                { value: "drivers_license", label: "Driver's License" },
                { value: "voters_card", label: "Permanent Voter's Card" },
                { value: "national_id", label: "National Identity Card" },
                { value: "birth_certificate", label: "Birth Certificate (minors)" },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("identificationType")} data-testid={`radio-id-${opt.value}`} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.identificationType?.message} />
          </div>

          {/* Row: ID Issuance date | Expiry Date | ID Number | TIN */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">ID Issuance date:</span>
              <input type="date" {...register("identificationIssueDate")} data-testid="input-id-issue" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.identificationIssueDate?.message} />
            </div>
            <div className="w-[20%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Expiry Date:</span>
              <input type="date" {...register("identificationExpiryDate")} data-testid="input-id-expiry" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.identificationExpiryDate?.message} />
            </div>
            <div className="w-[35%] border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">ID Number:</span>
              <input {...register("identificationNumber")} data-testid="input-id-number" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.identificationNumber?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">TIN:</span>
              <input {...register("tin")} data-testid="input-tin" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
            </div>
          </div>

          {/* Row: Annual Income Range */}
          <div className="border-b border-gray-300 px-2 py-2">
            <div className="text-[10px] text-gray-500 mb-1.5">Annual Income Range <em className="not-italic text-[9px]">(Tick Box)</em></div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {[
                { value: "below_5m", label: "Below ₦5m" },
                { value: "5m_10m", label: "₦5m-₦10m" },
                { value: "10m_50m", label: "₦10m-₦50m" },
                { value: "50m_100m", label: "₦50m-₦100m" },
                { value: "above_100m", label: "Above ₦100m" },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("annualIncome")} data-testid={`radio-income-${opt.value}`} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.annualIncome?.message} />
          </div>

          {/* Row: Source of Regular Income */}
          <div className="border-b border-gray-300 px-2 py-2">
            <div className="text-[10px] text-gray-500 mb-1.5">Source of Regular Income <em className="not-italic text-[9px]">(Tick Box)</em></div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 items-center">
              {incomeOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("sourceOfRegularIncome")} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
              <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                <span className="text-[10px] text-gray-500 italic whitespace-nowrap">Other (please specify)</span>
                <Controller
                  control={control}
                  name="sourceOfRegularIncome"
                  render={({ field }) => (
                    <input
                      value={predefinedIncomeValues.includes(field.value || "") ? "" : (field.value || "")}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="flex-1 text-xs border-b border-gray-400 focus:outline-none focus:border-primary bg-transparent min-w-[60px]"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Row: Source of Funds for Investment */}
          <div className="border-b border-gray-300 px-2 py-2">
            <div className="text-[10px] text-gray-500 mb-1.5">Source of Funds for Investment <em className="not-italic text-[9px]">(Tick Box)</em></div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 items-center">
              {incomeOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("sourceOfFunds")} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
              <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                <span className="text-[10px] text-gray-500 italic whitespace-nowrap">Other (please specify)</span>
                <Controller
                  control={control}
                  name="sourceOfFunds"
                  render={({ field }) => (
                    <input
                      value={predefinedIncomeValues.includes(field.value || "") ? "" : (field.value || "")}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="flex-1 text-xs border-b border-gray-400 focus:outline-none focus:border-primary bg-transparent min-w-[60px]"
                    />
                  )}
                />
              </div>
            </div>
            <FieldError message={errors.sourceOfFunds?.message} />
          </div>

          {/* Row: Place of Work */}
          <div className="border-b border-gray-300 px-2 py-1 min-h-[44px] flex flex-col">
            <span className="text-[10px] text-gray-500">Place of Work:</span>
            <input {...register("employerName")} data-testid="input-employer" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
          </div>

          {/* Row: Occupation | Job Title/Designation */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Occupation:</span>
              <input {...register("occupation")} data-testid="input-occupation" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.occupation?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Job Title/Designation:</span>
              <input {...register("jobTitle")} data-testid="input-jobtitle" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
            </div>
          </div>

          {/* Row: Work Address | Residential Address */}
          <div className="flex border-b border-gray-300 min-h-[52px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Work Address:</span>
              <input {...register("employerAddress")} data-testid="input-employer-address" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Residential Address:</span>
              <input {...register("residentialAddress")} data-testid="input-address" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.residentialAddress?.message} />
            </div>
          </div>

          {/* NEXT OF KIN */}
          <PaperHeader>Next of Kin</PaperHeader>

          {/* Row: Name | Relationship */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Name:</span>
              <input {...register("nextOfKinFullName")} data-testid="input-nok-name" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.nextOfKinFullName?.message} />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Relationship:</span>
              <input {...register("nextOfKinRelationship")} data-testid="input-nok-rel" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
              <FieldError message={errors.nextOfKinRelationship?.message} />
            </div>
          </div>

          {/* Row: E-mail Address | Mobile No */}
          <div className="flex border-b border-gray-300 min-h-[44px]">
            <div className="w-1/2 border-r border-gray-300 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">E-mail Address:</span>
              <input type="email" {...register("nextOfKinEmail")} data-testid="input-nok-email" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
            </div>
            <div className="flex-1 px-2 py-1 flex flex-col">
              <span className="text-[10px] text-gray-500">Mobile No:</span>
              <input {...register("nextOfKinPhone")} data-testid="input-nok-phone" className="w-full text-xs focus:outline-none bg-transparent flex-1" />
              <FieldError message={errors.nextOfKinPhone?.message} />
            </div>
          </div>

          {/* Row: Contact Address */}
          <div className="border-b border-gray-300 px-2 py-1 min-h-[52px] flex flex-col">
            <span className="text-[10px] text-gray-500">Contact Address:</span>
            <input {...register("nextOfKinAddress")} data-testid="input-nok-address" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
            <FieldError message={errors.nextOfKinAddress?.message} />
          </div>

          {/* BANK DETAILS */}
          <PaperHeader>Bank Details</PaperHeader>

          <div className="px-3 pt-2 pb-1">
            <p className="text-xs font-semibold text-gray-700 mb-1">Primary Bank Account Details</p>
            <div className="border border-gray-300">
              <div className="flex border-b border-gray-300 min-h-[40px]">
                <div className="w-1/3 border-r border-gray-300 px-2 py-1 flex flex-col">
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
                <div className="w-1/3 px-2 py-1 flex flex-col">
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
                <div className="w-1/3 border-r border-gray-300 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Bank Name:</span>
                  <input {...register("secondaryBankName")} data-testid="input-secondaryBankName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                </div>
                <div className="flex-1 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Name:</span>
                  <input {...register("secondaryAccountName")} data-testid="input-secondaryAccountName" className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1" />
                </div>
              </div>
              <div className="flex min-h-[40px]">
                <div className="w-1/3 px-2 py-1 flex flex-col">
                  <span className="text-[10px] text-gray-500">Account Number (NUBAN):</span>
                  <input {...register("secondaryAccountNumber")} data-testid="input-secondaryAccountNumber" maxLength={10} className="w-full text-xs focus:outline-none bg-transparent flex-1" />
                </div>
              </div>
            </div>
          </div>

          {/* SIGNATORIES */}
          <div className="grid grid-cols-2 gap-6 px-3 pb-4">
            {/* Signatory 1 */}
            <div>
              <div className="bg-primary text-white font-bold px-2 py-1 text-xs uppercase tracking-wide mb-3 inline-block">
                SIGNATORY 1
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-28 h-36 border-2 border-gray-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <FileUpload
                    form={form}
                    fieldName="passportPhotoUrl"
                    testId="passportPhotoUrl"
                    label="Passport"
                    description=""
                    variant="photo"
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <div className="border-2 border-gray-400 p-1 min-h-[56px] flex items-center justify-center">
                      <FileUpload
                        form={form}
                        fieldName="declarations.signatureFileUrl"
                        testId="signatureFileUrl"
                        label="Upload Signature"
                        description="PNG, JPG (max 2MB)"
                        variant="signature"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">Signature</p>
                  </div>
                  <div>
                    <div className="border-b-2 border-r-2 border-primary h-8 flex items-end px-1">
                      <input
                        type="date"
                        {...register("declarations.signatureDate")}
                        data-testid="input-sig1-date"
                        className="w-full text-xs focus:outline-none bg-transparent border-0"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">Date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signatory 2 */}
            <div>
              <div className="bg-primary text-white font-bold px-2 py-1 text-xs uppercase tracking-wide mb-3 inline-block">
                SIGNATORY 2
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-28 h-36 border-2 border-gray-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <FileUpload
                    form={form}
                    fieldName="signatory2PassportUrl"
                    testId="signatory2PassportUrl"
                    label="Passport"
                    description=""
                    variant="photo"
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <div className="border-2 border-gray-400 p-1 min-h-[56px] flex items-center justify-center">
                      <FileUpload
                        form={form}
                        fieldName="declarations.secondSignatureFileUrl"
                        testId="secondSignatureFileUrl"
                        label="Upload Signature"
                        description="PNG, JPG (max 2MB)"
                        variant="signature"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">Signature</p>
                  </div>
                  <div>
                    <div className="border-b-2 border-r-2 border-primary h-8 flex items-end px-1">
                      <input
                        type="date"
                        {...register("declarations.secondSignatureDate")}
                        data-testid="input-sig2-date"
                        className="w-full text-xs focus:outline-none bg-transparent border-0"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ONLINE ACCOUNT ACCESS & NOTIFICATIONS */}
          <PaperHeader>Online Account Access &amp; Notifications</PaperHeader>
          <div className="px-3 py-3 border-b border-gray-300 space-y-3">
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span>Please confirm that you require online access to your account:</span>
              <span className="text-[10px] text-gray-500 italic">(tick-box)</span>
              {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("onlineAccess")} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <span>Please confirm that you require e-mail notifications:</span>
              <span className="text-[10px] text-gray-500 italic">(tick-box)</span>
              {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map(opt => (
                <label key={opt.value} className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="radio" value={opt.value} {...register("emailNotifications")} className="accent-primary" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs font-bold uppercase">If applicant is a minor (below 18 years old), an adult sponsor is required</p>
          </div>

          {/* ADULT SPONSOR(S) INFORMATION */}
          <PaperHeader>Adult Sponsor(s) Information</PaperHeader>
          <div className="grid grid-cols-2 gap-0 border-b border-gray-300">
            {[
              {
                label: "ADULT SPONSOR 1",
                fields: {
                  name: "adultSponsor1Name",
                  relationship: "adultSponsor1Relationship",
                  email: "adultSponsor1Email",
                  phone: "adultSponsor1Phone",
                  address: "adultSponsor1Address",
                },
              },
              {
                label: "ADULT SPONSOR 2",
                fields: {
                  name: "adultSponsor2Name",
                  relationship: "adultSponsor2Relationship",
                  email: "adultSponsor2Email",
                  phone: "adultSponsor2Phone",
                  address: "adultSponsor2Address",
                },
              },
            ].map((sponsor, idx) => (
              <div key={idx} className={idx === 0 ? "border-r border-gray-300" : ""}>
                <div className="px-2 pt-2 pb-1 text-[10px] font-bold text-gray-700 uppercase">{sponsor.label}</div>
                {[
                  { key: "name", label: "Name:" },
                  { key: "relationship", label: "Relationship:" },
                  { key: "email", label: "E-mail:" },
                  { key: "phone", label: "Phone No:" },
                ].map(({ key, label }) => (
                  <div key={key} className="border-t border-gray-300 px-2 py-1 min-h-[36px] flex flex-col">
                    <span className="text-[10px] text-gray-500">{label}</span>
                    <input
                      {...register(sponsor.fields[key as keyof typeof sponsor.fields] as any)}
                      className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1"
                    />
                  </div>
                ))}
                <div className="border-t border-gray-300 px-2 py-1 min-h-[52px] flex flex-col">
                  <span className="text-[10px] text-gray-500">Contact Address:</span>
                  <input
                    {...register(sponsor.fields.address as any)}
                    className="w-full text-xs focus:outline-none uppercase bg-transparent flex-1"
                  />
                </div>
              </div>
            ))}
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

            {/* Email addresses row */}
            <div className="flex flex-wrap items-end gap-3 border-b border-gray-300 pb-3">
              <div className="flex-1 min-w-[200px]">
                <span className="text-[10px] text-gray-500 font-semibold block text-center mb-0.5">Email address</span>
                <input
                  {...register("indemnityEmail1")}
                  type="email"
                  placeholder="email@example.com"
                  data-testid="input-indemnity-email1"
                  className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <span className="text-xs mb-1">and</span>
              <div className="flex-1 min-w-[200px]">
                <span className="text-[10px] text-gray-500 font-semibold block text-center mb-0.5">Email address</span>
                <input
                  {...register("indemnityEmail2")}
                  type="email"
                  placeholder="email@example.com"
                  data-testid="input-indemnity-email2"
                  className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Phone numbers row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span>as my/our designated email address(es) and</span>
              <div className="min-w-[160px]">
                <input
                  {...register("indemnityPhone1")}
                  placeholder="Phone Number"
                  data-testid="input-indemnity-phone1"
                  className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary"
                />
                <span className="text-[10px] text-gray-500 font-semibold block text-center">Phone Number</span>
              </div>
              <span>and</span>
              <div className="min-w-[160px]">
                <input
                  {...register("indemnityPhone2")}
                  placeholder="Phone Number"
                  data-testid="input-indemnity-phone2"
                  className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-primary"
                />
                <span className="text-[10px] text-gray-500 font-semibold block text-center">Phone Number</span>
              </div>
              <span>as my designated contact number for this purpose.</span>
            </div>

            <p>
              While Alpha10 will take internal measures to verify electronic communications, I/we inconsideration of
              Alpha10 honouring my/our requests and instructions sent by electronic mail, hereby undertake to indemnify
              the company and its affiliates and subsidiaries against any losses, liabilities, damages, claims,
              proceedings, cost or expenses of whatever that may be incurred by the company as a result of any issue
              arising from the honouring of my/our redemption requests and instructions sent by electronic mail from
              my/our designated <strong>email address(es) stated above.</strong>
            </p>

            {/* Signature boxes */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              {[
                { sigUrl: "indemnitySignature1Url", sigDate: "indemnitySignatureDate1", testIdDate: "input-indemnity-sig1-date" },
                { sigUrl: "indemnitySignature2Url", sigDate: "indemnitySignatureDate2", testIdDate: "input-indemnity-sig2-date" },
              ].map((sig, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-1">
                    <div className="border border-gray-400 min-h-[60px] flex items-center justify-center p-1">
                      <FileUpload
                        form={form}
                        fieldName={sig.sigUrl}
                        testId={sig.sigUrl}
                        label="Upload Signature"
                        description=""
                        variant="signature"
                      />
                    </div>
                    <p className="text-[10px] text-primary mt-1">Account Holder's Signature</p>
                  </div>
                  <div className="w-32">
                    <div className="border border-gray-400 min-h-[60px] flex items-end px-1 pb-1">
                      <input
                        type="date"
                        {...register(sig.sigDate as any)}
                        data-testid={sig.testIdDate}
                        className="w-full text-xs focus:outline-none bg-transparent"
                      />
                    </div>
                    <p className="text-[10px] text-primary mt-1">Date</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BankDetailsSection />

        <DeclarationsSection form={form} prefix="declarations" accountType="individual" hideIndemnity={true} />

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
