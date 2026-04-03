import { Card } from "@/components/ui/card";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Card className="mb-5">
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-primary">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {children}
      </div>
    </Card>
  );
}
