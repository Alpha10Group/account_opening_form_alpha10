import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { corporateFormSchema, type CorporateFormData } from "@shared/schema";
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
import { Loader2, Send, Plus, Trash2 } from "lucide-react";
import FormSection from "./form-section";
import DeclarationsSection from "./declarations-section";
import FileUpload from "./file-upload";
import ProductsServicesSection from "./products-services-section";

interface CorporateFormProps {
  onSuccess: (referenceNumber: string) => void;
}

export default function CorporateForm({ onSuccess }: CorporateFormProps) {
  const { toast } = useToast();
  const form = useForm<CorporateFormData>({
    resolver: zodResolver(corporateFormSchema),
    defaultValues: {
      accountType: "corporate",
      companyName: "",
      rcNumber: "",
      dateOfIncorporation: "",
      taxIdentificationNumber: "",
      businessNature: "",
      registeredAddress: "",
      operatingAddress: "",
      city: "",
      state: "",
      country: "",
      companyPhone: "",
      companyEmail: "",
      website: "",
      companyLogoUrl: "",
      accountCurrency: undefined,
      accountPurpose: "",
      expectedMonthlyTurnover: "",
      sourceOfFunds: "",
      initialDepositAmount: "",
      directors: [{
        fullName: "", designation: "", dateOfBirth: "", nationality: "",
        residentialAddress: "", phoneNumber: "", email: "", bvn: "",
        identificationType: undefined as any, identificationNumber: "",
        passportPhotoUrl: "",
      }],
      signatories: [{
        fullName: "", designation: "", phoneNumber: "", email: "", bvn: "",
        identificationType: undefined as any, identificationNumber: "", signatureMandate: "",
        signatureFileUrl: "",
      }],
      operatingMandate: undefined,
      cacDocumentUrl: "",
      memorandumUrl: "",
      boardResolutionUrl: "",
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

  const { fields: directorFields, append: addDirector, remove: removeDirector } = useFieldArray({
    control: form.control,
    name: "directors",
  });

  const { fields: signatoryFields, append: addSignatory, remove: removeSignatory } = useFieldArray({
    control: form.control,
    name: "signatories",
  });

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormSection title="Company Information" description="Registered company details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField control={form.control} name="companyName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl><Input data-testid="input-company-name" placeholder="Registered company name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="rcNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>RC Number *</FormLabel>
                <FormControl><Input data-testid="input-rc-number" placeholder="CAC registration number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="dateOfIncorporation" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Incorporation *</FormLabel>
                <FormControl><Input data-testid="input-inc-date" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="taxIdentificationNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Identification Number (TIN) *</FormLabel>
                <FormControl><Input data-testid="input-corp-tin" placeholder="Enter TIN" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="businessNature" render={({ field }) => (
              <FormItem>
                <FormLabel>Nature of Business *</FormLabel>
                <FormControl><Input data-testid="input-business-nature" placeholder="e.g. Manufacturing, Trading" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormField control={form.control} name="registeredAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Registered Address *</FormLabel>
                  <FormControl><Textarea data-testid="input-reg-address" placeholder="Registered office address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="sm:col-span-2">
              <FormField control={form.control} name="operatingAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Address *</FormLabel>
                  <FormControl><Textarea data-testid="input-op-address" placeholder="Operating/business address" className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl><Input data-testid="input-corp-city" placeholder="Enter city" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem>
                <FormLabel>State *</FormLabel>
                <FormControl><Input data-testid="input-corp-state" placeholder="Enter state" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl><Input data-testid="input-corp-country" placeholder="Enter country" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="companyPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Phone *</FormLabel>
                <FormControl><Input data-testid="input-corp-phone" placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="companyEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Email *</FormLabel>
                <FormControl><Input data-testid="input-corp-email" type="email" placeholder="info@company.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl><Input data-testid="input-corp-website" placeholder="www.company.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="sm:col-span-2">
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FileUpload form={form} fieldName="companyLogoUrl" testId="company-logo" variant="photo" label="Upload company logo" />
              </FormItem>
            </div>
          </div>
        </FormSection>

        <FormSection title="Account Details" description="Account preferences and financial details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="accountCurrency" render={({ field }) => (
              <FormItem>
                <FormLabel>Account Currency *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-corp-currency"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
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
                  <FormControl><SelectTrigger data-testid="select-corp-purpose"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="business_operations">Business Operations</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                    <SelectItem value="trade_finance">Trade Finance</SelectItem>
                    <SelectItem value="treasury">Treasury Operations</SelectItem>
                    <SelectItem value="collections">Collections</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="expectedMonthlyTurnover" render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Monthly Turnover *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-corp-turnover"><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="below_5m">Below N5,000,000</SelectItem>
                    <SelectItem value="5m_20m">N5,000,000 - N20,000,000</SelectItem>
                    <SelectItem value="20m_100m">N20,000,000 - N100,000,000</SelectItem>
                    <SelectItem value="100m_500m">N100,000,000 - N500,000,000</SelectItem>
                    <SelectItem value="above_500m">Above N500,000,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="sourceOfFunds" render={({ field }) => (
              <FormItem>
                <FormLabel>Source of Funds *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-corp-source"><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="business_revenue">Business Revenue</SelectItem>
                    <SelectItem value="investment">Investment Returns</SelectItem>
                    <SelectItem value="loans">Loans/Credit Facilities</SelectItem>
                    <SelectItem value="grants">Grants/Donations</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="initialDepositAmount" render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Deposit Amount</FormLabel>
                <FormControl><Input data-testid="input-corp-initial-deposit" placeholder="Enter amount" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        <FormSection title="Directors" description="Details of company directors">
          {directorFields.map((field, index) => (
            <div key={field.id} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium text-muted-foreground">Director {index + 1}</p>
                {directorFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDirector(index)}
                    className="text-destructive"
                    data-testid={`button-remove-director-${index}`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField control={form.control} name={`directors.${index}.fullName`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl><Input data-testid={`input-director-name-${index}`} placeholder="Full name" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.designation`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Designation *</FormLabel>
                    <FormControl><Input data-testid={`input-director-designation-${index}`} placeholder="e.g. Managing Director" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.dateOfBirth`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl><Input data-testid={`input-director-dob-${index}`} type="date" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.nationality`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Nationality *</FormLabel>
                    <FormControl><Input data-testid={`input-director-nationality-${index}`} placeholder="Nationality" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.phoneNumber`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl><Input data-testid={`input-director-phone-${index}`} placeholder="+234 XXX XXXX XXX" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.email`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl><Input data-testid={`input-director-email-${index}`} type="email" placeholder="email@example.com" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.bvn`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>BVN *</FormLabel>
                    <FormControl><Input data-testid={`input-director-bvn-${index}`} placeholder="11-digit BVN" maxLength={11} {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.identificationType`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>ID Type *</FormLabel>
                    <Select onValueChange={f.onChange} value={f.value}>
                      <FormControl><SelectTrigger data-testid={`select-director-id-${index}`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="national_id">National ID</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                        <SelectItem value="international_passport">Int'l Passport</SelectItem>
                        <SelectItem value="voters_card">Voter's Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`directors.${index}.identificationNumber`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>ID Number *</FormLabel>
                    <FormControl><Input data-testid={`input-director-id-num-${index}`} placeholder="ID number" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="sm:col-span-2 lg:col-span-3">
                  <FormField control={form.control} name={`directors.${index}.residentialAddress`} render={({ field: f }) => (
                    <FormItem>
                      <FormLabel>Residential Address *</FormLabel>
                      <FormControl><Textarea data-testid={`input-director-address-${index}`} placeholder="Full address" className="resize-none" {...f} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div>
                  <FormItem>
                    <FormLabel>Passport Photo</FormLabel>
                    <FileUpload form={form} fieldName={`directors.${index}.passportPhotoUrl`} testId={`director-photo-${index}`} variant="photo" label="Upload photo" />
                  </FormItem>
                </div>
              </div>
              {index < directorFields.length - 1 && <div className="border-b mt-6" />}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4 gap-1"
            onClick={() => addDirector({
              fullName: "", designation: "", dateOfBirth: "", nationality: "",
              residentialAddress: "", phoneNumber: "", email: "", bvn: "",
              identificationType: "national_id", identificationNumber: "",
              passportPhotoUrl: "",
            })}
            data-testid="button-add-director"
          >
            <Plus className="w-4 h-4" /> Add Director
          </Button>
        </FormSection>

        <FormSection title="Authorized Signatories" description="Account signatories and their mandates">
          {signatoryFields.map((field, index) => (
            <div key={field.id} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium text-muted-foreground">Signatory {index + 1}</p>
                {signatoryFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSignatory(index)}
                    className="text-destructive"
                    data-testid={`button-remove-signatory-${index}`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField control={form.control} name={`signatories.${index}.fullName`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-name-${index}`} placeholder="Full name" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.designation`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Designation *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-designation-${index}`} placeholder="e.g. Finance Manager" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.phoneNumber`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-phone-${index}`} placeholder="+234 XXX XXXX XXX" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.email`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-email-${index}`} type="email" placeholder="email@example.com" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.bvn`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>BVN *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-bvn-${index}`} placeholder="11-digit BVN" maxLength={11} {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.identificationType`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>ID Type *</FormLabel>
                    <Select onValueChange={f.onChange} value={f.value}>
                      <FormControl><SelectTrigger data-testid={`select-signatory-id-${index}`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="national_id">National ID</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                        <SelectItem value="international_passport">Int'l Passport</SelectItem>
                        <SelectItem value="voters_card">Voter's Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.identificationNumber`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>ID Number *</FormLabel>
                    <FormControl><Input data-testid={`input-signatory-id-num-${index}`} placeholder="ID number" {...f} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`signatories.${index}.signatureMandate`} render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Signature Mandate *</FormLabel>
                    <Select onValueChange={f.onChange} value={f.value}>
                      <FormControl><SelectTrigger data-testid={`select-signatory-mandate-${index}`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="class_a">Class A (Can sign alone)</SelectItem>
                        <SelectItem value="class_b">Class B (Must co-sign)</SelectItem>
                        <SelectItem value="class_c">Class C (Verification only)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <div>
                  <FormItem>
                    <FormLabel>Signature</FormLabel>
                    <FileUpload form={form} fieldName={`signatories.${index}.signatureFileUrl`} testId={`signatory-signature-${index}`} variant="signature" label="Upload signature" />
                  </FormItem>
                </div>
              </div>
              {index < signatoryFields.length - 1 && <div className="border-b mt-6" />}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4 gap-1"
            onClick={() => addSignatory({
              fullName: "", designation: "", phoneNumber: "", email: "", bvn: "",
              identificationType: "national_id", identificationNumber: "", signatureMandate: "",
              signatureFileUrl: "",
            })}
            data-testid="button-add-signatory"
          >
            <Plus className="w-4 h-4" /> Add Signatory
          </Button>
        </FormSection>

        <FormSection title="Document Uploads" description="Required corporate documents">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FormItem>
                <FormLabel>CAC Certificate</FormLabel>
                <FileUpload form={form} fieldName="cacDocumentUrl" testId="cac-document" variant="document" label="Upload CAC Certificate" />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Memorandum & Articles of Association</FormLabel>
                <FileUpload form={form} fieldName="memorandumUrl" testId="memorandum" variant="document" label="Upload Memorandum & Articles" />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Board Resolution</FormLabel>
                <FileUpload form={form} fieldName="boardResolutionUrl" testId="board-resolution" variant="document" label="Upload Board Resolution" />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Proof of Business Address</FormLabel>
                <FileUpload form={form} fieldName="proofOfAddressUrl" testId="proof-of-address" variant="document" label="Upload Proof of Address" />
              </FormItem>
            </div>
          </div>
        </FormSection>

        <FormSection title="Operating Mandate" description="How the account will be operated">
          <FormField control={form.control} name="operatingMandate" render={({ field }) => (
            <FormItem>
              <FormLabel>Signing Arrangement *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4 pt-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="any_one" id="any_one_corp" data-testid="radio-corp-any-one" />
                    <label htmlFor="any_one_corp" className="text-sm">Any One Signatory</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="any_two" id="any_two_corp" data-testid="radio-corp-any-two" />
                    <label htmlFor="any_two_corp" className="text-sm">Any Two Signatories</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all_signatories" id="all_sign_corp" data-testid="radio-corp-all" />
                    <label htmlFor="all_sign_corp" className="text-sm">All Signatories</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </FormSection>

        <ProductsServicesSection form={form} prefix="productsServices" />

        <DeclarationsSection form={form} prefix="declarations" />

        <div className="flex justify-end gap-3 pt-2 pb-8">
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="gap-2 min-w-[180px]"
            data-testid="button-submit-corporate"
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
