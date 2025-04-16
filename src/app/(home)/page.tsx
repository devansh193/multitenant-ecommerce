import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 m-4">
      <div>
        <Button variant={"elevated"}>I am button</Button>
      </div>
      <div>
        <Input placeholder="I am input" />
      </div>
      <div>
        <Progress value={50} />
      </div>
      <div>
        <Textarea placeholder="I am text area" />
      </div>
    </div>
  );
}
