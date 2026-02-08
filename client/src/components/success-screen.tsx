import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Copy, FileText, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuccessScreenProps {
  referenceNumber: string;
  accountType: "individual" | "joint" | "corporate";
  onNewApplication: () => void;
}

export default function SuccessScreen({ referenceNumber, accountType, onNewApplication }: SuccessScreenProps) {
  const { toast } = useToast();
  const typeLabel = accountType === "individual" ? "Individual" : accountType === "joint" ? "Joint" : "Corporate";

  const copyReference = () => {
    navigator.clipboard.writeText(referenceNumber);
    toast({ title: "Copied", description: "Reference number copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h2 className="text-2xl font-bold mb-2" data-testid="text-success-title">Application Submitted</h2>
          <p className="text-muted-foreground mb-6">
            Your {typeLabel} account application has been successfully submitted and is now under review.
          </p>

          <div className="bg-muted/50 rounded-md p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Reference Number</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-lg font-mono font-semibold" data-testid="text-reference-number">{referenceNumber}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyReference}
                data-testid="button-copy-reference"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-left space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">1</Badge>
              <p className="text-sm text-muted-foreground">Your application is under review. This typically takes 24-48 working hours.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">2</Badge>
              <p className="text-sm text-muted-foreground">You may be contacted for additional documentation or verification.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">3</Badge>
              <p className="text-sm text-muted-foreground">Once approved, your account details will be sent to your registered email.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={onNewApplication} data-testid="button-new-application">
              <FileText className="w-4 h-4" /> New Application
            </Button>
            <Button className="flex-1 gap-2" onClick={onNewApplication} data-testid="button-done">
              Done <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
