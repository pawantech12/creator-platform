import { Clock } from "lucide-react";

export function BestTimeToPost({ bestTime }) {
  // Parse the best time
  const [day, time] = bestTime.split(" ");

  // Create a visual representation of the week with the best day highlighted
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 p-6 bg-primary/10 rounded-lg">
        <Clock className="h-10 w-10 text-primary" />
        <div className="text-center">
          <h3 className="text-xl font-bold">{bestTime}</h3>
          <p className="text-sm text-muted-foreground">
            is your optimal posting time
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Weekly Schedule</h4>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((weekday) => {
            const isActive = weekday === day;
            return (
              <div
                key={weekday}
                className={`text-center p-2 rounded-md text-xs ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {weekday.substring(0, 3)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Daily Schedule</h4>
        <div className="grid grid-cols-6 gap-1">
          {["6 AM", "9 AM", "12 PM", "3 PM", "7 PM", "10 PM"].map(
            (timeSlot) => {
              const isActive = timeSlot === time;
              return (
                <div
                  key={timeSlot}
                  className={`text-center p-2 rounded-md text-xs ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {timeSlot}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Posting at this time can help maximize your reach and engagement based
          on when your audience is most active.
        </p>
      </div>
    </div>
  );
}
