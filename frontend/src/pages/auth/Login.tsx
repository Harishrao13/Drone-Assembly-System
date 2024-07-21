import Logo from "@/assets/icons/react.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import useSignIn from 'react-auth-kit/hooks/useSignIn';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  
  const handleLogin = async (e:any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        signIn({
          auth: {
            token: data.token,
            type: 'Bearer',
          },
          // AuthState: { email: data.email, isAdmin: data.isAdmin },
        });
        navigate('/home');
      } else {
        // Handle error
        console.error(data.msg);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className="login flex items-center justify-center h-screen">
      <Card className="p-6 w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center">
          <div className="logo-container flex-1 flex justify-center">
            <img src={Logo} alt="Logo" width={120} height={110} />
          </div>
          <div className="form-container flex-1 flex flex-col">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 h-full">
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="email" name="email" placeholder="Email" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" name="password" placeholder="Password" type="password" required />
                </div>
              </div>
              <div className="flex justify-end mt-auto">
                <Button type="submit" className="btn-primary">Login</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
