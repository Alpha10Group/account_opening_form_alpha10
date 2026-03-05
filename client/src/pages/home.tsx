import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Users, Building2, ArrowRight, CheckCircle2, Shield, Clock } from "lucide-react";
import { Link } from "wouter";
import logoImg from "@assets/LOGO3_1770589302028.JPG";
import IndividualForm from "@/components/individual-form";
import JointForm from "@/components/joint-form";
import CorporateForm from "@/components/corporate-form";
import SuccessScreen from "@/components/success-screen";

type AccountType = "individual" | "joint" | "corporate" | null;
type ViewState = "selection" | "form" | "success";

const accountOptions = [
  {
    type: "individual" as const,
    title: "Individual Account",
    description: "Personal banking account for a single account holder with full access to banking services.",
    icon: User,
    features: ["Personal savings & current", "Debit card access", "Online & mobile banking", "Single signatory"],
    color: "from-[#961A1C] to-[#7a1517] dark:from-[#b02022] dark:to-[#961A1C]",
  },
  {
    type: "joint" as const,
    title: "Joint Account",
    description: "Shared account for two or more individuals with flexible operating mandates.",
    icon: Users,
    features: ["Shared account access", "Flexible mandates", "Multiple signatories", "Joint liability"],
    color: "from-gray-700 to-gray-800 dark:from-gray-500 dark:to-gray-600",
  },
  {
    type: "corporate" as const,
    title: "Corporate Account",
    description: "Business account for registered companies with advanced corporate banking features.",
    icon: Building2,
    features: ["Business transactions", "Multiple signatories", "Corporate lending", "Trade services"],
    color: "from-gray-900 to-black dark:from-gray-400 dark:to-gray-500",
  },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const [viewState, setViewState] = useState<ViewState>("selection");
  const [referenceNumber, setReferenceNumber] = useState("");

  const goToSelection = useCallback(() => {
    setSelectedType(null);
    setViewState("selection");
    setReferenceNumber("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      goToSelection();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [goToSelection]);

  const handleSelectAccount = (type: AccountType) => {
    window.history.pushState({ view: "form", type }, "", `/?type=${type}`);
    setSelectedType(type);
    setViewState("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuccess = (ref: string) => {
    window.history.pushState({ view: "success" }, "", "/?submitted=true");
    setReferenceNumber(ref);
    setViewState("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToSelection = () => {
    window.history.back();
  };

  const handleNewApplication = () => {
    window.history.pushState(null, "", "/");
    goToSelection();
  };

  if (viewState === "success") {
    return (
      <SuccessScreen
        referenceNumber={referenceNumber}
        accountType={selectedType!}
        onNewApplication={handleNewApplication}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Alpha10 Group" className="w-10 h-10 rounded-md object-contain" data-testid="img-logo" />
            <div>
              <h1 className="text-lg font-semibold leading-tight" data-testid="text-app-title">Alpha10 Group</h1>
              <p className="text-xs text-muted-foreground">Account Opening Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {viewState === "form" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToSelection}
                data-testid="button-back-selection"
              >
                Change Account Type
              </Button>
            )}
          </div>
        </div>
      </header>

      {viewState === "selection" && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3" data-testid="text-hero-title">
              Open Your Account Today
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Choose the account type that best suits your needs. Complete the application form and our team will process your request promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {accountOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.type}
                  className="overflow-visible hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 flex flex-col"
                  onClick={() => handleSelectAccount(option.type)}
                  data-testid={`card-account-${option.type}`}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{option.description}</p>
                    <ul className="space-y-2 mb-5">
                      {option.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#961A1C] flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full gap-2" data-testid={`button-open-${option.type}`}>
                      Open Account <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: "Bank-Grade Security", desc: "256-bit encryption" },
              { icon: Clock, label: "Quick Processing", desc: "24-48 hour review" },
              { icon: CheckCircle2, label: "Easy Application", desc: "Simple step-by-step form" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-md">
                <item.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {viewState === "form" && (
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <Badge variant="secondary">
                {selectedType === "individual" ? "Individual" : selectedType === "joint" ? "Joint" : "Corporate"} Account
              </Badge>
            </div>
            <h2 className="text-2xl font-bold" data-testid="text-form-title">Account Opening Form</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Please fill in all required fields accurately. Fields marked with * are mandatory.
            </p>
          </div>

          {selectedType === "individual" && <IndividualForm onSuccess={handleSuccess} />}
          {selectedType === "joint" && <JointForm onSuccess={handleSuccess} />}
          {selectedType === "corporate" && <CorporateForm onSuccess={handleSuccess} />}
        </main>
      )}

      <footer className="border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>Alpha10 Group Account Opening Portal. All information provided is kept strictly confidential.</p>
          <Link href="/applications" className="inline-block mt-3">
            <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="button-view-applications">
              Admin
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
