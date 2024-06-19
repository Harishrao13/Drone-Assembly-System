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

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <Layout>
    <div className="change-password flex items-center justify-center h-screen w-full">
      <Card className="p-6 max-w-md w-full">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form>
            <div className="grid w-max gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" placeholder="UserID" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="cpassword"
                  placeholder="Current Password"
                  type="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        {newPassword === confirmNewPassword && (
          <CardFooter className="flex justify-between">
            <Button>Change Password</Button>
          </CardFooter>
        )}
      </Card>
    </div>
    </Layout>
  );
}
