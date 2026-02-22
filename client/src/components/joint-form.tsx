import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jointFormSchema, type JointFormData } from "@shared/schema";
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

interface JointFormProps {
  onSuccess: (referenceNumber: string) => void;
}

function HolderFields({ prefix, form }: { prefix: "primaryHolder" | "secondaryHolder"; form: any }) {
  const label = prefix === "primaryHolder" ? "Primary" : "Secondary";
  return (
    <FormSection title={`${label} Account Holder`} description={`Personal details of the ${label.toLowerCase()} holder`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField control={form.control} name={`${prefix}.title`} render={({ field }) => (
          <FormItem>
            <FormLabel>Title *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${prefix}-title`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
              <SelectContent>
                {["Mr", "Mrs", "Miss", "Ms", "Dr", "Chief"].map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.surname`} render={({ field }) => (
          <FormItem>
            <FormLabel>Surname *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-surname`} placeholder="Enter surname" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.firstName`} render={({ field }) => (
          <FormItem>
            <FormLabel>First Name *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-firstname`} placeholder="Enter first name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.otherNames`} render={({ field }) => (
          <FormItem>
            <FormLabel>Other Names</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-othernames`} placeholder="Other names" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.dateOfBirth`} render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-dob`} type="date" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.placeOfBirth`} render={({ field }) => (
          <FormItem>
            <FormLabel>Place of Birth</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-placeOfBirth`} placeholder="Enter place of birth" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.gender`} render={({ field }) => (
          <FormItem>
            <FormLabel>Gender *</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id={`${prefix}-male`} data-testid={`radio-${prefix}-male`} />
                  <label htmlFor={`${prefix}-male`} className="text-sm">Male</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id={`${prefix}-female`} data-testid={`radio-${prefix}-female`} />
                  <label htmlFor={`${prefix}-female`} className="text-sm">Female</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.maritalStatus`} render={({ field }) => (
          <FormItem>
            <FormLabel>Marital Status *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${prefix}-marital`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
              <SelectContent>
                {[{ v: "single", l: "Single" }, { v: "married", l: "Married" }, { v: "divorced", l: "Divorced" }, { v: "widowed", l: "Widowed" }].map(s => (
                  <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.nationality`} render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-nationality`} placeholder="e.g. Nigerian" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.stateOfOrigin`} render={({ field }) => (
          <FormItem>
            <FormLabel>State of Origin *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-state-origin`} placeholder="Enter state" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.motherMaidenName`} render={({ field }) => (
          <FormItem>
            <FormLabel>Mother's Maiden Name</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-motherMaidenName`} placeholder="Enter mother's maiden name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.phoneNumber`} render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-phone`} placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.email`} render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-email`} type="email" placeholder="email@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="sm:col-span-2 lg:col-span-3">
          <FormField control={form.control} name={`${prefix}.residentialAddress`} render={({ field }) => (
            <FormItem>
              <FormLabel>Residential Address *</FormLabel>
              <FormControl><Textarea data-testid={`input-${prefix}-address`} placeholder="Enter full address" className="resize-none" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name={`${prefix}.city`} render={({ field }) => (
          <FormItem>
            <FormLabel>City *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-city`} placeholder="Enter city" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.state`} render={({ field }) => (
          <FormItem>
            <FormLabel>State *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-state`} placeholder="Enter state" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.country`} render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-country`} placeholder="Enter country" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.identificationType`} render={({ field }) => (
          <FormItem>
            <FormLabel>ID Type *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${prefix}-id-type`}><SelectValue placeholder="Select ID type" /></SelectTrigger></FormControl>
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
        <FormField control={form.control} name={`${prefix}.identificationNumber`} render={({ field }) => (
          <FormItem>
            <FormLabel>ID Number *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-id-number`} placeholder="Enter ID number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.identificationIssueDate`} render={({ field }) => (
          <FormItem>
            <FormLabel>ID Issue Date</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-identificationIssueDate`} type="date" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.identificationExpiryDate`} render={({ field }) => (
          <FormItem>
            <FormLabel>ID Expiry Date</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-identificationExpiryDate`} type="date" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="sm:col-span-2 lg:col-span-3">
          <FormField control={form.control} name={`${prefix}.idDocumentUrl`} render={() => (
            <FormItem>
              <FormLabel>ID Document Upload</FormLabel>
              <FormControl>
                <FileUpload
                  form={form}
                  fieldName={`${prefix}.idDocumentUrl`}
                  testId={`${prefix}-idDocumentUrl`}
                  label="Upload ID document"
                  variant="document"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name={`${prefix}.bvn`} render={({ field }) => (
          <FormItem>
            <FormLabel>BVN *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-bvn`} placeholder="11-digit BVN" maxLength={11} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.tin`} render={({ field }) => (
          <FormItem>
            <FormLabel>TIN</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-tin`} placeholder="Tax Identification Number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.occupation`} render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation *</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-occupation`} placeholder="Enter occupation" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.employerName`} render={({ field }) => (
          <FormItem>
            <FormLabel>Employer Name</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-employer`} placeholder="Employer name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.employerAddress`} render={({ field }) => (
          <FormItem>
            <FormLabel>Employer Address</FormLabel>
            <FormControl><Input data-testid={`input-${prefix}-employerAddress`} placeholder="Employer address" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.annualIncome`} render={({ field }) => (
          <FormItem>
            <FormLabel>Annual Income *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${prefix}-income`}><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
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
        <FormField control={form.control} name={`${prefix}.sourceOfFunds`} render={({ field }) => (
          <FormItem>
            <FormLabel>Source of Funds *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${prefix}-source`}><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="salary">Salary/Wages</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="investment">Investment Returns</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <div className="mt-4">
        <FormField control={form.control} name={`${prefix}.passportPhotoUrl`} render={() => (
          <FormItem>
            <FormLabel>Passport Photo</FormLabel>
            <FormControl>
              <FileUpload
                form={form}
                fieldName={`${prefix}.passportPhotoUrl`}
                testId={`${prefix}-passportPhotoUrl`}
                label="Upload passport photo"
                variant="photo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </FormSection>
  );
}

export default function JointForm({ onSuccess }: JointFormProps) {
  const { toast } = useToast();
  const form = useForm<JointFormData>({
    resolver: zodResolver(jointFormSchema),
    defaultValues: {
      accountType: "joint",
      accountName: "",
      accountCurrency: undefined,
      accountPurpose: "",
      operatingMandate: undefined,
      primaryBankName: "",
      primaryAccountNumber: "",
      primaryAccountName: "",
      primarySortCode: "",
      secondaryBankName: "",
      secondaryAccountNumber: "",
      secondaryAccountName: "",
      secondarySortCode: "",
      primaryHolder: {
        title: "", surname: "", firstName: "", otherNames: "", dateOfBirth: "",
        placeOfBirth: "",
        gender: undefined, maritalStatus: undefined, nationality: "", stateOfOrigin: "",
        motherMaidenName: "",
        phoneNumber: "", email: "", residentialAddress: "", city: "", state: "",
        country: "",
        passportPhotoUrl: "",
        identificationType: undefined, identificationNumber: "",
        identificationIssueDate: "", identificationExpiryDate: "",
        idDocumentUrl: "",
        bvn: "", tin: "",
        occupation: "", employerName: "", employerAddress: "",
        annualIncome: "", sourceOfFunds: "",
      },
      secondaryHolder: {
        title: "", surname: "", firstName: "", otherNames: "", dateOfBirth: "",
        placeOfBirth: "",
        gender: undefined, maritalStatus: undefined, nationality: "", stateOfOrigin: "",
        motherMaidenName: "",
        phoneNumber: "", email: "", residentialAddress: "", city: "", state: "",
        country: "",
        passportPhotoUrl: "",
        identificationType: undefined, identificationNumber: "",
        identificationIssueDate: "", identificationExpiryDate: "",
        idDocumentUrl: "",
        bvn: "", tin: "",
        occupation: "", employerName: "", employerAddress: "",
        annualIncome: "", sourceOfFunds: "",
      },
      nextOfKinFullName: "",
      nextOfKinRelationship: "",
      nextOfKinPhone: "",
      nextOfKinAddress: "",
      nextOfKinEmail: "",
      nextOfKinDateOfBirth: "",
      proofOfAddressUrl: "",
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
    mutationFn: async (data: JointFormData) => {
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

  const onSubmit = (data: JointFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormSection title="Joint Account Details" description="Account name and operating mandate">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField control={form.control} name="accountName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Joint Account Name *</FormLabel>
                  <FormControl><Input data-testid="input-joint-account-name" placeholder="e.g. John & Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="accountCurrency" render={({ field }) => (
              <FormItem>
                <FormLabel>Account Currency *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-joint-currency"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
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
                  <FormControl><SelectTrigger data-testid="select-joint-purpose"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="business">Business Transactions</SelectItem>
                    <SelectItem value="investment">Investments</SelectItem>
                    <SelectItem value="personal">Personal/Family Use</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormField control={form.control} name="operatingMandate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Mandate *</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="jointly" id="jointly" data-testid="radio-jointly" />
                        <label htmlFor="jointly" className="text-sm">Jointly (All must sign)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="either_or_survivor" id="either_or" data-testid="radio-either-or" />
                        <label htmlFor="either_or" className="text-sm">Either or Survivor</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="any_one_to_sign" id="any_one" data-testid="radio-any-one" />
                        <label htmlFor="any_one" className="text-sm">Any One to Sign</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm font-semibold text-foreground mb-3">Primary Account Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="primaryBankName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name *</FormLabel>
                  <FormControl><Input data-testid="input-joint-primaryBankName" placeholder="Enter bank name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primaryAccountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number *</FormLabel>
                  <FormControl><Input data-testid="input-joint-primaryAccountNumber" placeholder="Enter account number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primaryAccountName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name *</FormLabel>
                  <FormControl><Input data-testid="input-joint-primaryAccountName" placeholder="Enter account name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="primarySortCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Code</FormLabel>
                  <FormControl><Input data-testid="input-joint-primarySortCode" placeholder="Enter sort code" {...field} /></FormControl>
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
                  <FormControl><Input data-testid="input-joint-secondaryBankName" placeholder="Enter bank name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondaryAccountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl><Input data-testid="input-joint-secondaryAccountNumber" placeholder="Enter account number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondaryAccountName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl><Input data-testid="input-joint-secondaryAccountName" placeholder="Enter account name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="secondarySortCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Code</FormLabel>
                  <FormControl><Input data-testid="input-joint-secondarySortCode" placeholder="Enter sort code" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        </FormSection>

        <HolderFields prefix="primaryHolder" form={form} />
        <HolderFields prefix="secondaryHolder" form={form} />

        <FormSection title="Next of Kin" description="Details of next of kin for the joint account">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="nextOfKinFullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input data-testid="input-joint-nok-name" placeholder="Enter full name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinRelationship" render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-joint-nok-rel"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
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
                <FormControl><Input data-testid="input-joint-nok-phone" placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input data-testid="input-joint-nok-email" type="email" placeholder="email@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nextOfKinDateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl><Input data-testid="input-joint-nok-dob" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormField control={form.control} name="nextOfKinAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl><Textarea data-testid="input-joint-nok-address" placeholder="Enter full address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Document Uploads" description="Upload proof of address for the joint account">
          <FormField control={form.control} name="proofOfAddressUrl" render={() => (
            <FormItem>
              <FormLabel>Proof of Address</FormLabel>
              <FormControl>
                <FileUpload
                  form={form}
                  fieldName="proofOfAddressUrl"
                  testId="joint-proofOfAddressUrl"
                  label="Upload proof of address"
                  variant="document"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </FormSection>

        <ProductsServicesSection form={form} prefix="productsServices" />

        <BankDetailsSection />

        <DeclarationsSection form={form} prefix="declarations" showSecondSignature />

        <div className="flex justify-end gap-3 pt-2 pb-8">
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="gap-2 min-w-[180px]"
            data-testid="button-submit-joint"
          >
            {submitMutation.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
            ) : (
              <><Send className="w-4 h-4" /> Submit Application</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
