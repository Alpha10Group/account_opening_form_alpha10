import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormSection from "./form-section";

interface ProductsServicesSectionProps {
  form: any;
  prefix: string;
}

const MUTUAL_FUNDS = [
  "Alpha10 Dollar Fund",
  "Alpha10 Money Market Fund",
  "Alpha10 Halal Fund",
];

const DISCRETIONARY_FOREIGN = [
  "FX Liquidity Management Investment",
  "FX Liquidity Management Flex",
];

const SHARIA_COMPLIANT = [
  "Mudaraba Investment Note",
  "Kiddies Halal Investment Account",
];

const SEPARATELY_MANAGED = [
  "Discretionary Portfolio Management",
  "Non-Discretionary Portfolio Management",
];

const NON_DISCRETIONARY = [
  "Commercial Papers",
  "Promissory Notes",
  "FGN Treasury Bills",
  "FGN Bond",
  "Eurobonds",
  "Sukuk",
];

const DISCRETIONARY_NGN = [
  "Treasury Backed Investment",
  "Liquidity Management Investment",
  "Liquidity Management Flex",
  "Kiddies Investment Account",
];

const SECURITIES_TRADING = [
  "Execution Only",
  "Trading",
  "Equities Portfolio Management",
  "Transmission",
];

function CheckboxGroup({ form, fieldName, options, testPrefix }: { form: any; fieldName: string; options: string[]; testPrefix: string }) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const currentValues: string[] = field.value || [];
        return (
          <FormItem>
            <div className="space-y-2">
              {options.map((option) => {
                const id = `${testPrefix}-${option.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      data-testid={`checkbox-${id}`}
                      checked={currentValues.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...currentValues, option]);
                        } else {
                          field.onChange(currentValues.filter((v: string) => v !== option));
                        }
                      }}
                    />
                    <label htmlFor={id} className="text-sm leading-tight cursor-pointer">{option}</label>
                  </div>
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
    <FormSection title="Products / Services Required" description="Select the products and services you are interested in">
      <div className="space-y-6">

        <div>
          <h4 className="text-sm font-semibold text-primary mb-3">ASSET MANAGEMENT</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Mutual Funds</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.mutualFunds`} options={MUTUAL_FUNDS} testPrefix="mutual-funds" />
              <div className="mt-3">
                <p className="text-xs font-medium mb-2">Income Distribution</p>
                <FormField
                  control={form.control}
                  name={`${prefix}.incomeDistribution`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`${prefix}-income-payment`}
                            data-testid="checkbox-income-payment"
                            checked={field.value === "Payment"}
                            onCheckedChange={(checked) => field.onChange(checked ? "Payment" : undefined)}
                          />
                          <label htmlFor={`${prefix}-income-payment`} className="text-sm cursor-pointer">Payment</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`${prefix}-income-reinvestment`}
                            data-testid="checkbox-income-reinvestment"
                            checked={field.value === "Reinvestment"}
                            onCheckedChange={(checked) => field.onChange(checked ? "Reinvestment" : undefined)}
                          />
                          <label htmlFor={`${prefix}-income-reinvestment`} className="text-sm cursor-pointer">Reinvestment</label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Discretionary Options (Foreign Currency)</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.discretionaryForeign`} options={DISCRETIONARY_FOREIGN} testPrefix="disc-foreign" />
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Sharia Complaint Options (Discretionary)</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.shariaCompliant`} options={SHARIA_COMPLIANT} testPrefix="sharia" />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-4 border-t">

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Separately Managed Account</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.separatelyManaged`} options={SEPARATELY_MANAGED} testPrefix="sep-managed" />
              <p className="text-[10px] text-muted-foreground italic mt-1">Investment Policy Statement (IPS) to be executed by client after on-boarding.</p>
              <div className="space-y-2 mt-3">
                <FormField
                  control={form.control}
                  name={`${prefix}.registrarLiaisonServices`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${prefix}-registrar-liaison`}
                          data-testid="checkbox-registrar-liaison"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                        <label htmlFor={`${prefix}-registrar-liaison`} className="text-sm cursor-pointer">Registrar Liaison Services</label>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${prefix}.othersSelected`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${prefix}-others-selected`}
                          data-testid="checkbox-others-selected"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                        <label htmlFor={`${prefix}-others-selected`} className="text-sm cursor-pointer">Others <span className="text-muted-foreground italic text-xs">(please state under)</span></label>
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
                        <Input data-testid="input-others-description" placeholder="Please specify" className="mt-1" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Non-Discretionary Options</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.nonDiscretionary`} options={NON_DISCRETIONARY} testPrefix="non-disc" />
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Discretionary Options (NGN)</p>
              <CheckboxGroup form={form} fieldName={`${prefix}.discretionaryNGN`} options={DISCRETIONARY_NGN} testPrefix="disc-ngn" />
            </div>

          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-primary mb-3">SECURITIES TRADING</h4>
          <CheckboxGroup form={form} fieldName={`${prefix}.securitiesTrading`} options={SECURITIES_TRADING} testPrefix="sec-trading" />
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-primary mb-3">ADVISORY SERVICES</h4>
          <FormField
            control={form.control}
            name={`${prefix}.initialInvestmentAmount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Investment Amount</FormLabel>
                <FormControl>
                  <Input data-testid="input-initial-investment" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t pt-4">
          <FormField
            control={form.control}
            name={`${prefix}.clientRiskProfile`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client's Risk Profile</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-6 pt-2">
                    <div className="flex-1 border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <RadioGroupItem value="low" id="risk-low" data-testid="radio-risk-low" />
                        <label htmlFor="risk-low" className="text-sm font-medium cursor-pointer">Low Risk</label>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-tight">You are more focused on capital preservation, even if it requires earning lower returns</p>
                    </div>
                    <div className="flex-1 border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <RadioGroupItem value="medium" id="risk-medium" data-testid="radio-risk-medium" />
                        <label htmlFor="risk-medium" className="text-sm font-medium cursor-pointer">Medium Risk</label>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-tight">You are willing to take some risk to compensate for better returns</p>
                    </div>
                    <div className="flex-1 border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <RadioGroupItem value="high" id="risk-high" data-testid="radio-risk-high" />
                        <label htmlFor="risk-high" className="text-sm font-medium cursor-pointer">High Risk</label>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-tight">You are willing to take risk and are aware that such risk can lead to loss of capital for superior returns (not advisable for retirees or soon to be)</p>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      </div>
    </FormSection>
  );
}
