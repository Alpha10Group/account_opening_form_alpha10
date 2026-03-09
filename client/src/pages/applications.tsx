import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, User, Users, Building2, Search, Calendar, FileText, LogOut, Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";
import logoImg from "@assets/LOGO3_1770589302028.JPG";
import type { Application } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

function ApplicationDetail({ application, onBack }: { application: Application; onBack: () => void }) {
  const d = application.formData as Record<string, any>;
  const accountType = application.accountType;

  const idTypeLabels: Record<string, string> = {
    national_id: "National ID",
    drivers_license: "Driver's License",
    international_passport: "International Passport",
    voters_card: "Voter's Card",
  };

  const renderFile = (url?: string, testId?: string) => {
    if (!url) return <span className="text-muted-foreground italic text-sm">Not uploaded</span>;
    const isPdf = url.endsWith(".pdf");
    return isPdf ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm" data-testid={testId ?? "link-uploaded-file"}>View PDF</a>
    ) : (
      <img src={url} alt="Uploaded" className="max-h-24 max-w-[180px] rounded-md object-contain border" data-testid={testId ?? "img-uploaded-file"} />
    );
  };

  const Field = ({ label, value }: { label: string; value: any }) => {
    const renderVal = (v: any): React.ReactNode => {
      if (v === null || v === undefined || v === "") return <span className="text-muted-foreground italic">—</span>;
      if (typeof v === "boolean") return <span>{v ? "Yes" : "No"}</span>;
      if (typeof v === "string" && v.startsWith("/api/uploads/")) return renderFile(v);
      return <span>{String(v)}</span>;
    };
    return (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <div className="text-sm font-medium break-words">{renderVal(value)}</div>
      </div>
    );
  };

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </Card>
  );

  const SectionCardFull = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide border-b pb-2">{title}</h3>
      {children}
    </Card>
  );

  const ps = (d.productsServices || {}) as Record<string, any>;
  const decl = (d.declarations || {}) as Record<string, any>;

  const declItems: { label: string; key: string }[] = [
    { label: "At Least 18 Years", key: "declareAtLeast18" },
    { label: "Minimum Investment Period", key: "declareMinInvestmentPeriod" },
    { label: "Application on Own Behalf", key: "declareApplicationOnOwnBehalf" },
    { label: "E-Statement Risk Accepted", key: "declareEstatementRisk" },
    { label: "Material Change Accepted", key: "declareMaterialChange" },
    { label: "Past Performance Accepted", key: "declarePastPerformance" },
    { label: "Information is Complete", key: "declareInfoComplete" },
    { label: "Indemnity Accepted", key: "indemnityAccepted" },
    { label: "Terms & Conditions Accepted", key: "termsAccepted" },
  ];

  const productsMap: { key: string; label: string }[] = [
    { key: "mutualFunds", label: "Mutual Funds" },
    { key: "discretionaryForeign", label: "Discretionary Foreign" },
    { key: "shariaCompliant", label: "Sharia Compliant" },
    { key: "separatelyManaged", label: "Separately Managed" },
    { key: "nonDiscretionary", label: "Non-Discretionary" },
    { key: "discretionaryNGN", label: "Discretionary NGN" },
    { key: "securitiesTrading", label: "Securities Trading" },
  ];

  return (
    <div>
      <Button variant="outline" size="sm" className="mb-4 gap-2" onClick={onBack} data-testid="button-back-list">
        <ArrowLeft className="w-4 h-4" /> Back to Applications
      </Button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="text-xl font-bold" data-testid="text-detail-ref">{application.referenceNumber}</h2>
        <Badge variant={application.status === "approved" ? "default" : application.status === "rejected" ? "destructive" : "secondary"} data-testid="badge-detail-status" className="capitalize">
          {application.status}
        </Badge>
        <Badge variant="outline" className="capitalize" data-testid="badge-detail-type">{application.accountType}</Badge>
        <span className="text-xs text-muted-foreground ml-auto">
          Submitted {new Date(application.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="space-y-4">

        {/* ── INDIVIDUAL ── */}
        {accountType === "individual" && (
          <>
            {d.passportPhotoUrl && (
              <div className="flex justify-center">
                <img src={d.passportPhotoUrl} alt="Passport Photo" className="h-28 w-28 object-cover rounded-full border-2 border-primary/30" data-testid="img-passport-photo" />
              </div>
            )}

            <SectionCard title="Personal Information">
              <Field label="Title" value={d.title} />
              <Field label="Surname" value={d.surname} />
              <Field label="First Name" value={d.firstName} />
              <Field label="Other Names" value={d.otherNames} />
              <Field label="Date of Birth" value={d.dateOfBirth} />
              <Field label="Place of Birth" value={d.placeOfBirth} />
              <Field label="Gender" value={d.gender} />
              <Field label="Marital Status" value={d.maritalStatus} />
              <Field label="Nationality" value={d.nationality} />
              <Field label="Country of Residence" value={d.countryOfResidence} />
              <Field label="State of Origin" value={d.stateOfOrigin} />
              <Field label="Local Government" value={d.localGovernment} />
              <Field label="Home Town" value={d.homeTown} />
              <Field label="Religion" value={d.religion} />
              <Field label="Mother's Maiden Name" value={d.motherMaidenName} />
            </SectionCard>

            <SectionCard title="Contact Details">
              <Field label="Residential Address" value={d.residentialAddress} />
              <Field label="City" value={d.city} />
              <Field label="State" value={d.state} />
              <Field label="Country" value={d.country} />
              <Field label="Mailing Address" value={d.mailingAddress} />
              <Field label="Mailing City" value={d.mailingCity} />
              <Field label="Mailing State" value={d.mailingState} />
              <Field label="Mailing Country" value={d.mailingCountry} />
              <Field label="Phone Number" value={d.phoneNumber} />
              <Field label="Alternative Phone" value={d.alternativePhone} />
              <Field label="Email" value={d.email} />
              <Field label="Preferred Communication" value={d.preferredCommunication} />
            </SectionCard>

            <SectionCard title="Identification">
              <Field label="ID Type" value={idTypeLabels[d.identificationType] ?? d.identificationType} />
              <Field label="ID Number" value={d.identificationNumber} />
              <Field label="Issue Date" value={d.identificationIssueDate} />
              <Field label="Expiry Date" value={d.identificationExpiryDate} />
              <Field label="BVN" value={d.bvn} />
              <Field label="TIN" value={d.tin} />
            </SectionCard>

            <SectionCardFull title="Documents">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">ID Document</p>
                  {renderFile(d.idDocumentUrl, "img-id-document")}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Proof of Address</p>
                  {renderFile(d.proofOfAddressUrl, "img-proof-address")}
                </div>
              </div>
            </SectionCardFull>

            <SectionCard title="Employment & Financial">
              <Field label="Employment Status" value={d.employmentStatus} />
              <Field label="Employer Name" value={d.employerName} />
              <Field label="Employer Address" value={d.employerAddress} />
              <Field label="Occupation" value={d.occupation} />
              <Field label="Annual Income" value={d.annualIncome} />
              <Field label="Source of Funds" value={d.sourceOfFunds} />
            </SectionCard>

            <SectionCard title="Account Details">
              <Field label="Account Currency" value={d.accountCurrency} />
              <Field label="Account Purpose" value={d.accountPurpose} />
              <Field label="Initial Deposit Amount" value={d.initialDepositAmount} />
            </SectionCard>

            <SectionCard title="Bank Details">
              <Field label="Primary Bank" value={d.primaryBankName} />
              <Field label="Primary Account Number" value={d.primaryAccountNumber} />
              <Field label="Primary Account Name" value={d.primaryAccountName} />
              <Field label="Primary Sort Code" value={d.primarySortCode} />
              <Field label="Secondary Bank" value={d.secondaryBankName} />
              <Field label="Secondary Account Number" value={d.secondaryAccountNumber} />
              <Field label="Secondary Account Name" value={d.secondaryAccountName} />
              <Field label="Secondary Sort Code" value={d.secondarySortCode} />
            </SectionCard>

            <SectionCard title="Next of Kin">
              <Field label="Full Name" value={d.nextOfKinFullName} />
              <Field label="Relationship" value={d.nextOfKinRelationship} />
              <Field label="Phone" value={d.nextOfKinPhone} />
              <Field label="Address" value={d.nextOfKinAddress} />
              <Field label="Email" value={d.nextOfKinEmail} />
              <Field label="Date of Birth" value={d.nextOfKinDateOfBirth} />
              <Field label="Gender" value={d.nextOfKinGender} />
            </SectionCard>
          </>
        )}

        {/* ── JOINT ── */}
        {accountType === "joint" && (
          <>
            <SectionCard title="Account Information">
              <Field label="Account Name" value={d.accountName} />
              <Field label="Account Currency" value={d.accountCurrency} />
              <Field label="Account Purpose" value={d.accountPurpose} />
              <Field label="Operating Mandate" value={d.operatingMandate} />
            </SectionCard>

            {(["primaryHolder", "secondaryHolder"] as const).map((holderKey, idx) => {
              const h = (d[holderKey] || {}) as Record<string, any>;
              return (
                <Card key={holderKey} className="p-5">
                  <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide border-b pb-2">
                    {idx === 0 ? "Primary Account Holder" : "Secondary Account Holder"}
                  </h3>
                  {h.passportPhotoUrl && (
                    <div className="flex justify-center mb-4">
                      <img src={h.passportPhotoUrl} alt="Passport" className="h-20 w-20 object-cover rounded-full border-2 border-primary/30" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Field label="Title" value={h.title} />
                    <Field label="Surname" value={h.surname} />
                    <Field label="First Name" value={h.firstName} />
                    <Field label="Other Names" value={h.otherNames} />
                    <Field label="Date of Birth" value={h.dateOfBirth} />
                    <Field label="Place of Birth" value={h.placeOfBirth} />
                    <Field label="Gender" value={h.gender} />
                    <Field label="Marital Status" value={h.maritalStatus} />
                    <Field label="Nationality" value={h.nationality} />
                    <Field label="State of Origin" value={h.stateOfOrigin} />
                    <Field label="Mother's Maiden Name" value={h.motherMaidenName} />
                    <Field label="Phone Number" value={h.phoneNumber} />
                    <Field label="Email" value={h.email} />
                    <Field label="Residential Address" value={h.residentialAddress} />
                    <Field label="City" value={h.city} />
                    <Field label="State" value={h.state} />
                    <Field label="Country" value={h.country} />
                    <Field label="ID Type" value={idTypeLabels[h.identificationType] ?? h.identificationType} />
                    <Field label="ID Number" value={h.identificationNumber} />
                    <Field label="ID Issue Date" value={h.identificationIssueDate} />
                    <Field label="ID Expiry Date" value={h.identificationExpiryDate} />
                    <Field label="BVN" value={h.bvn} />
                    <Field label="TIN" value={h.tin} />
                    <Field label="Occupation" value={h.occupation} />
                    <Field label="Employer Name" value={h.employerName} />
                    <Field label="Employer Address" value={h.employerAddress} />
                    <Field label="Annual Income" value={h.annualIncome} />
                    <Field label="Source of Funds" value={h.sourceOfFunds} />
                  </div>
                  {h.idDocumentUrl && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground font-medium mb-2">ID Document</p>
                      {renderFile(h.idDocumentUrl)}
                    </div>
                  )}
                </Card>
              );
            })}

            <SectionCard title="Bank Details">
              <Field label="Primary Bank" value={d.primaryBankName} />
              <Field label="Primary Account Number" value={d.primaryAccountNumber} />
              <Field label="Primary Account Name" value={d.primaryAccountName} />
              <Field label="Primary Sort Code" value={d.primarySortCode} />
              <Field label="Secondary Bank" value={d.secondaryBankName} />
              <Field label="Secondary Account Number" value={d.secondaryAccountNumber} />
              <Field label="Secondary Account Name" value={d.secondaryAccountName} />
              <Field label="Secondary Sort Code" value={d.secondarySortCode} />
            </SectionCard>

            <SectionCard title="Next of Kin">
              <Field label="Full Name" value={d.nextOfKinFullName} />
              <Field label="Relationship" value={d.nextOfKinRelationship} />
              <Field label="Phone" value={d.nextOfKinPhone} />
              <Field label="Address" value={d.nextOfKinAddress} />
              <Field label="Email" value={d.nextOfKinEmail} />
              <Field label="Date of Birth" value={d.nextOfKinDateOfBirth} />
            </SectionCard>

            {d.proofOfAddressUrl && (
              <SectionCardFull title="Documents">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Proof of Address</p>
                  {renderFile(d.proofOfAddressUrl, "img-proof-address")}
                </div>
              </SectionCardFull>
            )}
          </>
        )}

        {/* ── CORPORATE ── */}
        {accountType === "corporate" && (
          <>
            {d.companyLogoUrl && (
              <div className="flex justify-center">
                <img src={d.companyLogoUrl} alt="Company Logo" className="h-24 w-24 object-contain rounded-md border" data-testid="img-company-logo" />
              </div>
            )}

            <SectionCard title="Company Information">
              <Field label="Company Name" value={d.companyName} />
              <Field label="RC Number" value={d.rcNumber} />
              <Field label="Date of Incorporation" value={d.dateOfIncorporation} />
              <Field label="Tax Identification Number" value={d.taxIdentificationNumber} />
              <Field label="Nature of Business" value={d.businessNature} />
              <Field label="Registered Address" value={d.registeredAddress} />
              <Field label="Operating Address" value={d.operatingAddress} />
              <Field label="City" value={d.city} />
              <Field label="State" value={d.state} />
              <Field label="Country" value={d.country} />
              <Field label="Phone" value={d.companyPhone} />
              <Field label="Email" value={d.companyEmail} />
              <Field label="Website" value={d.website} />
            </SectionCard>

            <SectionCard title="Account Details">
              <Field label="Account Currency" value={d.accountCurrency} />
              <Field label="Account Purpose" value={d.accountPurpose} />
              <Field label="Expected Monthly Turnover" value={d.expectedMonthlyTurnover} />
              <Field label="Source of Funds" value={d.sourceOfFunds} />
              <Field label="Initial Deposit Amount" value={d.initialDepositAmount} />
            </SectionCard>

            <SectionCard title="Bank Details">
              <Field label="Primary Bank" value={d.primaryBankName} />
              <Field label="Primary Account Number" value={d.primaryAccountNumber} />
              <Field label="Primary Account Name" value={d.primaryAccountName} />
              <Field label="Primary Sort Code" value={d.primarySortCode} />
              <Field label="Secondary Bank" value={d.secondaryBankName} />
              <Field label="Secondary Account Number" value={d.secondaryAccountNumber} />
              <Field label="Secondary Account Name" value={d.secondaryAccountName} />
              <Field label="Secondary Sort Code" value={d.secondarySortCode} />
            </SectionCard>

            <SectionCardFull title="Directors">
              <div className="space-y-4">
                {((d.directors || []) as Record<string, any>[]).map((dir, i) => (
                  <Card key={i} className="p-4 bg-muted/30" data-testid={`card-director-${i}`}>
                    <p className="text-xs font-semibold text-muted-foreground mb-3">Director {i + 1}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Field label="Full Name" value={dir.fullName} />
                      <Field label="Designation" value={dir.designation} />
                      <Field label="Date of Birth" value={dir.dateOfBirth} />
                      <Field label="Nationality" value={dir.nationality} />
                      <Field label="Residential Address" value={dir.residentialAddress} />
                      <Field label="Phone" value={dir.phoneNumber} />
                      <Field label="Email" value={dir.email} />
                      <Field label="BVN" value={dir.bvn} />
                      <Field label="ID Type" value={idTypeLabels[dir.identificationType] ?? dir.identificationType} />
                      <Field label="ID Number" value={dir.identificationNumber} />
                    </div>
                    {dir.passportPhotoUrl && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground font-medium mb-2">Passport Photo</p>
                        {renderFile(dir.passportPhotoUrl)}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </SectionCardFull>

            <SectionCardFull title="Signatories">
              <div className="space-y-4">
                {((d.signatories || []) as Record<string, any>[]).map((sig, i) => (
                  <Card key={i} className="p-4 bg-muted/30" data-testid={`card-signatory-${i}`}>
                    <p className="text-xs font-semibold text-muted-foreground mb-3">Signatory {i + 1}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Field label="Full Name" value={sig.fullName} />
                      <Field label="Designation" value={sig.designation} />
                      <Field label="Phone" value={sig.phoneNumber} />
                      <Field label="Email" value={sig.email} />
                      <Field label="BVN" value={sig.bvn} />
                      <Field label="ID Type" value={idTypeLabels[sig.identificationType] ?? sig.identificationType} />
                      <Field label="ID Number" value={sig.identificationNumber} />
                      <Field label="Signature Mandate" value={sig.signatureMandate} />
                    </div>
                    {sig.signatureFileUrl && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground font-medium mb-2">Signature</p>
                        {renderFile(sig.signatureFileUrl)}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </SectionCardFull>

            <SectionCard title="Operating Mandate">
              <Field label="Mandate Type" value={d.operatingMandate} />
            </SectionCard>

            <SectionCardFull title="Corporate Documents">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">CAC Document</p>
                  {renderFile(d.cacDocumentUrl, "img-cac")}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Memorandum &amp; Articles</p>
                  {renderFile(d.memorandumUrl, "img-memorandum")}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Board Resolution</p>
                  {renderFile(d.boardResolutionUrl, "img-board-resolution")}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Proof of Address</p>
                  {renderFile(d.proofOfAddressUrl, "img-proof-address")}
                </div>
              </div>
            </SectionCardFull>
          </>
        )}

        {/* ── PRODUCTS & SERVICES – all types ── */}
        <SectionCardFull title="Products & Services">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsMap.map(({ key, label }) => {
              const val = ps[key];
              if (!val || (Array.isArray(val) && val.length === 0)) return null;
              return (
                <div key={key}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{label}</p>
                  <p className="text-sm">{Array.isArray(val) ? val.join(", ") : String(val)}</p>
                </div>
              );
            })}
            {ps.incomeDistribution && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Income Distribution</p>
                <p className="text-sm">{ps.incomeDistribution}</p>
              </div>
            )}
            {ps.initialInvestmentAmount && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Initial Investment Amount</p>
                <p className="text-sm">{ps.initialInvestmentAmount}</p>
              </div>
            )}
            {ps.clientRiskProfile && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Client Risk Profile</p>
                <p className="text-sm capitalize">{ps.clientRiskProfile}</p>
              </div>
            )}
            {ps.advisoryServices && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Advisory Services</p>
                <p className="text-sm">{ps.advisoryServices}</p>
              </div>
            )}
            {ps.registrarLiaisonServices && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Registrar Liaison Services</p>
                <p className="text-sm">Yes</p>
              </div>
            )}
            {ps.othersSelected && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Other Services</p>
                <p className="text-sm">{ps.othersDescription || "Yes"}</p>
              </div>
            )}
          </div>
        </SectionCardFull>

        {/* ── DECLARATIONS & SIGNATURES – all types ── */}
        <SectionCardFull title="Declarations & Signatures">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {declItems.map(({ label, key }) => (
                <div key={key} className="flex items-center gap-2" data-testid={`decl-${key}`}>
                  <span className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 text-[10px] font-bold ${decl[key] ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground text-transparent"}`}>
                    ✓
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Politically Exposed Person</p>
                <p className="text-sm font-medium">{decl.isPoliticallyExposed === "yes" ? "Yes" : "No"}</p>
                {decl.pepDetails && <p className="text-xs text-muted-foreground mt-1">{decl.pepDetails}</p>}
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">FATCA Applicable</p>
                <p className="text-sm font-medium">{decl.isFatcaApplicable === "yes" ? "Yes" : "No"}</p>
                {decl.fatcaCountry && <p className="text-xs text-muted-foreground mt-1">Country: {decl.fatcaCountry}</p>}
                {decl.fatcaTin && <p className="text-xs text-muted-foreground mt-1">TIN: {decl.fatcaTin}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">Signature</p>
                <p className="text-sm font-medium">{decl.signatureName || "—"}</p>
                {decl.signatureDate && <p className="text-xs text-muted-foreground mt-0.5">{decl.signatureDate}</p>}
                {decl.signatureFileUrl && <div className="mt-2">{renderFile(decl.signatureFileUrl, "img-signature-1")}</div>}
              </div>
              {decl.secondSignatureName && (
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Second Signature</p>
                  <p className="text-sm font-medium">{decl.secondSignatureName}</p>
                  {decl.secondSignatureDate && <p className="text-xs text-muted-foreground mt-0.5">{decl.secondSignatureDate}</p>}
                  {decl.secondSignatureFileUrl && <div className="mt-2">{renderFile(decl.secondSignatureFileUrl, "img-signature-2")}</div>}
                </div>
              )}
            </div>
          </div>
        </SectionCardFull>

      </div>
    </div>
  );
}

function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (pwd: string) => {
      const res = await apiRequest("POST", "/api/admin/login", { password: pwd });
      return res.json();
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: Error) => {
      const msg = error.message.startsWith("429")
        ? "Too many login attempts. Please wait 15 minutes and try again."
        : error.message.startsWith("500")
        ? "Server error — the admin password may not be configured yet. Please try again shortly."
        : "Invalid admin password. Please try again.";
      toast({ title: "Login Failed", description: msg, variant: "destructive" });
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      loginMutation.mutate(password);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src={logoImg} alt="Alpha10" className="w-14 h-14 rounded-md object-contain mb-3" />
          <h2 className="text-lg font-semibold">Admin Access</h2>
          <p className="text-sm text-muted-foreground text-center mt-1">Enter the admin password to view submitted applications.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              data-testid="input-admin-password"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending} data-testid="button-login">
            {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground" data-testid="button-back-home-login">Back to Portal</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function Applications() {
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: authStatus, isLoading: authLoading } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/status"],
    queryFn: async () => {
      const res = await fetch("/api/admin/status", { credentials: "include" });
      return res.json();
    },
  });

  const isAuthed = authStatus?.authenticated === true;

  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    enabled: isAuthed,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/logout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
      toast({ title: "Logged out", description: "You have been logged out." });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-3" />
          <p className="text-sm text-muted-foreground">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <AdminLoginForm
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
        }}
      />
    );
  }

  const filtered = applications?.filter((app) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const formData = app.formData as Record<string, any>;
    return (
      app.referenceNumber.toLowerCase().includes(q) ||
      app.accountType.toLowerCase().includes(q) ||
      app.status.toLowerCase().includes(q) ||
      formData?.surname?.toLowerCase().includes(q) ||
      formData?.firstName?.toLowerCase().includes(q) ||
      formData?.companyName?.toLowerCase().includes(q) ||
      formData?.accountName?.toLowerCase().includes(q)
    );
  });

  const typeIcon = (type: string) => {
    if (type === "individual") return <User className="w-4 h-4" />;
    if (type === "joint") return <Users className="w-4 h-4" />;
    return <Building2 className="w-4 h-4" />;
  };

  const getApplicantName = (app: Application) => {
    const d = app.formData as Record<string, any>;
    if (app.accountType === "individual") return `${d.firstName || ""} ${d.surname || ""}`.trim();
    if (app.accountType === "joint") return d.accountName || "Joint Account";
    return d.companyName || "Corporate Account";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Alpha10" className="w-10 h-10 rounded-md object-contain" />
            <div>
              <h1 className="text-lg font-semibold leading-tight">Alpha10</h1>
              <p className="text-xs text-muted-foreground">Applications Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-back-home">Back to Portal</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {selectedApp ? (
          <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold" data-testid="text-dashboard-title">Submitted Applications</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {applications?.length || 0} total applications
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, reference, type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-4 animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/4" />
                  </Card>
                ))}
              </div>
            ) : filtered && filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((app) => (
                  <Card
                    key={app.id}
                    className="p-4 hover-elevate cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                    data-testid={`card-application-${app.id}`}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          {typeIcon(app.accountType)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" data-testid={`text-name-${app.id}`}>{getApplicantName(app)}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <code className="text-xs text-muted-foreground" data-testid={`text-ref-${app.id}`}>{app.referenceNumber}</code>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(app.createdAt).toLocaleDateString("en-NG")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">{app.accountType}</Badge>
                        <Badge variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"} className="capitalize" data-testid={`badge-status-${app.id}`}>
                          {app.status}
                        </Badge>
                        <Button variant="ghost" size="icon" data-testid={`button-view-${app.id}`}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium">No applications found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {search ? "Try adjusting your search terms." : "Applications will appear here once submitted."}
                </p>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
