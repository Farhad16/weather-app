export const temperatureFormatter = (temperature: any) => {
  const formatTemperature = temperature.map(
    ({ temp, time }: { temp: number; time: string }) => ({
      temp: Math.round(temp),
      time: formatTimeTo12Hour(time),
    })
  );

  function formatTimeTo12Hour(time: string) {
    const [hours, minutes] = time.split(":");
    const formattedHours = (parseInt(hours) % 12).toString().padStart(2, "0");
    const period = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${period}`;
  }

  return formatTemperature;
};
