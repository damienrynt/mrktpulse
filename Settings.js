import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, User, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const [notificationFrequency, setNotificationFrequency] = useState("daily");
  const [showSuccess, setShowSuccess] = useState(false);

  const user = {
    full_name: "John Doe",
    email: "john.doe@example.com",
    role: "user"
  };

  const handleSaveSettings = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Customize your MarketPulse experience</p>
      </div>

      {showSuccess && (
        <Alert className="mb-6 border-emerald-200 bg-emerald-50">
          <AlertDescription className="text-emerald-800">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-slate-700">Full Name</Label>
              <p className="mt-1 text-lg font-semibold text-slate-900">{user.full_name}</p>
            </div>
            <div>
              <Label className="text-slate-700">Email</Label>
              <p className="mt-1 text-lg font-semibold text-slate-900">{user.email}</p>
            </div>
            <div>
              <Label className="text-slate-700">Role</Label>
              <p className="mt-1 text-lg font-semibold text-slate-900 capitalize">{user.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="frequency" className="text-slate-700">
                News Update Frequency
              </Label>
              <Select
                value={notificationFrequency}
                onValueChange={setNotificationFrequency}
              >
                <SelectTrigger id="frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time (as news breaks)</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500">
                Choose how often you'd like to receive news updates for your watchlist stocks
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">About Notifications</h3>
                <p className="text-sm text-slate-700">
                  MarketPulse will notify you about important news and market movements for stocks in your watchlist. 
                  You can adjust the frequency above based on your preferences. 
                  Real-time updates are best for active traders, while daily digests work great for long-term investors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
