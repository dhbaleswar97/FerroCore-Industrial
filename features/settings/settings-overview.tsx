"use client";

import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getInitials, titleCase } from "@/lib/utils";
import { Bell, Shield, Palette, LogOut } from "lucide-react";

export function SettingsOverview() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold lg:text-3xl">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16 text-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="mt-1">
                {titleCase(user.role)}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full Name" defaultValue={user.name} />
            <Input label="Email Address" type="email" defaultValue={user.email} />
            <Input label="Department" defaultValue={user.department ?? ""} />
            <Input label="Phone" defaultValue="" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick settings links */}
      {[
        {
          icon: Palette,
          label: "Appearance",
          description: "Customize theme, density, and display preferences.",
        },
        {
          icon: Bell,
          label: "Notifications",
          description: "Configure email, push, and digest notification settings.",
        },
        {
          icon: Shield,
          label: "Security",
          description: "Manage password, two-factor auth, and active sessions.",
        },
      ].map(({ icon: Icon, label, description }) => (
        <Card key={label} className="cursor-pointer transition-all hover:shadow-elevated hover:-translate-y-0.5">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-muted p-3">
              <Icon className="h-5 w-5 text-brand-ember" />
            </div>
            <div>
              <p className="font-semibold">{label}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
