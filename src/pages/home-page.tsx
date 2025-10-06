import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Collection, Raindrop } from "electron/shared/types";
type Data = {
  user: User;
  collections: Collection[];
  raindrops: Raindrop[];
};
export default function HomePage() {
  const [data, setData] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await window.api.invoke("api:onStartUp");
        if (!res || !res.user) {
          navigate("/welcome");
        }
        setData(res);
      } catch (err) {
        console.log(err);
        navigate("/welcome");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex place-content-center">
        <h1 className="text-8xl font-bold text-foreground/70">Loading ... </h1>
      </div>
    );
  }
  return (
    <div className="px-4 py-12 w-full">
      <div className="max-w-lg mx-auto mt-12">
        <div className="text-center">
          <h1 className="text-4xl font-black">Welcome, User!</h1>
          <p className="mt-6">
            This is still a demo, no data so far,{" "}
            <a href="/welcome" className="text-primary hover:underline">
              click here{" "}
            </a>{" "}
            to go back to <i>Welcome Page</i>
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild className="">
              <a href="/welcome/register">Get Started</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/">Help</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>hey</h1>
    // </div>
  );
}
