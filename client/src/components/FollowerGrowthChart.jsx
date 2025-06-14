import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/ui/card";

export function FollowerGrowthChart({ data, height = 250 }) {
  // Create chart data with day labels
  const chartData = data.map((value, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    return {
      day,
      followers: value,
    };
  });

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="day" className="text-xs text-muted-foreground" />
          <YAxis
            className="text-xs text-muted-foreground"
            domain={["auto", "auto"]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2 border shadow-sm bg-background">
                    <p className="text-sm font-medium">
                      {payload[0].payload.day}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Followers:{" "}
                      <span className="font-medium text-primary">
                        {payload[0].value}
                      </span>
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="followers"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--background))" }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
