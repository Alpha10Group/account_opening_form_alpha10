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

      <FormSection title="Terms and Conditions" description="Please read and accept the Client Services Agreement">
        <div className="max-h-96 overflow-y-auto p-4 rounded-md bg-muted/50 text-sm text-muted-foreground mb-4 leading-relaxed border" data-testid="terms-content">
          <h4 className="font-bold text-foreground mb-3 text-base">TERMS AND CONDITIONS</h4>
          <p className="mb-3">
            This AGREEMENT is made between the Client (hereinafter referred to as the "Client" or "You" which expression
            shall wherever the context admits include its legal representatives/successors-in-title and permitted assigns) of
            the first part, and <strong>Alpha10 Fund Management Limited</strong>, a company duly incorporated under the Companies and Allied Matters Act
            1990 and having its registered office at 13 Mambolo Street, Zone 2, Wuse, Abuja (hereinafter referred to as the
            "Fund/Portfolio Manager" or "Alpha10" or "Firm") of the second part.
          </p>

          <p className="mb-2"><strong>WHEREAS:</strong></p>
          <ol className="list-decimal pl-5 mb-3 space-y-1">
            <li>Alpha10 is a registered Fund/Portfolio Manager duly licensed by the Securities and Exchange Commission (SEC).</li>
            <li>The Client hereby appoints the Fund/Portfolio Manager to provide fund management services, and the Fund/Portfolio Manager has agreed to render the services and manage the Client's investments in accordance with the Securities and Exchange Commission (SEC) rules.</li>
            <li>The Parties have decided to enter into this Agreement for the purpose of setting out the terms and conditions which will govern the relationship.</li>
          </ol>

          <p className="mb-3 italic text-xs">
            Please review this Client Services Agreement ("Agreement") carefully as it sets forth the understanding between you and
            Alpha10 regarding the services the Firm will provide you. These terms and conditions "Terms" shall be effective from
            the date that you accept these terms or the date we commenced business with you, whichever is earlier.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">1. Authority</h5>
          <p className="mb-3">
            The Client hereby appoints Alpha10 to be the Client's Fund/Portfolio Manager and provide Discretionary Fund Management Services
            or Non-discretionary Fund Management Services as to the investment account(s) established by Client and managed by Alpha10.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">2. Investment Services</h5>
          <p className="mb-2"><strong>2.1. Discretionary Investment Services</strong></p>
          <p className="mb-3">
            Alpha10 provides investment services targeted at Qualified Institutional Investors, High-Net-Worth Individuals, and Retail
            Investors. These services include, without limitation, the management and execution of strategies within Alpha10's
            product offerings. Alpha10 agrees to work with Client or its designated representative to develop appropriate goals,
            objectives, risk tolerance, and standards for its Products/Services.
          </p>
          <p className="mb-2"><strong>2.2. Duties of the Fund/Portfolio Manager</strong></p>
          <p className="mb-1">Alpha10 shall have full discretionary authority (except for Non-discretionary services) over the assets under management. The Fund/Portfolio Manager's duties shall include:</p>
          <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
            <li>Select, acquire, hold, and dispose of investments in accordance with the agreed investment strategy.</li>
            <li>Act in good faith and in the best interests of the Client, exercising care, diligence, and skill.</li>
            <li>Continuously monitor the product performance and make adjustments as necessary to reflect changing market conditions, or economic developments.</li>
            <li>Provide periodic performance reports to regulatory authorities and the Client.</li>
            <li>Ensure that all investment activity complies with applicable laws, regulations, and internal risk management policies.</li>
          </ol>
          <p className="mb-2"><strong>2.3. Duties of the Client</strong></p>
          <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
            <li>Provide timely, complete, and accurate information concerning the Client's financial situation, investment objectives, risk tolerance, liquidity needs, and any material changes thereto.</li>
            <li>Inform the Fund/Portfolio Manager in writing of any investment restrictions, prohibited securities or sectors, tax considerations, or other constraints.</li>
            <li>Pay fees and any related expenses in accordance with the terms outlined in the agreement.</li>
            <li>The Client remains solely responsible for all tax obligations arising from investments made on their behalf.</li>
          </ol>

          <h5 className="font-bold text-foreground mt-4 mb-2">3. Operation of the Investment Account</h5>
          <p className="mb-2"><strong>3.1. Authority to operate</strong></p>
          <p className="mb-3">
            You warrant that you have the necessary authority to open and operate the investment account.
            Alpha10 shall be entitled to rely on, and act in accordance with, instructions received from any person authorized
            or purportedly authorized to access or use the investment account.
          </p>
          <p className="mb-2"><strong>3.2. Guardian or Legal Representative Consent (if applicable)</strong></p>
          <p className="mb-3">
            Where a minor is represented by a parent, guardian, trustee, or legal representative ("Representative"),
            the Representative warrants that they have the full legal authority to act on behalf of the minor/ward,
            including authority to enter into this agreement on behalf of the minor.
          </p>
          <p className="mb-2"><strong>3.3. Instructions</strong></p>
          <p className="mb-3">
            You agree that instructions must be received by Alpha10 before 1pm on any business day in order for a transaction
            to be processed on the same day. Instructions received after 1pm will be treated the next business day.
            Instructions received on a weekend or public holiday will be taken as received on the following business day.
          </p>
          <p className="mb-2"><strong>3.4. Payments</strong></p>
          <p className="mb-3">
            Alpha10 will not effect any payments from the investment account other than to your designated bank account(s)
            as specified on the application form, or otherwise as notified to Alpha10 in writing and signed by you.
            You acknowledge that transaction processing may take up to 72 working hours.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">4. Third Party Indemnity</h5>
          <p className="mb-3">
            Alpha10 may in its sole discretion permit payment to a third party, subject to you waiving any claim
            you may have or acquire against Alpha10 as a result. You hereby undertake to indemnify Alpha10 and hold it harmless from
            and against all costs whatsoever that Alpha10 may suffer or incur as a result of such third party payment.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">5. Statements</h5>
          <p className="mb-3">
            Alpha10 shall provide periodic statements to you showing all transactions relating to the investment account,
            all interest/profit credited, and charges debited. Unless you notify Alpha10 of any error or inconsistency
            within 60 days of the date of issue of the statement, such statement shall be deemed to be an accurate and
            correct record of your activity on the investment account.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">6. Personal Information</h5>
          <p className="mb-3">
            You acknowledge and expressly consent that Alpha10 may: verify information provided by you; process your personal
            information to conclude the agreement and maintain the investment account; disclose your personal information
            to other entities within Alpha10 for compliance purposes; and process and disclose your personal information for
            the prevention, detection and reporting of fraud, money laundering, and criminal activities.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">7. Interest/Profit Payment</h5>
          <p className="mb-3">
            Interest/Profit on investment shall be paid upfront, periodically, or with the investment principal at maturity,
            in line with Product selection or as agreed with the Client.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">8. Liquidation Notice</h5>
          <p className="mb-3">Liquidation instructions would be processed within 24 hours of receipt.</p>

          <h5 className="font-bold text-foreground mt-4 mb-2">9. Charges Payable</h5>
          <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
            <li>Premature liquidation of investment is allowed, subject to application of a penalty of 25% or 35% of accrued interest/profit on the total investment amount, depending on the Product/Service.</li>
            <li>Penalty on upfront interest/profit already paid will be deducted from the principal before payment, where outstanding accrued interest/profit is not sufficient to offset the total penal charge.</li>
          </ol>

          <h5 className="font-bold text-foreground mt-4 mb-2">10. Rollover Instruction</h5>
          <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
            <li>Upon maturity of investment, in the absence of any instructions to the contrary from you, principal plus accrued interest/profit will be rolled over at the prevailing market rate and for your last advised tenor.</li>
            <li>Any adjustment to the automatic rollover will be subjected to investment terms and conditions and to pre-liquidation charge where applicable.</li>
          </ol>

          <h5 className="font-bold text-foreground mt-4 mb-2">11. Withholding Tax (WHT) Deduction</h5>
          <p className="mb-3">
            All interest/profit earned is subject to a regulatory 10% withholding tax (WHT) deduction, where applicable.
            WHT on penal interests/profits already paid will not be refunded.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">12. Dealing & Advice</h5>
          <p className="mb-3">
            You may instruct us in writing (including electronically), to dispose of or acquire any financial product.
            Subject to these terms and the relevant Alpha10 best execution arrangements, we shall use all reasonable
            endeavors to carry out your request but shall be under no liability for any loss or expense you incur by reason
            of any delay or any change in market conditions before the transaction is effected.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">13. Fund/Portfolio Manager Liability</h5>
          <p className="mb-3">
            The Fund/Portfolio Manager is prohibited from disclaiming responsibility for losses of investments due to breach of
            the terms of this agreement, fraud, bad faith, gross negligence or willful default. The Client shall indemnify and
            hold harmless the Fund/Portfolio Manager from claims incurred in carrying out its responsibilities, provided that
            it acted in good faith and in a manner reasonably believed to be in the best interests of the Client.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">14. Email Indemnity</h5>
          <p className="mb-3">
            While Alpha10 may take internal measures to verify electronic communications, you hereby request and authorize Alpha10
            as well as any of its affiliates or subsidiaries to accept and act upon any instructions, communications and documents
            you send electronically by e-mail and letters issued according to your mandate. You agree that your e-statement can
            be sent at your risk to the correspondence address/email that you have provided. You also authorize Alpha10 to honor
            redemption requests and instruction sent by electronic mail in respect of your investment with Alpha10.
          </p>
          <p className="mb-3">
            You hereby irrevocably undertake to indemnify Alpha10 and hold it harmless from and against all cost (including without
            limitation legal fees and expenses, losses, liabilities, claims, damages and proceedings) whatsoever that Alpha10 may
            suffer or incur or that may arise as a result of Alpha10's accepting or acting upon such electronic instructions or
            communication. Furthermore, you hereby irrevocably release Alpha10 from all liability in the event that any email or
            letter is not received, or incomplete, unauthorized, or delayed for any reason.
          </p>
          <p className="mb-2"><strong>14.1. You acknowledge and agree that:</strong></p>
          <ol className="list-[lower-alpha] pl-5 mb-3 space-y-1">
            <li>It is at the discretion of Alpha10 to use available resources to verify the authenticity of all instructions received electronically which is not limited to the information in the account opening/update forms.</li>
            <li>Alpha10 may, notwithstanding this release and indemnity, require that any instruction given by you be given in accordance with the signing arrangements of the account(s), and Alpha10 may at its sole discretion request written or any other form of confirmation of any instruction.</li>
            <li>Alpha10 will not be liable for any loss (consequential or otherwise) incurred by you as a result of Alpha10 acting or declining to act (wholly or in part) on instructions which Alpha10 believes to have been given in conformity with the above, whether or not such instructions have been so given.</li>
            <li>Alpha10 may at any time on written notice sent to you withdraw from these arrangements regarding accepting instructions.</li>
            <li>This email indemnity remains an obligation to you and is subject to changes notified by Alpha10 from time to time.</li>
          </ol>

          <h5 className="font-bold text-foreground mt-4 mb-2">15. Force Majeure</h5>
          <p className="mb-3">
            In the event of any failure, interruption or delay in performance of our obligations resulting from acts, events or
            circumstances not reasonably within our control, including but not limited to industrial disputes, acts or regulations
            of any governmental or authorities, or breakdown, failure or malfunction of any telecommunications or computer
            service, we shall not be liable or have any responsibility of any kind for any loss or damage thereby incurred or
            suffered by you.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">16. Governing Law and Dispute Resolution</h5>
          <p className="mb-3">
            These Terms shall be governed by and construed in accordance with the Investments and Securities Act, 2025 (ISA)
            and the rules and regulations of the Securities and Exchanges Commission, 2013 (as amended).
          </p>
          <p className="mb-3">
            In the event of any dispute, complaint, or grievance arising between the Client and the Fund/Portfolio Manager in
            connection with the services provided under this Agreement, the parties shall endeavor to resolve such matters
            amicably in the first instance in accordance with the Fund/Portfolio Manager Complaints Management Policy. The
            Client shall submit a formal complaint to the Fund/Portfolio Manager, detailing the nature of the dispute and
            providing all relevant supporting documentation.
          </p>
          <p className="mb-3">
            If the dispute remains unresolved, it shall be referred to the Securities and Exchange Commission (SEC) Nigeria for
            further adjudication. The SEC may, at its discretion, call for an All Parties Meeting to amicably resolve the dispute
            or escalate the matter to its Administrative Proceedings Committee (APC), which shall conduct a formal hearing in
            accordance with the provisions of the Investments and Securities Act (ISA) and SEC's Rules and Regulations. The APC
            shall issue a decision based on the evidence presented.
          </p>
          <p className="mb-3">
            Any party aggrieved by the decision of the APC may appeal to the Investment and Securities Tribunal (IST), a
            specialized judicial body empowered to review and adjudicate capital market disputes. The IST shall have the
            authority to affirm, reverse, or modify the decision of the APC in accordance with applicable laws and procedures.
          </p>

          <h5 className="font-bold text-foreground mt-4 mb-2">Other Terms and Conditions</h5>
          <p className="mb-2"><strong>Services:</strong> Alpha10 provides various financial services including, without limitation, trading and dealing in all kinds of financial products, investment advisory and investment services and the arrangement of deals in relation to all kinds of financial products. We can also provide other services if so agreed between both parties. Unless we agree otherwise with you, we shall not be responsible for managing or supervising the management of any of your financial products.</p>
          <p className="mb-3"><strong>Set-Off:</strong> To the extent permissible in law, Alpha10 shall be entitled to set off any amount which you owe to Alpha10 from whatsoever cause, against any funds standing to the credit of any of your accounts with Alpha10. Alpha10 will inform you promptly after Alpha10 has effected set-off in respect of any of your accounts.</p>
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
