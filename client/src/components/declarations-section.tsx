import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./file-upload";
import FormSection from "./form-section";

interface DeclarationsSectionProps {
  form: any;
  prefix: string;
  showSecondSignature?: boolean;
}

const declarationItems = [
  {
    field: "declareAtLeast18",
    text: "I/We am/are at least 18 years.",
  },
  {
    field: "declareMinInvestmentPeriod",
    text: "I/We agree to comply with the minimum investment period specified for any investment products, failing which I/We accept any losses, charges or costs that arise at the point of redemption of my/our investment.",
  },
  {
    field: "declareApplicationOnOwnBehalf",
    text: "I/We am/are making the application herein for myself/ourselves and not on behalf of any person or part; and I/we am the legal and beneficial owner(s) of the account applied for and full details have been provided.",
  },
  {
    field: "declareEstatementRisk",
    text: "I/We agree that my/our e-statement can be sent at my/our risk to the correspondence address(es)/e-mail(s) I/we have provided.",
  },
  {
    field: "declareMaterialChange",
    text: "I/We confirm that if and where there is a material change in my/our circumstances or new information relevant to the company, I/we will inform the company.",
  },
  {
    field: "declarePastPerformance",
    text: "I/We understand that past portfolio performance is not indicative of future performance.",
  },
  {
    field: "declareInfoComplete",
    text: "I/We declare that the information given on this form is complete, correct, and true to the best of my/our knowledge.",
  },
];

export default function DeclarationsSection({ form, prefix, showSecondSignature = false }: DeclarationsSectionProps) {
  const isPep = form.watch(`${prefix}.isPoliticallyExposed`);
  const isFatca = form.watch(`${prefix}.isFatcaApplicable`);

  return (
    <>
      <FormSection title="Client Declarations" description="Please read and tick each declaration below">
        <div className="space-y-4">
          {declarationItems.map((item) => (
            <FormField
              key={item.field}
              control={form.control}
              name={`${prefix}.${item.field}`}
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                  <FormControl>
                    <Checkbox
                      data-testid={`checkbox-${item.field}`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5 shrink-0"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal leading-relaxed cursor-pointer">
                    {item.text}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </FormSection>

      <FormSection
        title="Indemnity for Redemption Requests/Instructions Sent by Clients Through Electronic Mail"
        description="Electronic communication indemnity clause"
      >
        <div className="p-4 rounded-md bg-muted/50 text-sm text-muted-foreground mb-4 leading-relaxed">
          I/We hereby authorize the company, its affiliates and subsidiaries to honour redemption requests and
          instructions sent by electronic mail and text messages in respect of my/our investment holdings in
          the company. While the company will take internal measures to verify electronic communications, I/we
          in consideration of the company honouring my/our requests and instructions sent by electronic mail,
          hereby undertake to indemnify the company and its affiliates and subsidiaries against any losses,
          liabilities, damages, claims, proceedings, cost or expenses of whatever that may be incurred by the
          company as a result of any issue arising from the honouring of my/our redemption requests and
          instructions sent by electronic mail from my/our designated <strong>email address(es)</strong> stated above.
        </div>

        <FormField
          control={form.control}
          name={`${prefix}.indemnityAccepted`}
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 mb-5">
              <FormControl>
                <Checkbox
                  data-testid="checkbox-indemnity"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5 shrink-0"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal leading-relaxed cursor-pointer">
                I/We accept the above indemnity clause and agree to be bound by its terms. *
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={`grid gap-6 ${showSecondSignature ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
          <div className="space-y-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account Holder's Signature</p>
            <FormField control={form.control} name={`${prefix}.signatureName`} render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input data-testid="input-signature-name" placeholder="Type your full name as signature" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`${prefix}.signatureDate`} render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl><Input data-testid="input-signature-date" type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div>
              <p className="text-sm font-medium mb-2">Upload Signature</p>
              <FileUpload form={form} fieldName={`${prefix}.signatureFileUrl`} testId="signature" variant="signature" label="Click to upload signature" />
            </div>
          </div>
          {showSecondSignature && (
            <div className="space-y-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account Holder's Signature (2nd)</p>
              <FormField control={form.control} name={`${prefix}.secondSignatureName`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input data-testid="input-second-signature-name" placeholder="Type full name as signature" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name={`${prefix}.secondSignatureDate`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl><Input data-testid="input-second-signature-date" type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div>
                <p className="text-sm font-medium mb-2">Upload Signature</p>
                <FileUpload form={form} fieldName={`${prefix}.secondSignatureFileUrl`} testId="second-signature" variant="signature" label="Click to upload signature" />
              </div>
            </div>
          )}
        </div>
      </FormSection>

      <FormSection title="Politically Exposed Person (PEP) Status" description="Regulatory requirement">
        <FormField
          control={form.control}
          name={`${prefix}.isPoliticallyExposed`}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-sm font-medium">Are you a Politically Exposed Person (PEP)? *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="pep-yes" data-testid="radio-pep-yes" />
                    <label htmlFor="pep-yes" className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="pep-no" data-testid="radio-pep-no" />
                    <label htmlFor="pep-no" className="text-sm">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPep === "yes" && (
          <FormField control={form.control} name={`${prefix}.pepDetails`} render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Please provide details of your PEP status</FormLabel>
              <FormControl><Textarea data-testid="input-pep-details" placeholder="Describe your political position, role, or relationship to a PEP" className="resize-none" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}
        <div className="p-4 rounded-md bg-muted/50 text-xs text-muted-foreground leading-relaxed">
          Politically Exposed Persons (PEP) are persons (and their relatives/close associates) who are or have
          been in prominent public positions such as Heads of State, Governors, Local Government Chairpersons,
          Politicians, Government Officials, Judicial Officials, Military Officials, Executives of Federal and
          State Government Corporations & Parastatals, Political Party Officials, Monarchs and members of Royal
          Families, etc.) in Nigeria and foreign countries.
        </div>
      </FormSection>

      <FormSection title="FATCA/CRS Self-Certification" description="Foreign Account Tax Compliance Act declaration">
        <div className="p-4 rounded-md bg-muted/50 text-sm text-muted-foreground mb-4 leading-relaxed">
          Under the Foreign Account Tax Compliance Act (FATCA) and the Common Reporting Standard (CRS),
          financial institutions are required to identify customers who are tax residents of countries
          other than Nigeria. Please confirm your tax residency status below.
        </div>
        <FormField
          control={form.control}
          name={`${prefix}.isFatcaApplicable`}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-sm font-medium">Are you a citizen or tax resident of any country other than Nigeria (including the United States)? *</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="fatca-yes" data-testid="radio-fatca-yes" />
                    <label htmlFor="fatca-yes" className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="fatca-no" data-testid="radio-fatca-no" />
                    <label htmlFor="fatca-no" className="text-sm">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isFatca === "yes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name={`${prefix}.fatcaCountry`} render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Tax Residence</FormLabel>
                <FormControl><Input data-testid="input-fatca-country" placeholder="e.g. United States" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`${prefix}.fatcaTin`} render={({ field }) => (
              <FormItem>
                <FormLabel>Foreign Tax Identification Number (TIN)</FormLabel>
                <FormControl><Input data-testid="input-fatca-tin" placeholder="Enter foreign TIN" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        )}
      </FormSection>

      <FormSection title="Terms and Conditions" description="Please read and accept">
        <div className="p-4 rounded-md bg-muted/50 text-sm text-muted-foreground mb-4 leading-relaxed">
          By ticking the box below, I/We confirm that I/we have read, understood and agree to be bound by the
          company's Terms and Conditions governing the operation of the account(s) applied for. I/We understand that
          the company reserves the right to amend these Terms and Conditions from time to time and that continued use
          of the account shall constitute acceptance of such amendments. I/We also consent to the company collecting,
          processing, and sharing my/our personal data in accordance with applicable data protection laws and
          the company's privacy policy for the purposes of managing my/our account(s) and meeting regulatory requirements.
        </div>
        <FormField
          control={form.control}
          name={`${prefix}.termsAccepted`}
          render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  data-testid="checkbox-terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5 shrink-0"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal leading-relaxed cursor-pointer">
                I/We have read, understood and agree to be bound by the Terms and Conditions and Privacy Policy. *
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </>
  );
}
