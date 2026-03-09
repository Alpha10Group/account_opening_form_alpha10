import FormSection from "./form-section";

const productAccounts = [
  { name: "UBA NOM/ ALPHA 10 TREASURY BACKED INVESTMENT", currency: "NGN", account: "1028647497" },
  { name: "UBA NOM ALPHA 10 LIQUIDITY MANAGEMENT INVESTMENT", currency: "NGN", account: "1028652530" },
  { name: "UBA NOM ALPHA 10 LIQUIDITY MANAGEMENT FLEX", currency: "NGN", account: "1028653032" },
  { name: "UBA NOM/ ALPHA10 LIQUIDITY MANAGEMENT FLEX", currency: "USD", account: "3004927308" },
  { name: "STL TRUSTEES LTD/ ALPHA10 MONEY MARKET FUND", currency: "NGN", account: "1028810606" },
  { name: "STL TRUSTEES LTD/ ALPHA10 DOLLAR FUND", currency: "USD", account: "3004974151" },
];

export default function BankDetailsSection() {
  return (
    <FormSection title="Bank Details" description="Alpha10 bank account details for deposits and transfers">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border" data-testid="table-product-accounts">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left p-2 font-medium text-xs">ACCOUNT NAME / PRODUCT ACCOUNTS</th>
              <th className="text-left p-2 font-medium text-xs">CURRENCY</th>
              <th className="text-left p-2 font-medium text-xs">ACCOUNT NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {productAccounts.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                <td className="p-2 text-xs">{row.name}</td>
                <td className="p-2 text-xs font-medium">{row.currency}</td>
                <td className="p-2 text-xs font-mono">{row.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormSection>
  );
}
