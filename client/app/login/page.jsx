import { Login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function page() {
  return (
    <form action={Login}>
        <div>
            <Label>Username</Label>
            <Input type="text" name="username"/>
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" name="password" />
        </div>

        <Button type="submit">Login</Button>
    </form>
  )
}
export default page
