import Logo from "@/assets/react.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/App.css"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Login () {
  return (
    <div className="login">
    <Card className="login">
      <CardHeader>
        <CardTitle>Member Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <div>
          <img src={Logo} alt="Logo" width={120} height={110} />
        </div>
        <div>
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

