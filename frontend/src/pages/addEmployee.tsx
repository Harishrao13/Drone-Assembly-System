import Layout from './layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import DropIcon from "@/assets/icons/dropdown-arrow.svg";

import { Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
            <CardFooter className="flex justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger className=' p-2 outline flex items-center'>
                  <div className='mr-2'>Choose Role</div>
                  <img src={DropIcon} width={20} height={20}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Employee</DropdownMenuItem>
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          )}
        </Card>
      </div>
    </Layout>
  );
}
