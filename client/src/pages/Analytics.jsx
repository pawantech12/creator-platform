"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Clock, Upload, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { FollowerGrowthChart } from "../components/FollowerGrowthChart";
import { EngagementRateChart } from "../components/EngagementRateChart";
import { BestTimeToPost } from "../components/BestTimeToPost";
import { UploadDataDialog } from "../components/UploadDataDialog";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

// Default mock data
const defaultData = {
  followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  engagement: [
    { post: 1, likes: 320, comments: 25 },
    { post: 2, likes: 400, comments: 40 },
    { post: 3, likes: 290, comments: 10 },
    { post: 4, likes: 350, comments: 30 },
    { post: 5, likes: 420, comments: 45 },
  ],
  bestPostTime: "Wednesday 7 PM",
};

const exportAnalyticsData = (data) => {
  const reportData = {
    generatedAt: new Date().toISOString(),
    summary: {
      currentFollowers: data.followers[data.followers.length - 1],
      followerGrowth:
        data.followers[data.followers.length - 1] - data.followers[0],
      averageEngagement: Math.round(
        data.engagement.reduce(
          (acc, post) => acc + post.likes + post.comments,
          0
        ) / data.engagement.length
      ),
      bestPostTime: data.bestPostTime,
      totalPosts: data.engagement.length,
    },
    followerGrowthData: data.followers.map((value, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return {
        date: date.toISOString().split("T")[0],
        followers: value,
      };
    }),
    engagementData: data.engagement,
    recommendations: [
      `Post consistently at ${data.bestPostTime} for maximum engagement`,
      "Focus on content similar to your highest-performing posts",
      "Engage with your audience during peak hours to boost visibility",
      "Monitor follower growth trends and adjust strategy accordingly",
    ],
  };

  const blob = new Blob([JSON.stringify(reportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `analytics-report-${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState(defaultData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Wait for token to load from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleDataUpload = (newData) => {
    setData(newData);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Instagram Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your performance metrics and optimize your content strategy
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => exportAnalyticsData(data)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Followers
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current followers compared to last week</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.followers[data.followers.length - 1]}
                </div>
                <p className="text-xs text-muted-foreground">
                  +
                  {data.followers[data.followers.length - 1] -
                    data.followers[0]}{" "}
                  from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Engagement
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average likes + comments per post</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    data.engagement.reduce(
                      (acc, post) => acc + post.likes + post.comments,
                      0
                    ) / data.engagement.length
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {data.engagement.length} recent posts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Best Time to Post
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on historical engagement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.bestPostTime}</div>
                <p className="text-xs text-muted-foreground">
                  Based on historical engagement
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <FollowerGrowthChart data={data.followers} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Last 5 posts</CardDescription>
              </CardHeader>
              <CardContent>
                <EngagementRateChart data={data.engagement} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="followers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth Trend</CardTitle>
              <CardDescription>
                Daily follower count over the past week
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <FollowerGrowthChart data={data.followers} height={350} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Post Engagement Analysis</CardTitle>
                <CardDescription>Likes and comments per post</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <EngagementRateChart data={data.engagement} height={350} />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Best Time to Post</CardTitle>
                <CardDescription>
                  Optimal posting schedule based on engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BestTimeToPost bestTime={data.bestPostTime} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <UploadDataDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDataUpload={handleDataUpload}
        currentData={data}
      />
    </div>
  );
}
