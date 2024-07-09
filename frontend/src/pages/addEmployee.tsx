import Layout from './layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddEmployee() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 w-full max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle>Register New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="form-container">
              <form>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input id="name" placeholder="User ID" className="p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex flex-row items-center space-x-4">
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                      />
                      <Button className='btn-primary'>Generate Password</Button>
                    </div>
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
          {password !== confirmPassword && (
            <div className="text-red-600 font-semibold text-center mt-2">The passwords do not match!</div>
          )}
          <div className='flex flex-col items-center mt-4'>
            <Select>
              <SelectTrigger className="w-[180px] border border-gray-300 rounded-md">
                <SelectValue placeholder="Choose Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <CardFooter className="mt-4">
              <Button className='btn-primary rounded-lg'>Register</Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
