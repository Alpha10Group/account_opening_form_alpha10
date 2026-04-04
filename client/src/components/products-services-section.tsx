import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "./file-upload";
import FormSection from "./form-section";

interface ProductsServicesSectionProps {
  form: any;
  prefix: string;
}

const NON_DISCRETIONARY_LEFT = ["Commercial Papers", "Promissory Notes", "FGN Treasury Bills"];
const NON_DISCRETIONARY_RIGHT = ["FGN Bond", "Eurobonds", "Sukuk"];

const DISCRETIONARY_FOREIGN = [
  "FX Liquidity Management Investment",
  "FX Liquidity Management Flex",
];

const SHARIA_COMPLIANT = [
  "Mudaraba Investment Note",
  "Kiddies Halal Investment Account",
];

const MUTUAL_FUNDS = [
  "Alpha10 Dollar Fund",
  "Alpha10 Money Market Fund",
  "Alpha10 Halal Fund",
];

const DISCRETIONARY_NGN = [
  "Treasury Backed Investment",
  "Liquidity Management Investment",
  "Liquidity Management Flex",
  "Kiddies Investment Account",
];

const SEPARATELY_MANAGED = [
  "Discretionary Portfolio Management",
  "Non-Discretionary Portfolio Management",
];

const SECURITIES_TRADING = [
  "Execution Only",
  "Trading",
  "Equities Portfolio Management",
  "Transmission",
];

const INVESTMENT_OBJECTIVES = [
  "Capital preservation",
  "Income generation",
  "Capital appreciation",
  "Liquidity",
  "Diversification",
];

function CheckboxItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-1.5">
      <Checkbox
        id={id}
        data-testid={`checkbox-${id}`}
        checked={checked}
        onCheckedChange={(val) => onChange(!!val)}
        className="mt-0.5 shrink-0"
      />
      <label htmlFor={id} className="text-xs leading-tight cursor-pointer">{label}</label>
    </div>
  );
}

function MultiCheckboxField({
  form,
  fieldName,
  options,
  testPrefix,
}: {
  form: any;
  fieldName: string;
  options: string[];
  testPrefix: string;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const currentValues: string[] = field.value || [];
        return (
          <FormItem>
            <div className="space-y-1">
              {options.map((option) => {
                const id = `${testPrefix}-${option.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <CheckboxItem
                    key={option}
                    id={id}
                    label={option}
                    checked={currentValues.includes(option)}
                    onChange={(checked) => {
                      if (checked) {
                        field.onChange([...currentValues, option]);
                      } else {
                        field.onChange(currentValues.filter((v: string) => v !== option));
                      }
                    }}
                  />
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default function ProductsServicesSection({ form, prefix }: ProductsServicesSectionProps) {
  return (
    <FormSection title="Products / Services Required" description="">
      <div className="space-y-4">

        {/* Three-column main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">

          {/* Column 1: Mutual Funds + Asset Management Discretionary NGN */}
          <div className="border-r border-gray-200 p-3 space-y-4">
            {/* Mutual Funds */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">MUTUAL FUNDS</p>
              <MultiCheckboxField form={form} fieldName={`${prefix}.mutualFunds`} options={MUTUAL_FUNDS} testPrefix="mutual-funds" />
              <div className="mt-2">
                <p className="text-xs font-semibold text-primary mb-1">Income Distribution</p>
                <FormField
                  control={form.control}
                  name={`${prefix}.incomeDistribution`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <CheckboxItem
                          id={`${prefix}-income-payment`}
                          label="Payment"
                          checked={field.value === "Payment"}
                          onChange={(checked) => field.onChange(checked ? "Payment" : undefined)}
                        />
                        <CheckboxItem
                          id={`${prefix}-income-reinvestment`}
                          label="Reinvestment"
                          checked={field.value === "Reinvestment"}
                          onChange={(checked) => field.onChange(checked ? "Reinvestment" : undefined)}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Asset Management Discretionary NGN */}
            <div>
              <p className="text-xs font-bold text-primary mb-1">ASSET MANAGEMENT</p>
              <p className="text-xs font-bold text-primary mb-2">DISCRETIONARY OPTIONS (NGN)</p>
              <MultiCheckboxField form={form} fieldName={`${prefix}.discretionaryNGN`} options={DISCRETIONARY_NGN} testPrefix="disc-ngn" />
            </div>
          </div>

          {/* Column 2: Non-Discretionary + Discretionary Foreign + Sharia */}
          <div className="border-r border-gray-200 p-3 space-y-4">
            {/* Non-Discretionary Options - 2 sub-columns */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">NON-DISCRETIONARY OPTIONS</p>
              <FormField
                control={form.control}
                name={`${prefix}.nonDiscretionary`}
                render={({ field }) => {
                  const currentValues: string[] = field.value || [];
                  const toggle = (option: string, checked: boolean) => {
                    if (checked) {
                      field.onChange([...currentValues, option]);
                    } else {
                      field.onChange(currentValues.filter((v: string) => v !== option));
                    }
                  };
                  return (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {NON_DISCRETIONARY_LEFT.map((option, i) => (
                          <div key={option} className="contents">
                            <CheckboxItem
                              id={`non-disc-${option.replace(/\s+/g, "-").toLowerCase()}`}
                              label={option}
                              checked={currentValues.includes(option)}
                              onChange={(checked) => toggle(option, checked)}
                            />
                            <CheckboxItem
                              id={`non-disc-${NON_DISCRETIONARY_RIGHT[i].replace(/\s+/g, "-").toLowerCase()}`}
                              label={NON_DISCRETIONARY_RIGHT[i]}
                              checked={currentValues.includes(NON_DISCRETIONARY_RIGHT[i])}
                              onChange={(checked) => toggle(NON_DISCRETIONARY_RIGHT[i], checked)}
                            />
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* Discretionary Options Foreign Currency */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">DISCRETIONARY OPTIONS<br />(FOREIGN CURRENCY)</p>
              <MultiCheckboxField form={form} fieldName={`${prefix}.discretionaryForeign`} options={DISCRETIONARY_FOREIGN} testPrefix="disc-foreign" />
            </div>

            {/* Sharia Complaint Options */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">SHARIA COMPLAINT OPTIONS<br />(DISCRETIONARY)</p>
              <MultiCheckboxField form={form} fieldName={`${prefix}.shariaCompliant`} options={SHARIA_COMPLIANT} testPrefix="sharia" />
            </div>
          </div>

          {/* Column 3: Separately Managed Account + Securities Trading */}
          <div className="p-3 space-y-4">
            {/* Separately Managed Account */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">SEPARATELY MANAGED ACCOUNT</p>
              <FormField
                control={form.control}
                name={`${prefix}.separatelyManaged`}
                render={({ field }) => {
                  const currentValues: string[] = field.value || [];
                  return (
                    <FormItem>
                      <div className="space-y-1">
                        {SEPARATELY_MANAGED.map((option) => (
                          <CheckboxItem
                            key={option}
                            id={`sep-managed-${option.replace(/\s+/g, "-").toLowerCase()}`}
                            label={option}
                            checked={currentValues.includes(option)}
                            onChange={(checked) => {
                              if (checked) {
                                field.onChange([...currentValues, option]);
                              } else {
                                field.onChange(currentValues.filter((v: string) => v !== option));
                              }
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <p className="text-[10px] text-primary italic mt-1 leading-tight">
                Investment Policy Statement (IPS) to be executed by client after on-boarding.
              </p>
              <div className="mt-2 space-y-1">
                <FormField
                  control={form.control}
                  name={`${prefix}.registrarLiaisonServices`}
                  render={({ field }) => (
                    <FormItem>
                      <CheckboxItem
                        id={`${prefix}-registrar-liaison`}
                        label="Registrar Liaison Services"
                        checked={field.value || false}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${prefix}.othersSelected`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-1.5">
                        <Checkbox
                          id={`${prefix}-others-selected`}
                          data-testid="checkbox-others-selected"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 shrink-0"
                        />
                        <label htmlFor={`${prefix}-others-selected`} className="text-xs leading-tight cursor-pointer">
                          Others <span className="italic text-primary">(please state under)</span>
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${prefix}.othersDescription`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="input-others-description"
                          className="h-7 text-xs mt-1"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Securities Trading */}
            <div>
              <p className="text-xs font-bold text-primary mb-2">SECURITIES TRADING</p>
              <MultiCheckboxField form={form} fieldName={`${prefix}.securitiesTrading`} options={SECURITIES_TRADING} testPrefix="sec-trading" />
            </div>
          </div>
        </div>

        {/* Risk Disclosure Statement */}
        <div className="border border-gray-200 p-3">
          <p className="text-xs font-bold text-primary mb-1">RISK DISCLOSURE STATEMENT (EQUITIES CLIENTS ONLY)</p>
          <p className="text-[11px] text-gray-700 leading-snug mb-3">
            Investments in securities are subject to risk, including the possible loss of capital. The client confirms receipt and understanding of the Company's Risk Disclosure Statement and acknowledges that, except where otherwise agreed in writing, all investments are made at the Client's own risk.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`${prefix}.riskDisclosureName`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end gap-2">
                    <label className="text-xs font-semibold shrink-0">NAME</label>
                    <div className="flex-1 border-b border-gray-400">
                      <Input
                        data-testid="input-risk-name"
                        className="border-0 border-b-0 rounded-none h-6 text-xs px-0 focus-visible:ring-0 bg-transparent"
                        {...field}
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <div>
              <label className="text-xs font-semibold block mb-1">SIGNATURE</label>
              <FileUpload
                form={form}
                fieldName={`${prefix}.riskDisclosureSignature`}
                testId="risk-disclosure-signature"
                variant="signature"
                label="Click to upload signature"
              />
            </div>
            <FormField
              control={form.control}
              name={`${prefix}.riskDisclosureDate`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end gap-2">
                    <label className="text-xs font-semibold shrink-0">DATE</label>
                    <div className="flex-1 border-b border-gray-400">
                      <Input
                        data-testid="input-risk-date"
                        className="border-0 border-b-0 rounded-none h-6 text-xs px-0 focus-visible:ring-0 bg-transparent"
                        {...field}
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Advisory Services */}
        <div className="border border-gray-200 p-3 space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-primary shrink-0">ADVISORY SERVICES</p>
            <FormField
              control={form.control}
              name={`${prefix}.advisoryServices`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <input
                      data-testid="input-advisory-services"
                      className="w-full border-b border-gray-400 text-xs focus:outline-none bg-transparent pb-0.5"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Initial Investment Amount */}
          <FormField
            control={form.control}
            name={`${prefix}.initialInvestmentAmount`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-primary shrink-0">Initial Investment Amount:</label>
                  <FormControl>
                    <Input
                      data-testid="input-initial-investment"
                      className="h-7 text-xs flex-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Client's Risk Profile */}
          <FormField
            control={form.control}
            name={`${prefix}.clientRiskProfile`}
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 items-start">
                  <label className="text-xs font-semibold text-primary pt-1">Client's Risk Profile</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        value: "low",
                        label: "Low Risk",
                        desc: "You are more focused on capital preservation, even if it requires earning lower returns",
                      },
                      {
                        value: "medium",
                        label: "Medium Risk",
                        desc: "You are willing to take some risk to compensate for better returns.",
                      },
                      {
                        value: "high",
                        label: "High Risk",
                        desc: "You are willing to take risk and are aware that such risk can lead to loss of capital for superior returns <not advisable for retirees or soon to be>",
                      },
                    ].map((risk) => (
                      <div key={risk.value}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Checkbox
                            id={`${prefix}-risk-${risk.value}`}
                            data-testid={`checkbox-risk-${risk.value}`}
                            checked={field.value === risk.value}
                            onCheckedChange={(checked) => field.onChange(checked ? risk.value : undefined)}
                            className="shrink-0"
                          />
                          <label htmlFor={`${prefix}-risk-${risk.value}`} className="text-xs font-medium cursor-pointer">{risk.label}</label>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight italic pl-5">{risk.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Horizon */}
          <FormField
            control={form.control}
            name={`${prefix}.investmentHorizon`}
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 items-center">
                  <label className="text-xs font-semibold text-primary">Investment Horizon</label>
                  <div className="flex items-center gap-6">
                    {["Short term", "Medium term", "Long term"].map((horizon) => (
                      <div key={horizon} className="flex items-center gap-1.5">
                        <label className="text-xs cursor-pointer" htmlFor={`${prefix}-horizon-${horizon.replace(/\s+/g, "-").toLowerCase()}`}>{horizon}</label>
                        <Checkbox
                          id={`${prefix}-horizon-${horizon.replace(/\s+/g, "-").toLowerCase()}`}
                          data-testid={`checkbox-horizon-${horizon.replace(/\s+/g, "-").toLowerCase()}`}
                          checked={field.value === horizon}
                          onCheckedChange={(checked) => field.onChange(checked ? horizon : undefined)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Objectives */}
          <FormField
            control={form.control}
            name={`${prefix}.investmentObjectives`}
            render={({ field }) => {
              const currentValues: string[] = field.value || [];
              return (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 items-center">
                    <label className="text-xs font-semibold text-primary">Investment Objectives</label>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      {INVESTMENT_OBJECTIVES.map((obj) => (
                        <div key={obj} className="flex items-center gap-1.5">
                          <label className="text-xs cursor-pointer" htmlFor={`${prefix}-obj-${obj.replace(/\s+/g, "-").toLowerCase()}`}>{obj}</label>
                          <Checkbox
                            id={`${prefix}-obj-${obj.replace(/\s+/g, "-").toLowerCase()}`}
                            data-testid={`checkbox-obj-${obj.replace(/\s+/g, "-").toLowerCase()}`}
                            checked={currentValues.includes(obj)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...currentValues, obj]);
                              } else {
                                field.onChange(currentValues.filter((v: string) => v !== obj));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

      </div>
    </FormSection>
  );
}
