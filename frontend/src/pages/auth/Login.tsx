import Logo from "@/assets/icons/react.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/home');
  }

  return (
    <div className="login flex items-center justify-center h-screen">
      <Card className="p-6 w-full max-w-lg">
        <CardHeader>
          <CardTitle>Employee Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center">
          <div className="logo-container flex-1 flex justify-center">
            <img src={Logo} alt="Logo" width={120} height={110} />
          </div>
          <div className="form-container flex-1 flex flex-col">
            <form className="flex flex-col gap-4 h-full">
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="name" placeholder="Email"/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" placeholder="Password" type="password" />
                </div>
              </div>
              <div className="flex justify-end mt-auto">
                <Button onClick={handleLogin} className="btn-primary">Login</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
