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
  const formData = application.formData as Record<string, any>;

  const renderValue = (value: any, depth = 0): React.ReactNode => {
    if (value === null || value === undefined || value === "") return <span className="text-muted-foreground italic">N/A</span>;
    if (typeof value === "boolean") return <span>{value ? "Yes" : "No"}</span>;
    if (typeof value === "string") {
      if (value.startsWith("/api/uploads/")) {
        const isPdf = value.endsWith(".pdf");
        return isPdf ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary underline" data-testid="link-uploaded-file">View PDF</a>
        ) : (
          <img src={value} alt="Uploaded" className="max-h-20 max-w-[150px] rounded-md object-contain border" data-testid="img-uploaded-file" />
        );
      }
      return <span>{value}</span>;
    }
    if (Array.isArray(value)) {
      return (
        <div className="space-y-3 mt-1">
          {value.map((item, i) => (
            <Card key={i} className="p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Item {i + 1}</p>
              {typeof item === "object" && item !== null ? renderObject(item, depth + 1) : <span>{String(item)}</span>}
            </Card>
          ))}
        </div>
      );
    }
    if (typeof value === "object") {
      return <div className="mt-1">{renderObject(value, depth + 1)}</div>;
    }
    return <span>{String(value)}</span>;
  };

  const renderObject = (obj: Record<string, any>, depth = 0) => {
    const formatKey = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    return (
      <div className={`space-y-2 ${depth > 0 ? "pl-3 border-l-2 border-muted" : ""}`}>
        {Object.entries(obj).map(([key, val]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:gap-3">
            <span className="text-sm font-medium text-muted-foreground min-w-[180px] shrink-0">{formatKey(key)}:</span>
            <div className="text-sm flex-1 break-words">{renderValue(val, depth)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Button variant="outline" size="sm" className="mb-4 gap-2" onClick={onBack} data-testid="button-back-list">
        <ArrowLeft className="w-4 h-4" /> Back to Applications
      </Button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="text-xl font-bold" data-testid="text-detail-ref">{application.referenceNumber}</h2>
        <Badge variant={application.status === "approved" ? "default" : application.status === "rejected" ? "destructive" : "secondary"} data-testid="badge-detail-status">
          {application.status}
        </Badge>
        <Badge variant="outline" data-testid="badge-detail-type">{application.accountType}</Badge>
      </div>

      <Card className="p-5">
        <p className="text-xs text-muted-foreground mb-4">
          Submitted on {new Date(application.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
        {renderObject(formData)}
      </Card>
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
    onError: () => {
      toast({ title: "Login Failed", description: "Invalid admin password. Please try again.", variant: "destructive" });
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
          <img src={logoImg} alt="Alpha10 Group" className="w-14 h-14 rounded-md object-contain mb-3" />
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
            <img src={logoImg} alt="Alpha10 Group" className="w-10 h-10 rounded-md object-contain" />
            <div>
              <h1 className="text-lg font-semibold leading-tight">Alpha10 Group</h1>
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
