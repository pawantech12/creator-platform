import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/ui/card";

export function EngagementRateChart({ data, height = 250 }) {
  // Calculate engagement rate for each post
  const chartData = data.map((item) => ({
    name: `Post ${item.post}`,
    likes: item.likes,
    comments: item.comments,
    total: item.likes + item.comments,
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2 border shadow-sm bg-background">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      Likes:{" "}
                      <span className="font-medium text-rose-500">
                        {payload[0].value}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Comments:{" "}
                      <span className="font-medium text-violet-500">
                        {payload[1].value}
                      </span>
                    </p>
                    <p className="text-xs font-medium mt-1">
                      Total: {payload[0].value + payload[1].value}
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            formatter={(value) => (
              <span className="text-muted-foreground">{value}</span>
            )}
          />
          <Bar
            dataKey="likes"
            name="Likes"
            fill="hsl(346.8, 77.2%, 49.8%)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="comments"
            name="Comments"
            fill="hsl(262.1, 83.3%, 57.8%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
