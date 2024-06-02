import Logo from "@/assets/react.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Login() {
  return (
    <div className="login flex items-center justify-center h-screen">
      <Card className="p-6 w-full max-w-lg">
        <CardHeader>
          <CardTitle>Member Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between">
          <div className="logo-container mr-8">
            <img src={Logo} alt="Logo" width={120} height={110} />
          </div>
          <div className="form-container">
            <form>
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="name" placeholder="Email"/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" placeholder="Password" type="password" />
                </div>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Admin Login</Button>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
