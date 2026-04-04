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
  accountType?: "individual" | "joint" | "corporate";
  hideIndemnity?: boolean;
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

export default function DeclarationsSection({ form, prefix, showSecondSignature = false, accountType = "individual", hideIndemnity = false }: DeclarationsSectionProps) {
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

      {!hideIndemnity && (
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
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Account Holder's Signature</p>
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
              <p className="text-sm font-medium mb-2 text-primary">Upload Signature</p>
              <FileUpload form={form} fieldName={`${prefix}.signatureFileUrl`} testId="signature" variant="signature" label="Click to upload signature" />
            </div>
          </div>
          {showSecondSignature && (
            <div className="space-y-4">
              <p className="text-xs font-medium text-primary uppercase tracking-wide">Account Holder's Signature (2nd)</p>
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
                <p className="text-sm font-medium mb-2 text-primary">Upload Signature</p>
                <FileUpload form={form} fieldName={`${prefix}.secondSignatureFileUrl`} testId="second-signature" variant="signature" label="Click to upload signature" />
              </div>
            </div>
          )}
        </div>
      </FormSection>
      )}

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

      <FormSection title="Terms and Conditions" description="Please read and accept the Client Services Agreement">
        <div className="max-h-96 overflow-y-auto p-4 rounded-md bg-muted/50 text-sm text-muted-foreground mb-4 leading-relaxed border" data-testid="terms-content">
          {accountType !== "corporate" ? (
            <>
              <h4 className="font-bold text-primary mb-3 text-base">TERMS AND CONDITIONS</h4>
              <p className="mb-3 flex items-baseline flex-wrap gap-1">
                <span>This AGREEMENT is made this</span>
                <input
                  {...form.register(`${prefix}.agreementDay`)}
                  data-testid="input-agreement-day"
                  placeholder="___"
                  className="border-b border-gray-500 w-10 text-center text-sm focus:outline-none focus:border-primary bg-transparent"
                />
                <span>day of</span>
                <input
                  {...form.register(`${prefix}.agreementDate`)}
                  data-testid="input-agreement-date"
                  placeholder="_________"
                  className="border-b border-gray-500 w-28 text-center text-sm focus:outline-none focus:border-primary bg-transparent"
                />
              </p>
              <p className="mb-1"><strong>Between</strong></p>
              <p className="mb-3">
                <span className="flex items-baseline gap-1 mb-1">
                  <input
                    {...form.register(`${prefix}.clientName`)}
                    data-testid="input-client-name"
                    placeholder="Name of Client"
                    className="border-b border-gray-500 flex-1 text-sm focus:outline-none focus:border-primary bg-transparent italic"
                  />
                  <span className="text-xs italic shrink-0">(Name of Client)</span>
                </span>
                <span className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-sm shrink-0">of</span>
                  <input
                    {...form.register(`${prefix}.clientAddress`)}
                    data-testid="input-client-address"
                    placeholder="Address of Client"
                    className="border-b border-gray-500 flex-1 text-sm focus:outline-none focus:border-primary bg-transparent italic"
                  />
                </span>
                <span className="text-xs italic block">(Address of Client)</span>
                <span className="text-sm block mt-1">
                  (hereinafter referred to as the "Client" or "You" which expression shall wherever the context admits include its
                  legal representatives/successors-in-title and permitted assigns) of the first part.
                </span>
              </p>
              <p className="mb-1"><strong>And</strong></p>
              <p className="mb-3">
                Alpha10 Fund Management Limited, a company duly incorporated under the Companies and Allied Matters Act, 1990
                and having its registered office at 13 Mambolo Street, Zone 2, Wuse, Abuja (hereinafter referred to as the
                "Fund/Portfolio Manager" or "Alpha10" or "Firm") which expression shall wherever the context so admits include
                its successors-in-title and permitted assigns) of the second part.
              </p>

              <p className="mb-2"><strong>WHEREAS:</strong></p>
              <ol className="list-decimal pl-5 mb-3 space-y-1">
                <li>Alpha10 is a registered Fund/Portfolio Manager duly licensed by the Securities and Exchange Commission (SEC).</li>
                <li>The Client hereby appoints the Fund/Portfolio Manager to provide fund management services and the Fund/Portfolio Manager has agreed to render the services and manage the Client's investments in accordance with the Securities and Exchange Commission (SEC) rules.</li>
                <li>The Parties have decided to enter into this Agreement for the purpose of setting out the terms and conditions which will govern the relationship.</li>
              </ol>

              <p className="mb-2 italic text-xs">
                Please review this Client Services Agreement ("Agreement") carefully as it sets forth the understanding between you and
                Alpha10 regarding the services the Firm will provide you.
              </p>
              <p className="mb-2 italic text-xs">
                These terms and conditions "Terms" shall be effective from the date that you accept these terms or the date we commence
                business with you, whichever is earlier. These Terms are legally binding and (subject to amendments, clients will be
                notified of such changes) will apply on the basis of our relationship with you.
              </p>
              <p className="mb-3 italic text-xs">
                These Terms together with any other agreement, notice, disclaimers, disclosures or special terms and conditions shall
                together constitute the terms of business which shall govern the provision by us to you of any regulated or ancillary activity.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">1. Authority</h5>
              <p className="mb-2">The Client hereby appoints Alpha10 to be the Client's Fund/Portfolio Manager and provide:</p>
              <label className="mb-1 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register(`${prefix}.authorityDiscretionary`)} data-testid="checkbox-authority-discretionary" className="w-3 h-3 accent-primary flex-shrink-0" />
                <span>Discretionary Fund Management Services</span>
              </label>
              <p className="mb-1 pl-5 text-xs">or</p>
              <label className="mb-3 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register(`${prefix}.authorityNonDiscretionary`)} data-testid="checkbox-authority-non-discretionary" className="w-3 h-3 accent-primary flex-shrink-0" />
                <span>Non-discretionary Fund Management Services (Tick Box)</span>
              </label>
              <p className="mb-3">as to the investment account(s) established by Client and managed by Alpha10.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">2. Investment Services</h5>
              <p className="mb-2"><strong>2.1 Discretionary Investment Services</strong></p>
              <p className="mb-3">
                Alpha10 provides investment services targeted at Qualified Institutional Investors, High-Net-Worth Individuals, and Retail
                Investors. These services include, without limitation, the management and execution of strategies within Alpha10's
                product offerings. Alpha10 agrees to work with Client or its designated representative to develop appropriate goals,
                objectives, risk tolerance, and standards for its Products/Services.
              </p>
              <p className="mb-3">
                The Client acknowledges and agrees to take responsibility for ensuring that the investment objectives and directives given
                to Alpha10 are in accordance with applicable law. The Client represents that all information given to Alpha10 is accurate
                and complete, and agrees that Alpha10 may rely on such information in performing its fund management duties hereunder.
                Client acknowledges and agrees to promptly advise Alpha10 of any changes to Client's investment goals or objectives.
              </p>

              <p className="mb-2"><strong>2.2 Duties of the Fund / Portfolio Manager</strong></p>
              <p className="mb-1">Alpha10 shall have full discretionary authority (except for Non-discretionary services) over the assets under management. The Fund/Portfolio Manager's duties shall include:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Select, acquire, hold, and dispose of investments in accordance with the agreed investment strategy.</li>
                <li>Act in good faith and in the best interests of the Client, exercising care, diligence, and skill.</li>
                <li>Continuously monitor the product performance and make adjustments as necessary to reflect changing market conditions or economic developments.</li>
                <li>Provide periodic performance reports to regulatory authorities and the Client.</li>
                <li>Ensure that all investment activity complies with applicable laws, regulations, and internal risk management policies.</li>
              </ol>

              <p className="mb-2"><strong>2.3 Duties of the Client</strong></p>
              <p className="mb-1">The Client agrees to fulfill the following responsibilities to enable Alpha10 effectively carry out its mandate:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Provide timely, complete, and accurate information concerning the Client's financial situation, investment objectives, risk tolerance, liquidity needs, and any material changes thereto.</li>
                <li>Inform the Fund/Portfolio Manager in writing of any investment restrictions, prohibited securities or sectors, tax considerations, or other constraints.</li>
                <li>Pay fees and any related expenses in accordance with the terms outlined in the agreement.</li>
                <li>The Client remains solely responsible for all tax obligations arising from investments made on their behalf.</li>
              </ol>

              <h5 className="font-bold text-primary mt-4 mb-2">3. Operation of the Investment Account</h5>
              <p className="mb-2"><strong>3.1 Authority to Operate</strong></p>
              <p className="mb-3">
                You warrant that you have the necessary authority to open and operate the investment account.
                Alpha10 shall be entitled to rely on, and act in accordance with, instructions received from any person authorized
                to access or use the investment account. You can however cancel such authority in writing but Alpha10 must have
                acknowledged such cancellation before it will take effect.
              </p>

              <p className="mb-2"><strong>3.2 Guardian or Legal Representative Consent (If applicable)</strong></p>
              <p className="mb-1">Where a minor is represented by a parent, guardian, trustee, or legal representative ("Representative"), the following terms apply:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>The Representative warrants that they have full legal authority to act on behalf of the minor.</li>
                <li>The Representative agrees to provide all relevant legal documentation evidencing such authority.</li>
                <li>The Representative must inform the Fund/Portfolio Manager in writing of any change in legal status or authority.</li>
                <li>Unless revoked in writing, Alpha10 may continue to act on instructions of the Representative.</li>
              </ol>

              <p className="mb-2"><strong>3.3 Instructions</strong></p>
              <p className="mb-3">
                Instructions must be received by Alpha10 before 1pm on any business day for a transaction to be processed the same day.
                Instructions received after 1pm will be treated the next business day. Instructions received on a weekend or public holiday
                will be taken as received on the following business day. You are responsible for ensuring that Alpha10 receives any instruction
                and that instructions are clear and intelligible. Alpha10 may confirm or authenticate instructions before effecting any transaction.
              </p>

              <p className="mb-2"><strong>3.4 Payments</strong></p>
              <p className="mb-3">
                Alpha10 will not effect any payments from the investment account other than to your designated bank account(s) as specified
                on the application form or otherwise notified in writing. Transaction processing may take up to 72 working hours.
                Alpha10 is not liable for verifying bank account details supplied by your authorized signatory.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">4. Third Party Indemnity</h5>
              <p className="mb-3">
                Alpha10 may in its discretion permit payment to a third party. You undertake to indemnify Alpha10 against any losses,
                damages, claims, or expenses arising from such payment.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">5. Statements</h5>
              <p className="mb-1">Alpha10 shall provide periodic statements showing:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>All transactions relating to the investment account.</li>
                <li>All interest/profit credited and charges debited.</li>
              </ol>
              <p className="mb-3">Clients must notify Alpha10 of any error within 60 days.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">6. Personal Information</h5>
              <p className="mb-1">You acknowledge and consent that Alpha10 may:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Verify information provided by you.</li>
                <li>Process personal data to operate your account.</li>
                <li>Share information within Alpha10 for regulatory compliance.</li>
                <li>Report suspicious transactions or money laundering activities.</li>
              </ol>

              <h5 className="font-bold text-primary mt-4 mb-2">7. Interest / Profit Payment</h5>
              <p className="mb-3">
                Interest/Profit on investment shall be paid upfront, periodically, or at maturity depending on the agreed product.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">8. Liquidation Notice</h5>
              <p className="mb-3">Liquidation instructions will be processed within 24 hours of receipt.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">9. Charges Payable</h5>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Premature liquidation may attract 25% or 35% penalty of accrued interest.</li>
                <li>Upfront interest/profit may be deducted from principal where necessary.</li>
              </ol>

              <h5 className="font-bold text-primary mt-4 mb-2">10. Rollover Instruction</h5>
              <p className="mb-3">
                Upon maturity, where no contrary instruction is received, investment may be rolled over at the prevailing market rate.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">11. Withholding Tax (WHT)</h5>
              <p className="mb-3">Interest/profit earned is subject to 10% withholding tax deduction where applicable.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">12. Dealing & Advice</h5>
              <p className="mb-3">
                Alpha10 may execute investment instructions on behalf of the Client. Investment advice provided does not constitute
                a guarantee of performance.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">13. Fund / Portfolio Manager Liability</h5>
              <p className="mb-1">Alpha10 shall not disclaim liability arising from:</p>
              <ul className="list-disc pl-5 mb-3 space-y-1">
                <li>Fraud</li>
                <li>Bad faith</li>
                <li>Gross negligence</li>
                <li>Willful misconduct</li>
              </ul>

              <h5 className="font-bold text-primary mt-4 mb-2">14. Email Indemnity</h5>
              <p className="mb-3">
                You authorize Alpha10 to act upon instructions sent via email. You agree to indemnify Alpha10 against losses
                arising from electronic communications.
              </p>

              <h5 className="font-bold text-primary mt-4 mb-2">15. Force Majeure</h5>
              <p className="mb-1">Alpha10 shall not be liable for failure or delay in performance caused by events beyond its control including:</p>
              <ul className="list-disc pl-5 mb-3 space-y-1">
                <li>Government actions</li>
                <li>Telecommunications failures</li>
                <li>Industrial disputes</li>
              </ul>

              <h5 className="font-bold text-primary mt-4 mb-2">16. Governing Law and Dispute Resolution</h5>
              <p className="mb-3">
                This Agreement shall be governed by the Investment and Securities Act and SEC Rules. Disputes shall first be resolved
                amicably. Where unresolved, the matter may be referred to the SEC Administrative Proceedings Committee or Investment
                and Securities Tribunal.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-primary mb-3 text-base">TERMS AND CONDITIONS</h4>
              <p className="mb-3 flex items-baseline flex-wrap gap-1">
                <span>This AGREEMENT is made this</span>
                <input
                  {...form.register(`${prefix}.agreementDay`)}
                  data-testid="input-agreement-day"
                  placeholder="___"
                  className="border-b border-gray-500 w-10 text-center text-sm focus:outline-none focus:border-primary bg-transparent"
                />
                <span>day of</span>
                <input
                  {...form.register(`${prefix}.agreementDate`)}
                  data-testid="input-agreement-date"
                  placeholder="_________"
                  className="border-b border-gray-500 w-28 text-center text-sm focus:outline-none focus:border-primary bg-transparent"
                />
              </p>
              <p className="mb-1"><strong>Between</strong></p>
              <p className="mb-3">
                <span className="flex items-baseline gap-1 mb-1">
                  <input
                    {...form.register(`${prefix}.clientName`)}
                    data-testid="input-client-name"
                    placeholder="Name of Client"
                    className="border-b border-gray-500 flex-1 text-sm focus:outline-none focus:border-primary bg-transparent italic"
                  />
                  <span className="text-xs italic shrink-0">(Name of Client)</span>
                </span>
                <span className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-sm shrink-0">of</span>
                  <input
                    {...form.register(`${prefix}.clientAddress`)}
                    data-testid="input-client-address"
                    placeholder="Address of Client"
                    className="border-b border-gray-500 flex-1 text-sm focus:outline-none focus:border-primary bg-transparent italic"
                  />
                </span>
                <span className="text-xs italic block">(Address of Client)</span>
                <span className="text-sm block mt-1">
                  (hereinafter referred to as the "Client" or "You" which expression shall wherever the context admits include its
                  legal representatives/successors-in-title and permitted assigns) of the first part.
                </span>
              </p>
              <p className="mb-1"><strong>And</strong></p>
              <p className="mb-3">
                Alpha10 Fund Management Limited, a company duly incorporated under the Companies and Allied Matters Act, 1990
                and having its registered office at 13 Mambolo Street, Zone 2, Wuse, Abuja (hereinafter referred to as the
                "Fund/Portfolio Manager" or "Alpha10" or "Firm" which expression shall wherever the context so admits include
                its successors-in-title and permitted assigns) of the second part.
              </p>

              <p className="mb-2"><strong>WHEREAS:</strong></p>
              <p className="mb-2">Alpha10 is a registered Fund/Portfolio Manager duly licensed by the Securities and Exchange Commission (SEC).</p>
              <p className="mb-2">The Client hereby appoints the Fund/Portfolio Manager to provide fund management services, and the Fund/Portfolio Manager has agreed to render the services and manage the Client's investments in accordance with the Securities and Exchange Commission (SEC) rules.</p>
              <p className="mb-3">The Parties have decided to enter into this Agreement for the purpose of setting out the terms and conditions which will govern the relationship.</p>

              <p className="mb-2 italic text-xs">Please review this Client Services Agreement ("Agreement") carefully as it sets forth the understanding between you and Alpha10 regarding the services the Firm will provide you.</p>
              <p className="mb-2 italic text-xs">These terms and conditions ("Terms") shall be effective from the date that you accept these terms or the date we commence business with you, whichever is earlier. Terms are legally binding and (subject to amendments, clients will be notified of such changes) will apply on the basis of our relationship with you.</p>
              <p className="mb-2 italic text-xs">We may provide certain services to you or receive instructions from you by means of electronic links or systems and where this is the case, the provision of such services will be subject to the terms of any agreement(s) and disclaimer(s) set out on such electronic links or systems or otherwise notified to you.</p>
              <p className="mb-2 italic text-xs">Without limiting the circumstances in which such agreement(s) and disclaimer(s) are binding on you, they are made binding on you by these Terms. These Terms will also supplement such agreement(s) and disclosure(s) to the extent that they do not conflict with such agreement(s) or disclaimer(s).</p>
              <p className="mb-3 italic text-xs">These Terms together with any other agreement, notice, disclaimers, disclosure or other special terms and conditions shall together constitute the terms of business which shall govern the provision by us to you of any regulated or ancillary activity.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">1. Authority</h5>
              <p className="mb-2">The Client hereby appoints Alpha10 to be the Client's Fund/Portfolio Manager and provide:</p>
              <label className="mb-1 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register(`${prefix}.authorityDiscretionary`)} data-testid="checkbox-authority-discretionary-joint" className="w-3 h-3 accent-primary flex-shrink-0" />
                <span>Discretionary Fund Management Services</span>
              </label>
              <p className="mb-1 pl-5 text-xs">or</p>
              <label className="mb-3 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register(`${prefix}.authorityNonDiscretionary`)} data-testid="checkbox-authority-non-discretionary-joint" className="w-3 h-3 accent-primary flex-shrink-0" />
                <span>Non-discretionary Fund Management Services (Tick Box)</span>
              </label>
              <p className="mb-3">as to the investment account(s) established by Client and managed by Alpha10.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">2. Investment Services</h5>
              <p className="mb-2"><strong>2.1 Discretionary Investment Services</strong></p>
              <p className="mb-2">Alpha10 provides investment services targeted at Qualified Institutional Investors, High-Net-Worth Individuals, and Retail Investors. These services include, without limitation, the management and execution of strategies within Alpha10's product offerings.</p>
              <p className="mb-2">Alpha10 agrees to work with Client or its designated representative to develop appropriate goals, objectives, risk tolerance, and standards for its Products/Services.</p>
              <p className="mb-2">The Client acknowledges and agrees to take responsibility for ensuring that the investment objectives and directives given to Alpha10 are in accordance with applicable law.</p>
              <p className="mb-2">The Client represents that all information given to Alpha10 are accurate and complete, and agrees that Alpha10 may rely on such information in performing its fund management duties hereunder.</p>
              <p className="mb-3">Client acknowledges and agrees to promptly advise Alpha10 of any changes to Client's investment goals or objectives.</p>

              <p className="mb-2"><strong>2.2 Duties of the Fund / Portfolio Manager</strong></p>
              <p className="mb-1">Alpha10 shall have full discretionary authority (except for Non-discretionary services) over the assets under management. The Fund/Portfolio Manager's duties shall include:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Select, acquire, hold, and dispose of investments in accordance with the agreed investment strategy.</li>
                <li>Act in good faith and in the best interests of the Client, exercising care, diligence, and skill.</li>
                <li>Continuously monitor the product performance and make adjustments as necessary to reflect changing market conditions or economic developments.</li>
                <li>Provide periodic performance reports to regulatory authorities and the Client.</li>
                <li>Ensure that all investment activity complies with applicable laws, regulations, and internal risk management policies.</li>
              </ol>

              <p className="mb-2"><strong>2.3 Duties of the Client</strong></p>
              <p className="mb-1">The Client agrees to fulfill the following responsibilities to enable Alpha10 effectively carry out its mandate:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>Provide timely, complete, and accurate information concerning the Client's financial situation, investment objectives, risk tolerance, liquidity needs, and any material changes thereto.</li>
                <li>Inform the Fund/Portfolio Manager in writing of any investment restrictions, prohibited securities or sectors, tax considerations, or other constraints.</li>
                <li>Pay fees and any related expenses in accordance with the terms outlined in the agreement.</li>
                <li>The Client remains solely responsible for all tax obligations arising from investments made on their behalf.</li>
              </ol>

              <h5 className="font-bold text-primary mt-4 mb-2">3. Operation of the Investment Account</h5>
              <p className="mb-2"><strong>3.1 Authority to Operate</strong></p>
              <p className="mb-2">You warrant that you have the necessary authority to open and operate the investment account.</p>
              <p className="mb-2">Alpha10 shall be entitled to rely on, and act in accordance with, instructions received from any person authorized to access or use the investment account by virtue of any authority, resolution, mandate or power of attorney ("authority") provided by you or your nominee to Alpha10.</p>
              <p className="mb-3">You can however cancel such authority in writing, but Alpha10 must have acknowledged such cancellation before it will take effect.</p>

              <p className="mb-2"><strong>3.2 Guardian or Legal Representative Consent (If applicable)</strong></p>
              <p className="mb-1">Where a minor is represented by a parent, guardian, trustee, or legal representative ("Representative"), the following terms apply:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>The Representative warrants that they have the full legal authority to act on behalf of the minor/ward, including authority to enter into this agreement on behalf of the minor.</li>
                <li>The Representative agrees to provide all relevant legal documentation evidencing such authority.</li>
                <li>The Representative must inform the Fund/Portfolio Manager in writing of any change in the legal status, capacity, or authority related to the minor without delay.</li>
                <li>Unless otherwise required by law or revoked in writing by a party with proper authority, this agreement remains in full effect and Alpha10 shall continue to act on instructions assuming the authority of the Representative remains valid.</li>
              </ol>

              <p className="mb-2"><strong>3.3 Instructions</strong></p>
              <p className="mb-2">You agree that instructions must be received by Alpha10 before 1pm on any business day in order for a transaction to be processed on the same day. Instructions received after 1pm will be treated the next business day.</p>
              <p className="mb-2">Instructions received on a weekend or public holiday will be taken as received on the following business day and treated accordingly.</p>
              <p className="mb-2">You are responsible for ensuring that Alpha10 is in receipt of any instruction and that instructions are clear and intelligible.</p>
              <p className="mb-2">Except to the extent that Alpha10 acted with gross negligence or with fraudulent intent, Alpha10 will not be liable for your failure to comply with this clause.</p>
              <p className="mb-3">You agree that Alpha10 shall be entitled, but is not obliged, in its discretion, to confirm or authenticate any instruction which is not given online prior to effecting any transaction.</p>

              <p className="mb-2"><strong>3.4 Payments</strong></p>
              <p className="mb-2">Alpha10 will not effect any payments from the investment account other than to your designated bank account(s) as specified on the application form, or otherwise as notified to Alpha10 in writing and signed by you.</p>
              <p className="mb-2">Provided that Alpha10 did not act with gross negligence or fraudulently, Alpha10 shall not be liable should it refuse to effect a payment otherwise than in accordance with this clause.</p>
              <p className="mb-2">You warrant that the designated bank account(s) details supplied to Alpha10 from time to time are true and correct. You acknowledge that transaction processing may take up to 72 working hours.</p>
              <p className="mb-2">Alpha10 is not liable, nor is it obliged, to verify or authenticate any bank account details supplied by your duly authorized signatory(ies). Except to the extent that Alpha10 acted with gross negligence or fraudulently.</p>
              <p className="mb-3">You indemnify and hold Alpha10 harmless against any loss, damage, expense or claim which you or Alpha10 may sustain or incur as a result of payment(s) made in circumstances where the bank account details are not correct.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">4. Third Party Indemnity</h5>
              <p className="mb-2">Notwithstanding anything contained in these terms and conditions, Alpha10 may in its sole discretion permit payment to a third party.</p>
              <p className="mb-3">You undertake to indemnify Alpha10 and hold it harmless from and against all cost (including without limitation legal fees and expenses), losses, liabilities, claims, damages and proceedings whatsoever that Alpha10 may suffer or incur or that may arise as a result of such third party payment.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">5. Statements</h5>
              <p className="mb-1">Alpha10 shall provide periodic statements to you which will, amongst others:</p>
              <ol className="list-[lower-alpha] pl-5 mb-2 space-y-1">
                <li>show all transactions relating to the investment account; and</li>
                <li>show all interest/profit credited, and charges debited to the investment account.</li>
              </ol>
              <p className="mb-2">You undertake to monitor and verify the correctness of your investment account details on a regular basis and to inform Alpha10 immediately of any errors or inconsistencies in the details.</p>
              <p className="mb-2">Unless you notify Alpha10 of any error or inconsistency within 60 days of the date of issue of the statement, such statement shall be deemed to be an accurate and correct record of your activity on the investment account.</p>
              <p className="mb-3">Any record of deposit to the investment account is subject to verification by Alpha10 and should there be a discrepancy between your records and Alpha10's records, Alpha10 shall constitute sufficient proof of the correctness of Alpha10's contentions and the onus shall be on you to prove otherwise.</p>

              <h5 className="font-bold text-primary mt-4 mb-2">6. Personal Information</h5>
              <p className="mb-1">You acknowledge and expressly consent that Alpha10 may:</p>
              <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
                <li>verify information provided by you to Alpha10 in this application or any other documentation and generally make whatever enquiries it deems necessary from any source whatsoever.</li>
                <li>process your personal information to conclude the agreement and for purposes of maintaining the investment account, providing services to you and complying with your instructions.</li>
                <li>disclose your personal information contained in the application form, and any other documentation in relation to any of your investment accounts to other entities within Alpha10 if you have applied for further accounts, products or services at any other entity within Alpha10.</li>
                <li>process and disclose your personal information for purposes of the prevention, detection and reporting of fraud and criminal activities, the identification of the proceeds of unlawful activities and the combating of money laundering activities.</li>
                <li>process the report on your personal information to comply with an obligation imposed by applicable laws on Alpha10.</li>
              </ol>
            </>
          )}
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
                I/We accept the Terms & Conditions above. *
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </>
  );
}
