import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from '@/pages/layout';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <Layout>
      <div className="change-password flex items-center justify-center h-screen w-full">
        <Card className="p-6 max-w-md w-full flex flex-col">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="mt-3 flex flex-col gap-4 font-semibold">
            <form className="w-full">
              <div className="grid gap-4 form-container">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="cpassword">Current Password</Label>
                  <Input
                    id="cpassword"
                    type="password"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="npassword">New Password</Label>
                  <Input
                    id="npassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="cnpassword">Confirm New Password</Label>
                  <Input
                    id="cnpassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            {newPassword !== confirmNewPassword && (
              <h3 className="text-red-600">The passwords do not match!</h3>
            )}
            <Button disabled={newPassword !== confirmNewPassword} className='btn-primary'>
              Update Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
