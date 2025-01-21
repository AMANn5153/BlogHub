const timeDuration = (createdAt) => {
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentDate = new Date().toISOString();

  const createdDate = new Date(createdAt).toISOString();

  let duration =
    (Date.parse(currentDate) - Date.parse(createdDate)) / (1000 * 60 * 60 * 24);
  let time = 0;
  if (duration < 1) {
    time = Math.round((duration * 24));
  } else {
    duration = Math.round(duration);
  }

  return {duration, time, dateString};
};


export default timeDuration;