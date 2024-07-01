import Layout from './layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";


import { Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddEmployee() {
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 w-full max-w-lg">
          <CardHeader>
            <CardTitle>Add Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="form-container">
              <form>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input id="name" placeholder="User ID" />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Input id="password" placeholder="Password" type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)} />
                    <Button className='btn-primary'>Generate Password</Button>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
          {Password === confirmPassword && (
           <div className='flex ml-6 flex-row space-x-16'> 
            <Select>
             <SelectTrigger className="w-[180px]">
             <SelectValue placeholder="Choose Role" />
             </SelectTrigger>
           <SelectContent>
             <SelectItem value="employee">Employee</SelectItem>
             <SelectItem value="admin">Admin</SelectItem>
           </SelectContent>
           </Select>
          <CardFooter>
            <Button className='btn-primary'>Save</Button>
          </CardFooter>
          </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
