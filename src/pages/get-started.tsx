import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function GetStarted() {
  return (
    <section className="mt-12 px-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Enter your raindrop's API key </CardTitle>
          <CardContent className="mt-4">
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="api-key">API-Key</Label>
              <div className="max-w-sm">
                <Input
                  type="text"
                  id="api-key"
                  placeholder="66f24040-0217-4d72-be10-d12ff098d2c8"
                  className="w-full"
                />
              </div>
              <div className="w-full flex gap-4 mt-4">
                <Button className="w-1/2">Register</Button>
                <Button className="w-1/2" variant="outline" asChild>
                  <a href="/welcome">Cancel</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
}
