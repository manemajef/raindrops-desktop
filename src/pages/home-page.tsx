import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="px-4 py-12 w-full">
      <div className="max-w-lg mx-auto mt-12">
        <div className="text-center">
          <h1 className="text-4xl font-black">Hello, World!</h1>
          <p className="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab magnam
            error iure.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
            <Button variant="outline">Help</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
