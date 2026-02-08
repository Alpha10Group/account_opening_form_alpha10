import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "./form-section";

interface RefereeSectionProps {
  form: any;
  prefix: string;
  refereeNumber: 1 | 2;
  testPrefix?: string;
}

export default function RefereeSection({ form, prefix, refereeNumber, testPrefix = "" }: RefereeSectionProps) {
  const tp = testPrefix ? `${testPrefix}-` : "";
  return (
    <FormSection title={`Referee ${refereeNumber}`} description={`Details of referee ${refereeNumber}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name={`${prefix}.fullName`} render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name *</FormLabel>
            <FormControl><Input data-testid={`input-${tp}referee${refereeNumber}-name`} placeholder="Referee full name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.relationship`} render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger data-testid={`select-${tp}referee${refereeNumber}-rel`}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
              <SelectContent>
                {["Colleague", "Business Associate", "Friend", "Family", "Professional Adviser", "Other"].map(r => (
                  <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.phoneNumber`} render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl><Input data-testid={`input-${tp}referee${refereeNumber}-phone`} placeholder="+234 XXX XXXX XXX" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.email`} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input data-testid={`input-${tp}referee${refereeNumber}-email`} type="email" placeholder="email@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.bankName`} render={({ field }) => (
          <FormItem>
            <FormLabel>Bank Name *</FormLabel>
            <FormControl><Input data-testid={`input-${tp}referee${refereeNumber}-bank`} placeholder="Referee's bank name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name={`${prefix}.accountNumber`} render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number *</FormLabel>
            <FormControl><Input data-testid={`input-${tp}referee${refereeNumber}-acctno`} placeholder="10-digit account number" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="sm:col-span-2">
          <FormField control={form.control} name={`${prefix}.address`} render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl><Textarea data-testid={`input-${tp}referee${refereeNumber}-address`} placeholder="Referee's address" className="resize-none" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>
    </FormSection>
  );
}
