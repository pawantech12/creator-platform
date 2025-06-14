import React from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart3 } from "lucide-react";
const Home = () => {
  return (
    <div className="space-y-8 pt-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Creator Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful tools to boost your content creation and track your
          performance
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle>Content Idea Assistant</CardTitle>
            </div>
            <CardDescription>
              Generate creative content ideas powered by AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Get AI-generated reel ideas, captions, hashtags, and hooks
              tailored to your niche and topic.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/content-assistant" className="w-full">
              <Button className="w-full">Try Content Assistant</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <CardTitle>Analytics Dashboard</CardTitle>
            </div>
            <CardDescription>
              Track your Instagram performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Visualize follower growth, engagement rates, and discover the best
              times to post.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/analytics" className="w-full">
              <Button className="w-full">View Analytics</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
