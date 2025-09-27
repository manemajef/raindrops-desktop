import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="px-4 py-12 w-full">
      <div className="max-w-lg mx-auto mt-12">
        <div className="text-center">
          <h1 className="text-4xl font-black">Hello, World!</h1>
          <p className="mt-6">
            This is the landing page,{" "}
            <Link to="/" className="text-primary hover:underline">
              click here
            </Link>{" "}
            to go to user page. Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link to="register">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/">Help</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
