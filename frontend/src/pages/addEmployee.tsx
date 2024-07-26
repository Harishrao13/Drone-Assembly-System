import { useState } from 'react';
import Layout from './layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from 'react-feather';

export function AddEmployee() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleGeneratePassword = () => {
  const generatedPassword =  Math.random().toString(36).slice(2, 10)
  setPassword(generatedPassword)
  console.log(generatedPassword)
  };

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
                    <div className="relative flex flex-row items-center space-x-4">
                      <div className='relative'>
                      <Input
                        id="password"
                        placeholder="Password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                        />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                        {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleGeneratePassword()}
                        className='btn-primary'
                      >
                        Generate Password
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
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
