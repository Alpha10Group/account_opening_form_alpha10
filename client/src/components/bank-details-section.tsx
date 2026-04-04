import FormSection from "./form-section";

const mainAccounts = [
  { name: "UBA NOM/ ALPHA10 TREASURY BACKED INVESTMENT", currency: "NGN", account: "1028647497" },
  { name: "UBA NOM/ ALPHA10 LIQUIDITY MANAGEMENT INVESTMENT", currency: "NGN", account: "1028652530" },
  { name: "UBA NOM/ ALPHA10 LIQUIDITY MANAGEMENT FLEX", currency: "NGN", account: "1028653032" },
  { name: "UBA NOM/ ALPHA10 LIQUIDITY MANAGEMENT FLEX", currency: "USD", account: "3004927308" },
  { name: "UBA NOM/ ALPHA10 MUDARABA INVESTMENT", currency: "NGN", account: "1029707310" },
  { name: "UBA NOM/ ALPHA10 NON-DISCRETIONARY PORTFOLIO MANAGEMENT", currency: "NGN", account: "1029707327" },
  { name: "UBA NOM/ ALPHA10 KIDDIES INVESTMENT", currency: "NGN", account: "1029710404" },
  { name: "UBA NOM/ ALPHA10 MUDARABA INVESTMENT", currency: "USD", account: "3005041881" },
  { name: "UBA NOM/ ALPHA10 KIDDIES INVESTMENT", currency: "USD", account: "3005041939" },
];

const trusteeAccounts = [
  { name: "UBA NOM-STL TRUSTEES/ ALPHA10 MONEY MARKET FUND", currency: "NGN", account: "1028810606" },
  { name: "UBA NOM-STL TRUSTEES/ ALPHA10 DOLLAR FUND", currency: "USD", account: "3004974151" },
];

function AccountTable({ rows }: { rows: typeof mainAccounts }) {
  return (
    <table className="w-full text-sm border border-gray-300" data-testid="table-product-accounts">
      <thead>
        <tr className="bg-primary text-primary-foreground">
          <th className="text-left p-2 font-medium text-xs border-r border-white/20">ACCOUNT NAME/ PRODUCT ACCOUNTS</th>
          <th className="text-left p-2 font-medium text-xs border-r border-white/20">CURRENCY</th>
          <th className="text-left p-2 font-medium text-xs">ACCOUNT NUMBER</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-gray-300">
            <td className="p-2 text-xs border-r border-gray-300">{row.name}</td>
            <td className="p-2 text-xs border-r border-gray-300">{row.currency}</td>
            <td className="p-2 text-xs font-mono">{row.account}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BankDetailsSection() {
  return (
    <FormSection title="Bank Details" description="Alpha10 bank account details for deposits and transfers">
      <div className="space-y-6 overflow-x-auto">
        <AccountTable rows={mainAccounts} />
        <AccountTable rows={trusteeAccounts} />
      </div>
    </FormSection>
  );
}
