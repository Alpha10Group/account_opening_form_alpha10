import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { individualFormSchema, type IndividualFormData } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import FormSection from "./form-section";
import DeclarationsSection from "./declarations-section";
import FileUpload from "./file-upload";
import ProductsServicesSection from "./products-services-section";
import BankDetailsSection from "./bank-details-section";

interface IndividualFormProps {
  onSuccess: (referenceNumber: string) => void;
}

export default function IndividualForm({ onSuccess }: IndividualFormProps) {
  const { toast } = useToast();
  const form = useForm<IndividualFormData>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: {
      accountType: "individual",
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
      annualIncome: "",
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
        indemnityAccepted: false,
        termsAccepted: false,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormSection title="Personal Information" description="Basic personal details of the account holder">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-title"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Mr", "Mrs", "Miss", "Ms", "Dr", "Chief", "Alhaji", "Alhaja"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="surname" render={({ field }) => (
              <FormItem>
                <FormLabel>Surname *</FormLabel>
                <FormControl><Input data-testid="input-surname" placeholder="Enter surname" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="firstName" render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl><Input data-testid="input-firstname" placeholder="Enter first name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="otherNames" render={({ field }) => (
              <FormItem>
                <FormLabel>Other Names</FormLabel>
                <FormControl><Input data-testid="input-othernames" placeholder="Enter other names" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl><Input data-testid="input-dob" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="placeOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Birth *</FormLabel>
                <FormControl><Input data-testid="input-placeOfBirth" placeholder="Enter place of birth" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender *</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="male" id="male" data-testid="radio-male" />
                      <label htmlFor="male" className="text-sm">Male</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="female" id="female" data-testid="radio-female" />
                      <label htmlFor="female" className="text-sm">Female</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="maritalStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-marital"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {[{ v: "single", l: "Single" }, { v: "married", l: "Married" }, { v: "divorced", l: "Divorced" }, { v: "widowed", l: "Widowed" }].map(s => (
                      <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nationality" render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality *</FormLabel>
                <FormControl><Input data-testid="input-nationality" placeholder="e.g. Nigerian" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="countryOfResidence" render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Residence *</FormLabel>
                <FormControl><Input data-testid="input-countryOfResidence" placeholder="Enter country of residence" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="stateOfOrigin" render={({ field }) => (
              <FormItem>
                <FormLabel>State of Origin *</FormLabel>
                <FormControl><Input data-testid="input-state-origin" placeholder="Enter state of origin" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="localGovernment" render={({ field }) => (
              <FormItem>
                <FormLabel>Local Government Area *</FormLabel>
                <FormControl><Input data-testid="input-lga" placeholder="Enter LGA" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="homeTown" render={({ field }) => (
              <FormItem>
                <FormLabel>Home Town *</FormLabel>
                <FormControl><Input data-testid="input-hometown" placeholder="Enter home town" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="religion" render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl><Input data-testid="input-religion" placeholder="Enter religion" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="motherMaidenName" render={({ field }) => (
              <FormItem>
                <FormLabel>Mother's Maiden Name *</FormLabel>
                <FormControl><Input data-testid="input-mother-maiden" placeholder="Enter mother's maiden name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="mt-4">
            <FormLabel>Passport Photograph</FormLabel>
            <div className="mt-1">
              <FileUpload
                form={form}
                fieldName="passportPhotoUrl"
                testId="passportPhotoUrl"
                label="Upload photo"
                description="PNG, JPG (max 2MB)"
                variant="photo"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Contact Information" description="Address and contact details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField control={form.control} name="residentialAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential Address *</FormLabel>
                  <FormControl><Textarea data-testid="input-address" placeholder="Enter full residential address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl><Input data-testid="input-city" placeholder="Enter city" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem>
                <FormLabel>State *</FormLabel>
                <FormControl><Input data-testid="input-state" placeholder="Enter state" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl><Input data-testid="input-country" placeholder="Enter country" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl><Input data-testid="input-phone" placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="alternativePhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Phone</FormLabel>
                <FormControl><Input data-testid="input-alt-phone" placeholder="Alternative number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl><Input data-testid="input-email" type="email" placeholder="example@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="preferredCommunication" render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Preference *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-preferredCommunication"><SelectValue placeholder="Select preference" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Mailing / Correspondence Address" description="Optional - if different from residential address">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField control={form.control} name="mailingAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mailing Address</FormLabel>
                  <FormControl><Textarea data-testid="input-mailingAddress" placeholder="Enter mailing address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="mailingCity" render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl><Input data-testid="input-mailingCity" placeholder="Enter city" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mailingState" render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl><Input data-testid="input-mailingState" placeholder="Enter state" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mailingCountry" render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl><Input data-testid="input-mailingCountry" placeholder="Enter country" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Identification" description="Valid means of identification">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="identificationType" render={({ field }) => (
              <FormItem>
                <FormLabel>ID Type *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-id-type"><SelectValue placeholder="Select ID type" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="national_id">National ID Card</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                    <SelectItem value="international_passport">International Passport</SelectItem>
                    <SelectItem value="voters_card">Voter's Card</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="identificationNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number *</FormLabel>
                <FormControl><Input data-testid="input-id-number" placeholder="Enter ID number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="identificationIssueDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date *</FormLabel>
                <FormControl><Input data-testid="input-id-issue" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="identificationExpiryDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date *</FormLabel>
                <FormControl><Input data-testid="input-id-expiry" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <FormLabel>ID Document Scan</FormLabel>
              <div className="mt-1">
                <FileUpload
                  form={form}
                  fieldName="idDocumentUrl"
                  testId="idDocumentUrl"
                  label="Upload ID document"
                  description="PNG, JPG or PDF (max 2MB)"
                  variant="document"
                />
              </div>
            </div>
            <div>
              <FormLabel>Proof of Address</FormLabel>
              <div className="mt-1">
                <FileUpload
                  form={form}
                  fieldName="proofOfAddressUrl"
                  testId="proofOfAddressUrl"
                  label="Upload proof of address"
                  description="Utility bill, bank statement (max 2MB)"
                  variant="document"
                />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="BVN & Tax Information" description="Bank Verification Number and tax details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="bvn" render={({ field }) => (
              <FormItem>
                <FormLabel>BVN (Bank Verification Number) *</FormLabel>
                <FormControl><Input data-testid="input-bvn" placeholder="11-digit BVN" maxLength={11} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="tin" render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Identification Number (TIN)</FormLabel>
                <FormControl><Input data-testid="input-tin" placeholder="Enter TIN" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Employment & Income" description="Employment status and income details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="employmentStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-employment"><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="occupation" render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation *</FormLabel>
                <FormControl><Input data-testid="input-occupation" placeholder="Enter occupation" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="employerName" render={({ field }) => (
              <FormItem>
                <FormLabel>Employer/Business Name</FormLabel>
                <FormControl><Input data-testid="input-employer" placeholder="Enter employer name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="employerAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Address</FormLabel>
                <FormControl><Input data-testid="input-employer-address" placeholder="Enter employer address" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="annualIncome" render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income Range *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-income"><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="below_500k">Below N500,000</SelectItem>
                    <SelectItem value="500k_1m">N500,000 - N1,000,000</SelectItem>
                    <SelectItem value="1m_5m">N1,000,000 - N5,000,000</SelectItem>
                    <SelectItem value="5m_10m">N5,000,000 - N10,000,000</SelectItem>
                    <SelectItem value="above_10m">Above N10,000,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="sourceOfFunds" render={({ field }) => (
              <FormItem>
                <FormLabel>Source of Funds *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-source-funds"><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="salary">Salary/Wages</SelectItem>
                    <SelectItem value="business">Business Income</SelectItem>
                    <SelectItem value="investment">Investment Returns</SelectItem>
                    <SelectItem value="pension">Pension</SelectItem>
                    <SelectItem value="allowance">Allowance</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Account Details" description="Preferred account currency and purpose">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="accountCurrency" render={({ field }) => (
              <FormItem>
                <FormLabel>Account Currency *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-currency"><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="accountPurpose" render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose of Account *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-purpose"><SelectValue placeholder="Select purpose" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="business">Business Transactions</SelectItem>
                    <SelectItem value="investment">Investments</SelectItem>
                    <SelectItem value="personal">Personal Use</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="initialDepositAmount" render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Deposit Amount</FormLabel>
                <FormControl><Input data-testid="input-initialDepositAmount" placeholder="Enter amount" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm font-semibold text-foreground mb-3">Primary Account Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="primaryBankName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name *</FormLabel>
                  <FormControl><Input data-testid="input-primaryBankName" placeholder="Enter bank name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primaryAccountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number *</FormLabel>
                  <FormControl><Input data-testid="input-primaryAccountNumber" placeholder="Enter account number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primaryAccountName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name *</FormLabel>
                  <FormControl><Input data-testid="input-primaryAccountName" placeholder="Enter account name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primarySortCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Code</FormLabel>
                  <FormControl><Input data-testid="input-primarySortCode" placeholder="Enter sort code" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm font-semibold text-foreground mb-3">Secondary Account Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="secondaryBankName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl><Input data-testid="input-secondaryBankName" placeholder="Enter bank name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondaryAccountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl><Input data-testid="input-secondaryAccountNumber" placeholder="Enter account number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondaryAccountName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl><Input data-testid="input-secondaryAccountName" placeholder="Enter account name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondarySortCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Code</FormLabel>
                  <FormControl><Input data-testid="input-secondarySortCode" placeholder="Enter sort code" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Next of Kin" description="Details of your next of kin">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="nextOfKinFullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input data-testid="input-nok-name" placeholder="Enter full name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinRelationship" render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-nok-rel"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"].map(r => (
                      <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl><Input data-testid="input-nok-phone" placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input data-testid="input-nok-email" type="email" placeholder="example@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormField control={form.control} name="nextOfKinAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl><Textarea data-testid="input-nok-address" placeholder="Enter next of kin address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="nextOfKinDateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl><Input data-testid="input-nextOfKinDateOfBirth" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinGender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="male" id="nok-male" data-testid="radio-nextOfKinGender-male" />
                      <label htmlFor="nok-male" className="text-sm">Male</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="female" id="nok-female" data-testid="radio-nextOfKinGender-female" />
                      <label htmlFor="nok-female" className="text-sm">Female</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <ProductsServicesSection form={form} prefix="productsServices" />

        <BankDetailsSection />

        <DeclarationsSection form={form} prefix="declarations" />

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
